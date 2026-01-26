import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className="hero">
            {/* Content - no 3D here, it's in the global canvas */}
            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <span className="badge-dot"></span>
                        Available for projects
                    </motion.div>

                    <motion.h1
                        className="hero-name"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Momin
                        <br />
                        <span className="name-accent">Aldahdouh</span>
                    </motion.h1>

                    <motion.p
                        className="hero-role"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Software Developer · Founder · 15
                    </motion.p>

                    <motion.p
                        className="hero-location"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        📍 Tampere, Finland
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <button className="cta-primary" onClick={() => scrollToSection('projects')}>
                            See my work
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <a
                            href="https://github.com/Momin010"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-secondary"
                        >
                            GitHub
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    className="scroll-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <div className="scroll-line"></div>
                </motion.div>
            </div>
        </section>
    )
}
