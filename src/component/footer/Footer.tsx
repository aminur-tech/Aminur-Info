"use client";
import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-110 p-2"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} Aminur Rahman.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Built with Next.js & Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <SocialIcon href="https://web.facebook.com/aminur.rahman4078/">
              <FaFacebookF className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href="https://github.com/aminur-tech">
              <FaGithub className="h-5 w-5" />
            </SocialIcon>

            <SocialIcon href="https://www.linkedin.com/in/aminur-rahman4078">
              <FaLinkedinIn className="h-5 w-5" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}