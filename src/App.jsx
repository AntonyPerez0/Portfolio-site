import { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Blog from "./components/Blog"; // Import the new component
import StarsCanvas from "./components/Starfield"; // Import the new component

function App() {
  const getInitialSection = () => {
    const params = new URLSearchParams(window.location.search);
    const path =
      params.get("path") ||
      window.location.pathname.replace("/", "") ||
      "home";
    if (path.startsWith("projects")) return "projects";
    if (path.startsWith("contact")) return "contact";
    if (path.startsWith("blog")) return "blog";
    return "home";
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection);

  useEffect(() => {
    // This effect handles browser back/forward navigation
    const handlePopState = () => {
      setCurrentSection(getInitialSection());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (section) => {
    setCurrentSection(section);
    // Correct the path for the custom domain
    const newPath =
      section === "home" ? `/` : `/${section}/`;
    window.history.pushState({ section }, "", newPath);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Homepage />;
      case "projects":
        return <Projects />;
      case "blog":
        return <Blog />;
      case "contact":
        return <Contact />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="App">
      <StarsCanvas /> {/* Add the starfield canvas here */}
      <header className="App-header">
        <nav className="nav-bar">
          <div className="nav-brand">
            <h1>Antony Perez | Developer Portfolio</h1>
          </div>
          <ul className="nav-links">
            <li>
              <button
                className={currentSection === "home" ? "active" : ""}
                onClick={() => navigate("home")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={currentSection === "projects" ? "active" : ""}
                onClick={() => navigate("projects")}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                className={currentSection === "blog" ? "active" : ""}
                onClick={() => navigate("blog")}
              >
                Blog
              </button>
            </li>
            <li>
              <button
                className={currentSection === "contact" ? "active" : ""}
                onClick={() => navigate("contact")}
              >
                Contact
              </button>
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