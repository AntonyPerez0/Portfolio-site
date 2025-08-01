import React, { useEffect } from 'react'
import './Contact.css'

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Antony Perez";
    document.querySelector('meta[name="description"]').setAttribute("content", "Get in touch with Antony Perez. Find links to his LinkedIn and GitHub profiles, and his email address for professional inquiries.");
  }, []);

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>
          I'm ready for new opportunities and collaborations. Connect with me through the channels below, or download my resume for a detailed look at my experience.
        </p>
        <a href="/Resume_2025.pdf" className="cta-button" download="Resume_2025.pdf">Download Resume</a>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-section">
            <h2>Professional Profiles</h2>
            <div className="profile-links">
              <a
                href="https://www.linkedin.com/in/antonyperez01/"
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
                href="https://github.com/AntonyPerez0"
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
                href="mailto:antonyperez0@yahoo.com"
                className="email-link"
              >
                antonyperez0@yahoo.com
              </a>
              <p className="email-note">
                I typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact