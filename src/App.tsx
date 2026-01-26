import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FloatingCanvas from './components/3d/FloatingCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Experience from './components/Experience'
import Goals from './components/Goals'
import Contact from './components/Contact'

import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      {/* Full-page 3D Canvas Background */}
      <FloatingCanvas />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Experience />
        <Goals />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Momin Aldahdouh</p>
        </div>
      </footer>
    </>
  )
}

export default App
