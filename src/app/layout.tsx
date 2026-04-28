import React from "react";
import "./globals.css";
import Navbar from "../component/header/Navbar";
import Footer from "../component/footer/Footer";
import { ThemeProvider } from "../component/providers/theme-provider";
import SmoothScroll from "../component/buttons/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className=" dark:bg-slate-950 dark:text-slate-200 antialiased">
        <SmoothScroll>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}