"use client";

import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Send, MapPin, CheckCircle2, Sparkles, ArrowUpRight, AlertCircle } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

import type { Profile } from "../../types/portfolio";

export default function Contact({ profile }: { profile?: Profile }) {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailValue = profile?.email || "aminur.programme@gmail.com";
  const phoneValue = profile?.phone || "+880 1327 694078";
  const locationValue = profile?.location || "Satkhira, Bangladesh";

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const form = e.currentTarget;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      
      setStatus({
        type: response.ok ? "success" : "error",
        message: result.message || result.error || "Failed to send message.",
      });

      if (response.ok) {
        form.reset();
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email Me",
      value: emailValue,
      href: `mailto:${emailValue}`,
    },
    {
      icon: <BsWhatsapp className="h-5 w-5" />,
      label: "WhatsApp Me",
      value: phoneValue,
      href: `https://wa.me/${phoneValue.replace(/[^0-9]/g, "")}`,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: locationValue,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b6d900]/5 blur-[140px]" />

      <div className="relative z-10">
        {/* Header Section */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
          className="mb-16 text-center"
        >
          {/* Eyebrow Header */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
            Let&apos;s Build Something Great Together
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70">
            Have a project in mind, an exciting opportunity, or just want to say hi? Send me a message and I&apos;ll get back to you promptly.
          </p>
        </Motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Side: Contact Cards */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="space-y-4 lg:col-span-4"
          >
            {contactItems.map((item, idx) => {
              const CardContent = (
                <div className="group relative flex items-center justify-between rounded-3xl border border-[#17211d]/10 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#b6d900]/40 hover:shadow-xl hover:shadow-[#b6d900]/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#b6d900]/40">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#17211d]/5 bg-[#b6d900]/15 text-[#b6d900] transition-transform duration-300 group-hover:scale-110 dark:border-white/10">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                        {item.label}
                      </p>
                      <p className="truncate font-semibold text-[#17211d] dark:text-[#f1f4ef]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  {item.href && (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#17211d]/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#b6d900] dark:text-[#f1f4ef]/30" />
                  )}
                </div>
              );

              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={idx}>{CardContent}</div>
              );
            })}
          </Motion.div>

          {/* Right Side: Form */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="lg:col-span-8"
          >
            <form
              onSubmit={sendEmail}
              className="relative rounded-[2.5rem] border border-[#17211d]/10 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#101613]/60 md:p-12"
            >
              <input
                type="hidden"
                name="time"
                value={new Date().toLocaleString()}
              />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company or Team"
                      className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                      Project Type
                    </label>
                    <input
                      type="text"
                      name="projectType"
                      placeholder="Web app, redesign, MVP"
                      className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    name="budgetRange"
                    placeholder="e.g. $1k - $5k"
                    className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    required
                    className="w-full rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs font-bold uppercase tracking-wider text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    required
                    className="w-full resize-none rounded-2xl border border-[#17211d]/10 bg-white/70 p-4 text-[#17211d] placeholder-[#17211d]/40 outline-none backdrop-blur-md transition-all focus:border-[#b6d900] focus:ring-1 focus:ring-[#b6d900] dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef] dark:placeholder-[#f1f4ef]/30"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-[#b6d900] px-8 py-4 text-sm font-bold text-[#111815] shadow-lg shadow-[#b6d900]/20 transition-all duration-300 hover:bg-[#a3c300] hover:shadow-xl hover:shadow-[#b6d900]/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#111815] border-t-transparent" />
                  ) : (
                    <>
                      <span className="font-extrabold uppercase tracking-wider">
                        Send Message
                      </span>
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {/* Status Message */}
                {status.message && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2.5 rounded-2xl p-4 text-sm font-semibold backdrop-blur-md ${
                      status.type === "success"
                        ? "border border-[#b6d900]/30 bg-[#b6d900]/15 text-[#17211d] dark:text-[#f1f4ef]"
                        : "border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#b6d900]" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                    )}
                    <span>{status.message}</span>
                  </Motion.div>
                )}
              </div>
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}