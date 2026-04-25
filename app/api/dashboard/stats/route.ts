import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Pickup from "@/models/Pickup";

export async function GET() {
  try {
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch user basic data
    const user = await User.findById(userId).select("points email");
    
    // Fetch user requests matching explicit ID or matching the logged in user's email
    const requests = await Pickup.find({ 
      $or: [
        { userId: userId }, 
        { email: user?.email || "" }
      ] 
    }).sort({ createdAt: -1 });

    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status?.toLowerCase() === "pending").length;
    const completedRequests = requests.filter(r => r.status?.toLowerCase() === "completed").length;
    const scheduledRequests = requests.filter(r => ["approved", "accepted", "out for pickup"].includes(r.status?.toLowerCase())).length;

    // Mock impact calculation logic (can be refined later based on actual weights if added to schema)
    // 1 completed request approx = 10kg e-waste, 0.5kg metals, 5kg CO2 saved
    const impact = {
      devicesRecycled: completedRequests * 2 + (scheduledRequests > 0 ? 1 : 0), // rough estimate
      co2Saved: (completedRequests * 4.5).toFixed(1),
      metalsRecovered: (completedRequests * 0.8).toFixed(1),
      points: user?.points || 0,
      rank: (user?.points || 0) > 1000 ? "Gold" : (user?.points || 0) > 500 ? "Silver" : "Bronze"
    };

    // Compute Chart Data
    const today = new Date();
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push(d.toLocaleString('default', { month: 'short' }));
    }
    const pickupsMonthly = [0, 0, 0, 0, 0, 0];
    requests.forEach(r => {
      const d = new Date(r.createdAt || r.date); // Use r.date fallback if createdAt missing
      if (isNaN(d.getTime())) return;
      const diffMonths = (today.getFullYear() - d.getFullYear()) * 12 + today.getMonth() - d.getMonth();
      if (diffMonths >= 0 && diffMonths < 6) {
        pickupsMonthly[5 - diffMonths]++;
      }
    });

    const categoryCounts: Record<string, number> = { "Laptop": 0, "Mobile": 0, "Printer": 0, "Batteries": 0, "Other": 0 };
    requests.forEach(r => {
       const cat = r.category || "Other";
       if (categoryCounts[cat] !== undefined) {
         categoryCounts[cat]++;
       } else {
         categoryCounts["Other"]++;
       }
    });

    return NextResponse.json({
      stats: {
        total: totalRequests,
        pending: pendingRequests,
        completed: completedRequests,
        scheduled: scheduledRequests
      },
      impact,
      recentRequests: requests.slice(0, 5),
      chartData: {
        monthly: {
          labels: last6Months,
          data: pickupsMonthly
        },
        categories: {
          labels: Object.keys(categoryCounts),
          data: Object.values(categoryCounts)
        }
      }
    });

  } catch (error: any) {
    console.error("STATS_FETCH_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
