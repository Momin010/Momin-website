import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Goals.css'

const goals = [
    { title: 'Finish MominOS kernel', progress: 40 },
    { title: 'Launch MominAI beta', progress: 65 },
    { title: 'Publish EventConnect mobile', progress: 30 },
    { title: '€1M before 17', progress: 2 },
]

export default function Goals() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section id="goals" className="section goals" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="goals-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">2026</span>
                    <h2 className="goals-title">Goals</h2>
                </motion.div>

                <div className="goals-list">
                    {goals.map((goal, i) => (
                        <motion.div
                            key={goal.title}
                            className="goal-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                        >
                            <div className="goal-header">
                                <span className="goal-title">{goal.title}</span>
                                <span className="goal-percent">{goal.progress}%</span>
                            </div>
                            <div className="goal-bar">
                                <motion.div
                                    className="goal-fill"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${goal.progress}%` } : { width: 0 }}
                                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
