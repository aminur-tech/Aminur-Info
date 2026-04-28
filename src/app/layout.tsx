import React from "react";
import "./globals.css";
import SmoothScroll from "../Component/buttons/SmoothScroll";
import { ThemeProvider } from "../Component/providers/theme-provider";
import Navbar from "../Component/header/Navbar";
import Footer from "../Component/footer/Footer";


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