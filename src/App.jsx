import { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const path = window.location.pathname.split("/").pop();
    switch (path) {
      case "projects":
        setCurrentSection("projects");
        break;
      case "contact":
        setCurrentSection("contact");
        break;
      default:
        setCurrentSection("home");
        break;
    }
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Homepage />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav-bar">
          <div className="nav-brand">
            <h1>Antony Perez | Developer Portfolio</h1>
          </div>
          <ul className="nav-links">
            <li>
              <a
                href="/portfolio-site/"
                className={currentSection === "home" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSection("home");
                  window.history.pushState({}, "", "/portfolio-site/");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/portfolio-site/projects"
                className={currentSection === "projects" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSection("projects");
                  window.history.pushState({}, "", "/portfolio-site/projects");
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/portfolio-site/contact"
                className={currentSection === "contact" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSection("contact");
                  window.history.pushState({}, "", "/portfolio-site/contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="App-main">{renderSection()}</main>

      <footer className="App-footer">
        <div className="footer-links">
          <a
            href="https://github.com/AntonyPerez0"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/antonyperez01/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p>&copy; 2025 Antony Perez. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
