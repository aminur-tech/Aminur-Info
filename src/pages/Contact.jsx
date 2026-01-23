import React, { useRef, useState } from 'react';
import { Mail, Send, Phone, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { BsWhatsapp } from 'react-icons/bs';

export default function Contact() {
    const form = useRef();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            setStatus({ type: 'success', message: 'Message sent! I will get back to you soon.' });
            setIsSubmitting(false);
            e.target.reset();
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }, (err) => {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
            setIsSubmitting(false);
        });
    };

    return (
        <section className="relative py-24 overflow-hidden" id="contact">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        Let's <span className="text-emerald-500">Connect</span>
                    </h2>
                    <p className="text-slate-400 mt-4 max-w-xl mx-auto font-light">
                        Ready to start your next project or have a question? I'm just a message away.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Side: Contact Cards */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-4"
                    >
                        {[
                            { icon: <Mail className="text-emerald-500" />, label: 'Email Me', value: 'aminurrahman9793@gmail.com' },
                            { icon: <BsWhatsapp className="text-emerald-500" />, label: 'WhatsApp Me', value: '+880 1327 694078' },
                            { icon: <MapPin className="text-emerald-500" />, label: 'Location', value: 'Dhaka, Bangladesh' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all duration-300 group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                                        <p className="text-white font-medium text-sm md:text-base">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                    >
                        <form ref={form} onSubmit={sendEmail} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Name</label>
                                    <input type="text" name="user_name" placeholder="John Doe" className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/5 focus:border-emerald-500/50 focus:ring-0 text-white placeholder-slate-600 transition-all outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Email</label>
                                    <input type="email" name="user_email" placeholder="john@example.com" className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/5 focus:border-emerald-500/50 focus:ring-0 text-white placeholder-slate-600 transition-all outline-none" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-widest">Message</label>
                                <textarea name="message" placeholder="Tell me about your project..." rows="5" className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/5 focus:border-emerald-500/50 focus:ring-0 text-white placeholder-slate-600 transition-all outline-none resize-none" required></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full group relative flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/20"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="uppercase tracking-tighter">Send Message</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {status.message && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-center gap-2 p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                                >
                                    {status.type === 'success' && <CheckCircle2 size={18} />}
                                    {status.message}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}