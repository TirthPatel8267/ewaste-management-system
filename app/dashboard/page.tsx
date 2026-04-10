"use client";

import { useEffect, useState } from "react";
import DashboardClient from "@/components/DashboardClient";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      const data = await res.json();

      if (!data?.user) {
        window.location.href = "/login";
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Checking login...</p>;

  return <DashboardClient />;
}