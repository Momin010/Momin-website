import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        id: '01',
        title: 'MominAI',
        description: 'AI that generates full working apps from text descriptions. Not just code—complete, deployable applications.',
        tech: ['React', 'Node.js', 'TypeScript', 'Supabase'],
        link: 'https://mominai.vercel.app',
        github: 'https://github.com/Momin010/MominAI-website'
    },
    {
        id: '02',
        title: 'MominOS',
        description: 'Operating system built from scratch. Bootloader, kernel, and eventually an AI-native shell.',
        tech: ['NASM', 'C', 'Assembly', 'QEMU'],
        github: 'https://github.com/Momin010/MominOS'
    },
    {
        id: '03',
        title: 'EventConnect',
        description: 'Social platform for discovering and managing events. Apple-level design with real-time sync.',
        tech: ['React Native', 'TypeScript', 'Supabase'],
        github: 'https://github.com/Momin010/EventC'
    },
    {
        id: '04',
        title: 'CustomHydration',
        description: 'Full e-commerce experience with auth, cart, checkout. Premium hydration products.',
        tech: ['React', 'Vite', 'Supabase'],
        github: 'https://github.com/Momin010/CustomHydration'
    }
]

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Work</span>
                    <h2 className="projects-title">Selected Projects</h2>
                </motion.div>

                <div className="projects-list">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.id}
                            className="project-item"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                        >
                            <span className="project-number">{project.id}</span>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-meta">
                                    <div className="project-tech">
                                        {project.tech.map((t) => (
                                            <span key={t}>{t}</span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                Visit ↗
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                Code ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
