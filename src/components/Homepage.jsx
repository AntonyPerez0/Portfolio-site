// src/components/Homepage.jsx
import React from 'react'
import './Homepage.css'
import profilePhoto from '../assets/profile-photo.jpg' // Import your photo
import resumePDF from '/Resume_2025.pdf';

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content-container">
          <div className="hero-image-container">
            <img src={profilePhoto} alt="Antony Perez" className="hero-image" />
          </div>
          <div className="hero-text-content">
            <h1 className="hero-title">Welcome to My Portfolio</h1>
            <p className="hero-subtitle">
              Android Developer | Full-Stack Developer | Technical Writer | Multiverse Apprentice | Problem Solver
            </p>
            <a href={resumePDF} className="cta-button" download="Resume_2025.pdf">Download Resume</a>
          </div>
        </div>
      </section>

      <section className="about-me">
        <h2>About Me</h2>
        <p>
          I'm a passionate full-stack developer and technical writer who recently completed
          a comprehensive apprenticeship program at Multiverse. I'm
          excited about opportunities to contribute to innovative
          projects and continue growing my technical skills, especially in Android development and documentation.
        </p>
        <p>
          My journey in tech is driven by a passion for creating efficient, scalable, and user-friendly applications, and authoring clear, developer-focused documentation.
        </p>
      </section>

      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Languages</h3>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>HTML5 & CSS3</li>
              <li>Kotlin</li>
              <li>Java</li>
              <li>SQL</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Frameworks & Libraries</h3>
            <ul>
              <li>React</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>Jetpack Compose</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & Platforms</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>Android Studio</li>
              <li>VS Code</li>
              <li>Postman</li>
              <li>Vite</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="apprenticeship-overview">
        <h2>Overview of My Apprenticeship</h2>
        <div className="overview-content">
          <p>
            During my time at Multiverse, I participated in an intensive full-stack
            development apprenticeship that provided me with real-world experience
            working on diverse projects. The program covered both front-end and
            back-end development, database management, and modern development practices.
          </p>
          <div className="apprenticeship-highlights">
            <div className="highlight-item">
              <h3>Duration</h3>
              <p>12-month intensive program</p>
            </div>
            <div className="highlight-item">
              <h3>Focus Areas</h3>
              <p>Full-stack development, Agile methodologies, Team collaboration</p>
            </div>
            <div className="highlight-item">
              <h3>Technologies</h3>
              <p>React, Node.js, SQL, Git, RESTful APIs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="learning-reflection">
        <h2>Reflection on Learning</h2>
        <div className="reflection-content">
          <p>
            My apprenticeship journey has been transformative, pushing me to grow both
            technically and professionally. I've developed a strong foundation in
            modern web development while learning the importance of clean code,
            effective communication, and continuous learning.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Homepage