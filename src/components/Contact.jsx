import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>
          I'm always interested in new opportunities and collaborations. 
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-section">
            <h2>Professional Profiles</h2>
            <div className="profile-links">
              <a 
                href="https://linkedin.com/in/your-profile" 
                className="contact-link linkedin"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="link-content">
                  <h3>LinkedIn</h3>
                  <p>Connect with me professionally</p>
                  <span className="link-arrow">→</span>
                </div>
              </a>
              
              <a 
                href="https://github.com/your-username" 
                className="contact-link github"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="link-content">
                  <h3>GitHub</h3>
                  <p>View my code and projects</p>
                  <span className="link-arrow">→</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-section">
            <h2>Email</h2>
            <div className="email-info">
              <p>For professional inquiries, please reach out to:</p>
              <a 
                href="mailto:your.email@example.com" 
                className="email-link"
              >
                your.email@example.com
              </a>
              <p className="email-note">
                I typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

          <div className="contact-section">
            <h2>About Me</h2>
            <div className="about-info">
              <p>
                I'm a passionate full-stack developer who recently completed 
                a comprehensive apprenticeship program at Multiverse. I'm 
                excited about opportunities to contribute to innovative 
                projects and continue growing my technical skills.
              </p>
              <p>
                My key strengths include:
              </p>
              <ul>
                <li>Full-stack development with React and Node.js</li>
                <li>Database design and management</li>
                <li>RESTful API development</li>
                <li>Agile development practices</li>
                <li>Team collaboration and communication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 