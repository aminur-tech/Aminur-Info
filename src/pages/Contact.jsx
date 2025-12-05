import React, { useRef, useState } from 'react';
import { Mail, Send, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const form = useRef();
    const [success, setSuccess] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,     // Service ID
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    // Template ID
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY      // Public Key'     // EmailJS public key
        )
            .then(() => {
                setSuccess('Message sent successfully!');
                e.target.reset();
            }, (err) => {
                setSuccess('Failed to send message. Try again.');
                console.error(err);
            });
    };

    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">

                {/* Left: Contact Info */}
                <div className="lg:w-1/3 space-y-6">
                    <h2 className="text-3xl font-bold uppercase tracking-wider text-red-500 flex items-center">
                        <Mail className="h-6 w-6 mr-2" /> Get In Touch
                    </h2>
                    <p className="text-gray-400">
                        Have a project in mind or just want to say hello? Send me a message.
                    </p>
                    <div className="space-y-4 text-gray-300">
                        <p className="flex items-center"><Mail className="mr-2" /> aminurrahman9793@gmail.com</p>
                        <p className="flex items-center"><Phone className="mr-2" /> +8801327694078</p>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="lg:w-2/3">
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                        <input type="text" name="user_name" placeholder="Your Name" className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-gray-500 transition-colors" required />

                        <input type="email" name="user_email" placeholder="Your Email" className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-gray-500 transition-colors" required />

                        <textarea name="message" placeholder="Your Message" rows="5" className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-gray-500 transition-colors" required></textarea>

                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg uppercase text-sm transition-all duration-300 shadow-red-500/50 hover:shadow-lg flex items-center justify-center">
                            Send Message
                            <Send className="h-4 w-4 ml-2" />
                        </button>
                    </form>

                    {success && <p className="mt-4 text-green-500">{success}</p>}
                </div>

            </div>
        </section>
    );
}
