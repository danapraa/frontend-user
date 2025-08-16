"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DashboardCompany from "@/components/dashboard/DashboardCompany";
import DashboardUser from "@/components/dashboard/DashboardUser";

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = Cookies.get("role");
    setRole(userRole ?? "user"); // default fallback ke "user"
  }, []);

  if (!role) {
    return <p>Loading dashboard...</p>;
  }

  if (role === "perusahaan") {
    return <DashboardCompany />;
  }

  return <DashboardUser />;
}
