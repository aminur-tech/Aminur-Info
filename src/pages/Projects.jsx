import React from 'react'
import { Layers, ArrowRight } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'PlateShare',
      description: 'Community-driven food-sharing platform to reduce food waste and help the needy. Built with React, Tailwind CSS, Firebase Auth, Node.js, Express.js, and MongoDB.',
      link: 'https://community-food-sharing.netlify.app'
    },
     {
      title: 'Pet Care Services',
      description: 'Responsive web app to help pet owners access winter-specific pet services such as grooming, health checkups, and seasonal care tips. Features Firebase authentication, user profiles, toast notifications, and animated UI.',
      link: 'https://pet-care-services.netlify.app'
    },
     {
      title: 'Zab Shift Client',
      description: 'Modern React-based delivery management web application with role-based dashboards, parcel tracking, Stripe payments, real-time updates, and responsive UI. Built with React, Tailwind CSS, Firebase, and Vercel deployment.',
      link: 'https://zap-shift-client-woad.vercel.app'
    }
  ]

  return (
    <section className="py-20 bg-gray-800/50 border-t border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wider text-red-500">
          <Layers className="inline-block h-6 w-6 mr-3 mb-1" />
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-red-500 hover:text-red-400 font-medium"
              >
                View Project <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
