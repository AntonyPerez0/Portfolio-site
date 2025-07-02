import React from 'react'
import ProjectCard from './ProjectCard'
import './Projects.css'

const Projects = () => {
  // Sample projects data - you can replace with actual project details
  const projects = [
    {
      id: 2,
      title: "Final Bootcamp Hackathon Project: Portfolio Website",
      description: "This professional portfolio website was built as the capstone project for my Multiverse apprenticeship. It showcases my technical skills, project work, and contact information. Built with React, Vite, and modern CSS, the site features a clean, responsive design, component-based architecture, and automated testing with Vitest and React Testing Library.",
      technologies: ["React", "Vite", "CSS3", "Jest", "React Testing Library"],
      codeUrl: "https://github.com/AntonyPerez0/Portfolio-site",
    },
    {
      id: 3,
      title: "Back-End Module Project: Personal Notes API",
      description: "A secure and personalized RESTful API for managing notes. Features user registration, login with JWT tokens, password hashing, protected routes, CRUD operations, and an admin layer for managing all users and notes. Built with Node.js, Express.js, and SQLite3.",
      technologies: ["Node.js", "Express.js", "SQLite3", "JWT", "bcryptjs", "REST API"],
      codeUrl: "https://github.com/AntonyPerez0/notesApp",
      imageUrl: "https://via.placeholder.com/400x250/2C3E50/FFD700?text=Notes+API"
    },
    {
      id: 4,
      title: "Front-End Module Project: Android PocketDex (PokeAPI)",
      description: "Red's PokeDex is an Android application built with Kotlin and Jetpack Compose. It allows users to browse and search for Pokémon, view detailed information, and manage their Pokémon team with a modern UI.",
      technologies: ["Kotlin", "Jetpack Compose", "Android Studio"],
      codeUrl: "https://github.com/AntonyPerez0/Android-PokeAPI",
      imageUrl: "https://via.placeholder.com/400x250/FFCB05/3B4CCA?text=PocketDex+Android"
    },
    {
      id: 6,
      title: "MultiClock (Android App)",
      description: "MultiClock is an Android application that helps you keep track of your clock-in and clock-out times and check the weather in your city. Features include 8.5-hour workday calculation and real-time weather checks using the OpenWeatherMap API. All calculations are performed locally, and no personal data is collected.",
      technologies: ["Java", "Android Studio", "OpenWeatherMap API"],
      codeUrl: "https://github.com/AntonyPerez0/multiClockApp"
    },
  ]

  return (
    <div className="projects">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Here are the major projects I completed during my Multiverse apprenticeship. 
          Each project demonstrates different aspects of full-stack development and 
          showcases my growing technical skills.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="projects-footer">
        <p>
          These projects represent my journey from learning basic concepts to 
          building complete, production-ready applications. Each project was 
          developed using industry best practices and modern development workflows.
        </p>
      </div>
    </div>
  )
}

export default Projects 