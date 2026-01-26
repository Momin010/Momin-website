import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section id="contact" className="section contact" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="section-label">Contact</span>
                    <h2 className="contact-title">Let's build something</h2>

                    <div className="contact-links">
                        <a
                            href="https://github.com/Momin010"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            GitHub ↗
                        </a>
                        <a
                            href="https://www.linkedin.com/in/momin-aldahdouh-49ab87380"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href="https://mominai.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            MominAI ↗
                        </a>
                    </div>

                    <p className="contact-location">Tampere, Finland</p>
                </motion.div>
            </div>
        </section>
    )
}
