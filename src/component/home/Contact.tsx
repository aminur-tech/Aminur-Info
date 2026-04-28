"use client";
import React, { useRef, useState } from 'react';
import { Mail, Send, MapPin, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion as Motion } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSubmitting(true);

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_TEMPLATE_ID!,
            form.current,
            process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        )
            .then(() => {
                setStatus({ type: 'success', message: 'Message sent! I will get back to you soon.' });
                setIsSubmitting(false);
                form.current?.reset();
                setTimeout(() => setStatus({ type: '', message: '' }), 5000);
            }, (err) => {
                console.log(err);
                setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
                setIsSubmitting(false);
            });
    };

    return (
        <section className="relative overflow-hidden py-20 px-4 transition-colors duration-500 bg-white dark:bg-slate-950" id="contact">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Let's <span className="text-emerald-600 dark:text-emerald-500">Connect</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl mx-auto font-light">
                        Ready to start your next project or have a question? I'm just a message away.
                    </p>
                </Motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: Contact Cards */}
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-4"
                    >
                        {[
                            { icon: <Mail />, label: 'Email Me', value: 'aminur.programme@gmail.com' },
                            { icon: <BsWhatsapp />, label: 'WhatsApp Me', value: '+880 1327 694078' },
                            { icon: <MapPin />, label: 'Location', value: 'Satkhira, Bangladesh' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-2xl text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 font-bold">{item.label}</p>
                                        <p className="text-slate-900 dark:text-white font-medium">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Motion.div>

                    {/* Right Side: Form */}
                    <Motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <form ref={form} onSubmit={sendEmail} className="bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-6">
                            <input type="hidden" name="time" value={new Date().toLocaleString()} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-2 tracking-widest">Name</label>
                                    <input type="text" name="name" placeholder="John Doe" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 focus:border-emerald-500/50 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-2 tracking-widest">Email</label>
                                    <input type="email" name="email" placeholder="john@example.com" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 focus:border-emerald-500/50 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all outline-none" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-2 tracking-widest">Subject</label>
                                <input type="text" name="title" placeholder="Project Inquiry" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 focus:border-emerald-500/50 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all outline-none" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-2 tracking-widest">Message</label>
                                <textarea name="message" placeholder="Tell me about your project..." rows={5} className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 focus:border-emerald-500/50 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all outline-none resize-none"></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-600/20"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-tighter">Send Message</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {status.message && (
                                <Motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-center gap-2 p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'}`}
                                >
                                    {status.type === 'success' && <CheckCircle2 size={18} />}
                                    {status.message}
                                </Motion.div>
                            )}
                        </form>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
}