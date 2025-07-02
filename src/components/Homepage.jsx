import React from 'react'
import './Homepage.css'

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to My Portfolio</h1>
          <p className="hero-subtitle">
            Android Developer | Full-Stack Developer | Technical Writer | Multiverse Apprentice | Problem Solver
          </p>
          <p className="hero-description">
            I'm a passionate developer and technical writer who completed a comprehensive apprenticeship program 
            at Multiverse, where I gained hands-on experience in modern web development and Android app development. 
            I specialize in creating efficient, scalable, and user-friendly applications, and authoring clear, developer-focused documentation.
          </p>
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
          
          <div className="key-skills">
            <h3>Key Skills Developed</h3>
            <ul>
              <li><strong>Technical Skills:</strong> React.js, Node.js, SQL, RESTful API development</li>
              <li><strong>Soft Skills:</strong> Team collaboration, problem-solving, time management</li>
              <li><strong>Development Practices:</strong> Agile methodologies, version control, code review</li>
              <li><strong>Tools & Technologies:</strong> Git, VS Code, Postman, various testing frameworks</li>
            </ul>
          </div>

          <div className="growth-areas">
            <h3>Areas of Growth</h3>
            <p>
              Throughout this journey, I've learned to approach complex problems 
              systematically, communicate technical concepts clearly, and adapt 
              quickly to new technologies. The hands-on project experience has 
              given me confidence in building full-stack applications from concept 
              to deployment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage 