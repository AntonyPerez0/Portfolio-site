import React from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project }) => {
  const { title, description, technologies, codeUrl, imageUrl } = project

  return (
    <div className="project-card">
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        
        <p className="project-description">{description}</p>
        
        <div className="project-technologies">
          <h4>Technologies Used:</h4>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="project-links">
          <a 
            href={codeUrl} 
            className="project-link code-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard 