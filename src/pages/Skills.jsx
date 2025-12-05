import React from 'react'
import { Code, Zap, Database, Monitor } from 'lucide-react'

const SkillBadge = ({ skill, icon }) => (
  <div className="flex items-center bg-gray-800 border border-red-600/50 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-red-500/50">
    {icon}
    <span className="ml-2">{skill}</span>
  </div>
)

export default function Skills() {
  const coreSkills = [
    { name: 'React', icon: <i className="fab fa-react text-lg" /> },
    { name: 'Node.js', icon: <i className="fab fa-node-js text-lg" /> },
    { name: 'Express.js', icon: <Zap className="h-4 w-4" /> },
    { name: 'MongoDB', icon: <Database className="h-4 w-4" /> },
    { name: 'Tailwind CSS', icon: <i className="fab fa-css3-alt text-lg" /> },
    { name: 'Git & GitHub', icon: <i className="fab fa-github text-lg" /> },
  ]

  return (
    <section className="py-20">
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wider text-red-500">
          <Code className="inline-block h-6 w-6 mr-3 mb-1" />
          My Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {coreSkills.map((skill, index) => (
            <SkillBadge key={index} skill={skill.name} icon={skill.icon} />
          ))}
         
        </div>

        
      </div>
    </section>
  )
}
