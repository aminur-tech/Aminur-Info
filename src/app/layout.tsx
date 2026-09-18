import React from "react";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import AppShell from "../components/shared/AppShell";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className=" dark:bg-slate-950 dark:text-slate-200 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}