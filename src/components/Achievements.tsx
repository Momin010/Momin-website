import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Achievements.css'

const achievements = [
    { icon: '🦈', title: 'Pull Shark', desc: 'GitHub badge' },
    { icon: '🔥', title: '2,288+', desc: 'Contributions' },
    { icon: '📦', title: '110+', desc: 'Repositories' },
    { icon: '🏛️', title: 'Parliament', desc: 'Training', certificate: '/certificates/eduskunta.pdf' },
    { icon: '🏙️', title: 'Mayor', desc: 'Shadow', certificate: '/certificates/pormestari.pdf' },
    { icon: '🤝', title: '500+', desc: 'Connections' },
    { icon: '🎓', title: 'Haaga-Helia', desc: 'University', certificate: '/certificates/haaga-helia.pdf' },
]

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section id="achievements" className="section achievements" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="achievements-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Achievements</span>
                    <h2 className="achievements-title">Milestones</h2>
                </motion.div>

                <motion.div
                    className="achievements-grid"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {achievements.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="achievement-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.1 * i }}
                        >
                            {item.certificate ? (
                                <a href={item.certificate} target="_blank" rel="noopener noreferrer" className="achievement-link">
                                    <span className="achievement-icon">{item.icon}</span>
                                    <div className="achievement-text">
                                        <span className="achievement-title">{item.title}</span>
                                        <span className="achievement-desc">{item.desc}</span>
                                    </div>
                                </a>
                            ) : (
                                <>
                                    <span className="achievement-icon">{item.icon}</span>
                                    <div className="achievement-text">
                                        <span className="achievement-title">{item.title}</span>
                                        <span className="achievement-desc">{item.desc}</span>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
