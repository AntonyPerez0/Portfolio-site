import { useState } from 'react'
import './App.css'
import Homepage from './components/Homepage'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Homepage />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      default:
        return <Homepage />
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav-bar">
          <div className="nav-brand">
            <h1>My Portfolio</h1>
          </div>
          <ul className="nav-links">
            <li>
              <button 
                className={currentSection === 'home' ? 'active' : ''}
                onClick={() => setCurrentSection('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={currentSection === 'projects' ? 'active' : ''}
                onClick={() => setCurrentSection('projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                className={currentSection === 'contact' ? 'active' : ''}
                onClick={() => setCurrentSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="App-main">
        {renderSection()}
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2025 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
