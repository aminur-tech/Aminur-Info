"use client";
import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border border-[#17211d]/10 p-2 text-[#52605a] transition-all duration-300 hover:-translate-y-1 hover:border-[#657b00] hover:bg-[#657b00] hover:text-white dark:border-[#f1f4eb]/10 dark:text-[#aab5ad]"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#17211d]/10 bg-[#e9eee4] transition-colors duration-300 dark:border-[#f1f4eb]/10 dark:bg-[#18211c]">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="font-serif text-xl font-bold text-[#17211d] dark:text-[#f1f4eb]">
              Aminur<span className="text-[#657b00]">.</span>
            </p>
            <p className="text-xs text-[#52605a] dark:text-[#aab5ad]">
              © {new Date().getFullYear()} Aminur Rahman. Built with care.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
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