import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        period: '2025 — Present',
        role: 'Software Developer',
        company: 'MominAI',
        description: 'Building an AI that generates full working applications from text.'
    },
    {
        period: 'Oct 2025',
        role: 'Student Trainee',
        company: 'Finnish Parliament',
        description: 'Training with MP Arto Satonen on leadership and legislation.'
    },
    {
        period: 'Oct 2025',
        role: 'Student Trainee',
        company: 'City of Tampere',
        description: 'Shadowed Mayor Ilmari Nurminen on city governance.'
    }
]

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section id="experience" className="section experience" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="experience-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Experience</span>
                    <h2 className="experience-title">Journey</h2>
                </motion.div>

                <div className="experience-list">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            className="experience-item"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                        >
                            <span className="experience-period">{exp.period}</span>
                            <div className="experience-content">
                                <h3 className="experience-role">{exp.role}</h3>
                                <span className="experience-company">{exp.company}</span>
                                <p className="experience-desc">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
