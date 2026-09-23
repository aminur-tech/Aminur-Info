"use client";

import { usePathname } from "next/navigation";
import React from "react";

import Navbar from "../home/Navbar";
import SmoothScroll from "../buttons/SmoothScroll";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  /* =========================
     ADMIN
  ========================== */

  if (isAdminRoute) {
    return <>{children}</>;
  }

  /* =========================
     PUBLIC PORTFOLIO
  ========================== */

  return (
    <SmoothScroll>
      <Navbar />

      {children}
    </SmoothScroll>
  );
}