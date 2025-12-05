import React from 'react'
import { User } from 'lucide-react'

export default function About() {
    return (
        <section className="py-20 bg-gray-800/50 border-t border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wider text-red-500">
                    <User className="inline-block h-6 w-6 mr-3 mb-1" />
                    About Me
                </h2>
                <div className="lg:grid lg:grid-cols-3 lg:gap-12 items-center">
                    <div className="col-span-1 mb-8 lg:mb-0 text-center">
                        <img
                            src="https://i.ibb.co.com/gMxQc4vH/profile.jpg"
                            alt="Profile"
                            className="rounded-full mx-auto w-48 h-48 object-cover border-4 border-red-600 shadow-2xl"
                        />
                        <p className="mt-4 text-xl font-semibold text-white">Full Stack Developer</p>
                        <p className="text-gray-400">Junior Web Developer</p>
                    </div>
                    <div className="col-span-2 text-gray-300 leading-relaxed space-y-4 text-center lg:text-left">
                        <p>
                            I'm a passionate Junior MERN Stack Developer, focused on building web applications that are fast, scalable, and easy to maintain. I enjoy working on both frontend with React and backend with Node.js, Express.js, and MongoDB.
                        </p>
                        <p>
                            I write clean, readable code and love learning new technologies to improve my skills. My goal is to create apps that are not only functional but also provide a great user experience.
                        </p>
                        <p className="font-semibold text-red-500">
                            Let's connect and bring your next project idea to life!
                        </p>

                    </div>
                </div>
            </div>
        </section>
    )
}
