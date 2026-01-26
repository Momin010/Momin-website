import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const stats = [
        { value: '15', label: 'Years Old' },
        { value: '2.2K+', label: 'Contributions' },
        { value: '110+', label: 'Repositories' },
    ]

    return (
        <section id="about" className="section about" ref={sectionRef}>
            <div className="container">
                <div className="about-layout">
                    <motion.div
                        className="about-left"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <span className="section-label">About</span>
                        <h2 className="about-title">
                            Building the future,
                            <br />
                            <span className="title-accent">one line at a time</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="about-right"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <p className="about-text">
                            I'm a developer from Tampere, Finland, passionate about creating
                            next-generation software. From AI that builds apps to operating
                            systems written from scratch—I love tackling complex challenges.
                        </p>

                        <p className="about-text">
                            Beyond code, I'm interested in politics and civic engagement.
                            I've trained at the Finnish Parliament and shadowed the Mayor
                            of Tampere, gaining unique perspectives on leadership.
                        </p>

                        <div className="tech-stack">
                            {['TypeScript', 'React', 'Node.js', 'Python', 'C', 'NASM'].map((tech) => (
                                <span key={tech} className="tech-item">{tech}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="stats-row"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-item">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
