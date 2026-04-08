"use client";

import { useEffect, useState } from "react";
import DashboardClient from "@/components/DashboardClient";
import AdminChart from "@/components/AdminChart";
<AdminChart/>

export default function Page() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("isLoggedIn");

    if (check === "true") {
      setIsAuth(true);
    } else {
      window.location.href = "/login"; // force login
    }
  }, []);

  if (!isAuth) return <p>Checking login...</p>;

  return <DashboardClient />;
}