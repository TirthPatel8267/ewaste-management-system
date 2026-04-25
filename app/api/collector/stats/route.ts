import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/db";
import Pickup from "@/models/Pickup";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch ALL pickups (collectors see everything assigned/available)
    const allPickups = await Pickup.find({}).sort({ createdAt: -1 });

    // Separate by status
    const pending = allPickups.filter(
      (p) => p.status === "Approved" || p.status === "Pending"
    );
    const inProgress = allPickups.filter(
      (p) => p.status === "Accepted" || p.status === "Out for Pickup"
    );
    const completed = allPickups.filter((p) => p.status === "Completed");

    // Completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completedToday = completed.filter((p) => {
      const d = new Date(p.updatedAt || p.createdAt);
      return d >= today;
    });

    // Completion rate
    const totalHandled = inProgress.length + completed.length;
    const completionRate =
      totalHandled > 0
        ? Math.round((completed.length / (totalHandled + pending.length)) * 100)
        : 0;

    // Earnings estimate (₹150 per completed pickup)
    const earningsPerPickup = 150;
    const totalEarnings = completed.length * earningsPerPickup;
    const todayEarnings = completedToday.length * earningsPerPickup;

    // Weekly chart data (last 7 days)
    const weekLabels: string[] = [];
    const weekData: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const nextD = new Date(d);
      nextD.setDate(nextD.getDate() + 1);

      weekLabels.push(
        d.toLocaleDateString("en-US", { weekday: "short" })
      );
      weekData.push(
        completed.filter((p) => {
          const pd = new Date(p.updatedAt || p.createdAt);
          return pd >= d && pd < nextD;
        }).length
      );
    }

    // Category breakdown
    const categoryCounts: Record<string, number> = {};
    allPickups.forEach((p) => {
      const cat = p.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    // Monthly earnings trend (last 6 months)
    const monthlyEarnings: number[] = [];
    const monthLabels: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
      monthLabels.push(d.toLocaleString("default", { month: "short" }));
      const count = completed.filter((p) => {
        const pd = new Date(p.updatedAt || p.createdAt);
        return pd >= d && pd < nextMonth;
      }).length;
      monthlyEarnings.push(count * earningsPerPickup);
    }

    // Average response time (mock — in hours)
    const avgResponseTime = completed.length > 0 ? Math.max(1.2, 4.8 - completed.length * 0.3) : 0;

    return NextResponse.json({
      stats: {
        totalAssigned: allPickups.length,
        pending: pending.length,
        inProgress: inProgress.length,
        completedTotal: completed.length,
        completedToday: completedToday.length,
        completionRate,
        avgResponseTime: Number(avgResponseTime.toFixed(1)),
      },
      earnings: {
        total: totalEarnings,
        today: todayEarnings,
        perPickup: earningsPerPickup,
        monthly: {
          labels: monthLabels,
          data: monthlyEarnings,
        },
      },
      pickups: allPickups,
      charts: {
        weekly: {
          labels: weekLabels,
          data: weekData,
        },
        categories: {
          labels: Object.keys(categoryCounts),
          data: Object.values(categoryCounts),
        },
      },
      collectorName: decoded.name || decoded.email?.split("@")[0] || "Collector",
    });
  } catch (error: any) {
    console.error("COLLECTOR_STATS_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
