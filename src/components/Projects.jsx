import React from 'react'
import ProjectCard from './ProjectCard'
import './Projects.css'

const Projects = () => {
  // Sample projects data - you can replace with actual project details
  const projects = [
    {
      id: 1,
      title: "Inventory Full-Stack Application",
      description: "A comprehensive inventory management system built with React frontend and Node.js backend. Features include user authentication, CRUD operations, real-time updates, and responsive design.",
      technologies: ["React", "Node.js", "Express", "SQL", "JWT", "CSS3"],
      codeUrl: "https://github.com/your-username/inventory-app",
      imageUrl: "https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Inventory+App"
    },
    {
      id: 2,
      title: "Final Bootcamp Hackathon Project",
      description: "A collaborative project developed during an intensive hackathon. This application demonstrates rapid prototyping, team coordination, and innovative problem-solving under time constraints.",
      technologies: ["React", "Firebase", "Material-UI", "JavaScript", "Git"],
      codeUrl: "https://github.com/your-username/hackathon-project",
      imageUrl: "https://via.placeholder.com/400x250/50C878/FFFFFF?text=Hackathon+Project"
    },
    {
      id: 3,
      title: "Back-End Module Project",
      description: "A robust RESTful API built with Node.js and Express. Includes comprehensive error handling, data validation, authentication middleware, and thorough testing.",
      technologies: ["Node.js", "Express", "Jest", "PostgreSQL", "JWT", "Swagger"],
      codeUrl: "https://github.com/your-username/backend-module",
      imageUrl: "https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Backend+API"
    },
    {
      id: 4,
      title: "Front-End Module Project",
      description: "A modern, responsive web application showcasing advanced React concepts including hooks, context API, and component composition. Features smooth animations and intuitive UX.",
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Local Storage"],
      codeUrl: "https://github.com/your-username/frontend-module",
      imageUrl: "https://via.placeholder.com/400x250/9B59B6/FFFFFF?text=Frontend+App"
    }
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