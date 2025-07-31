import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

// Import your project images
import inventoryImage from "../assets/projects/inventory-management-app.png";
import portfolioImage from "../assets/projects/portfolio-website-screenshot.png";
import notesApiImage from "../assets/projects/notes-api-endpoints.png";
import pokedexImage from "../assets/projects/pokedex-android-app.png";
import multiclockImage from "../assets/projects/multiclock-android-app.png";


const Projects = () => {
  useEffect(() => {
    document.title = "Projects | Antony Perez";
    document.querySelector('meta[name="description"]').setAttribute("content", "A showcase of projects by Antony Perez, including a full-stack inventory app, a portfolio website, a notes API, and Android applications.");
  }, []);
  // Sample projects data - you can replace with actual project details
  const projects = [
    {
      id: 1,
      title: "Full-Stack Inventory Application",
      description:
        "I co-developed a full-stack inventory management system for the Fiserv-Multiverse SWE Apprenticeship. Our team of three built a robust REST API with Node.js and Express and a dynamic React front-end to deliver a complete CRUD solution for product and stock management. We used GitHub for version control, proving our strong collaborative abilities.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "SQLite",
        "REST API",
        "Teamwork",
      ],
      codeUrl:
        "https://github.com/MV-SWE-Fiserv-US/group-full-stack-inventory-project-team-rocket",
      detailsUrl: "#", // Add a placeholder link
      imageUrl: inventoryImage, // Use the imported image
    },
    {
      id: 2,
      title: "Final Bootcamp Hackathon Project: Portfolio Website",
      description:
        "As my capstone project for the Multiverse apprenticeship, I built this portfolio to showcase my skills. I used React, Vite, and modern CSS to create a clean, responsive, and component-based website. I also wrote a full suite of tests using Vitest and React Testing Library to ensure quality.",
      technologies: ["React", "Vite", "CSS3", "Jest", "React Testing Library"],
      codeUrl: "https://github.com/AntonyPerez0/Portfolio-site",
      detailsUrl: "#", // Add a placeholder link
      imageUrl: portfolioImage, // Use the imported image
    },
    {
      id: 3,
      title: "Back-End Module Project: Personal Notes API",
      description:
        "I built a secure RESTful API for a personal notes application. It features JWT-based user authentication, password hashing, protected routes, full CRUD functionality, and an admin layer for user and note management. The tech stack includes Node.js, Express.js, and SQLite3.",
      technologies: [
        "Node.js",
        "Express.js",
        "SQLite3",
        "JWT",
        "bcryptjs",
        "REST API",
      ],
      codeUrl: "https://github.com/AntonyPerez0/notesApp",
      detailsUrl: "#", // Add a placeholder link
      imageUrl: notesApiImage, // Use the imported image
    },
    {
      id: 4,
      title: "Front-End Module Project: Android PocketDex (PokeAPI)",
      description:
        "I developed Red's PokeDex, an Android app using Kotlin and Jetpack Compose. It connects to the PokeAPI, allowing users to browse, search, and manage their Pokémon teams through a sleek, modern interface.",
      technologies: ["Kotlin", "Jetpack Compose", "Android Studio"],
      codeUrl: "https://github.com/AntonyPerez0/Android-PokeAPI",
      detailsUrl: "#", // Add a placeholder link
      imageUrl: pokedexImage, // Use the imported image
    },
    {
      id: 6,
      title: "MultiClock (Android App)",
      description:
        "I created MultiClock, an Android app for time tracking and weather updates. It calculates an 8.5-hour workday and provides real-time weather via the OpenWeatherMap API, all while ensuring user privacy by processing data locally.",
      technologies: ["Java", "Android Studio", "OpenWeatherMap API"],
      codeUrl: "https://github.com/AntonyPerez0/multiClockApp",
      detailsUrl: "#", // Add a placeholder link
      imageUrl: multiclockImage, // Use the imported image
    },
  ];

  return (
    <div className="projects">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Explore the key projects from my Multiverse apprenticeship. Each one highlights a different facet of my full-stack development expertise and demonstrates my expanding skillset.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="projects-footer">
        <p>
          This is my journey from code novice to production-ready developer. Every project here was built with industry-best-practices and a modern development workflow.
        </p>
      </div>
    </div>
  );
};

export default Projects;