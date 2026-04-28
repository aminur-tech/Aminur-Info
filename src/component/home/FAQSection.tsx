"use client";
import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900/50 hover:border-emerald-500/30 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-semibold text-slate-800 dark:text-white transition-colors">
          {question}
        </span>
        <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-base leading-relaxed"
          >
            {answer}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "I specialize in high-performance web development, UI/UX design, and scalable architecture. I build modern applications tailored to your specific business needs."
    },
    {
      question: "What is your tech stack?",
      answer: "My core expertise lies in the MERN stack (MongoDB, Express, React, Node.js) and Next.js with TypeScript. I leverage Framer Motion, Tailwind CSS, and headless CMS solutions for premium delivery."
    },
    {
      question: "How do we start a project?",
      answer: "Send me a message with your project overview, timeline, and goals. We will schedule a discovery call to align on requirements and map out the roadmap."
    },
    {
      question: "Do you provide maintenance?",
      answer: "Yes, I offer flexible post-launch support plans including performance monitoring, security updates, and feature enhancements to ensure your project stays competitive."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-500 p-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 mb-4 font-bold text-xs uppercase tracking-widest">
            <HelpCircle size={14} />
            <span>Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Need Answers?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to know about working with me.</p>
        </Motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}