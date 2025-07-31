import React, { useEffect } from 'react'
import './Homepage.css'
import profilePhoto from '../assets/antony-perez-profile.jpg' 

const Homepage = () => {
  useEffect(() => {
    document.title = "Antony Perez | Developer Portfolio";
    document.querySelector('meta[name="description"]').setAttribute("content", "The portfolio of Antony Perez, a full-stack developer, Android developer, and technical writer. View my projects and get in touch.");
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Antony Perez",
    "url": "http://antonyperez.com",
    "image": "http://antonyperez.com/profile-photo.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/antonyperez01/",
      "https://github.com/AntonyPerez0"
    ],
    "jobTitle": "Full-Stack Developer, Android Developer, Technical Writer",
    "worksFor": {
      "@type": "Organization",
      "name": "Clover Network, LLC"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Western Governors University",
        "sameAs": "https://www.wgu.edu/"
      },
      {
        "@type": "EducationalOrganization",
        "name": "Multiverse",
        "sameAs": "https://www.multiverse.io/"
      }
    ]
  };

  return (
    <div className="homepage">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
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
            <a href="/Resume_2025.pdf" className="cta-button" download="Resume_2025.pdf">Download Resume</a>
          </div>
        </div>
      </section>

      <section className="about-me">
        <h2>About Me</h2>
        <p>
          I am a full-stack developer and technical writer, having completed a comprehensive software engineering apprenticeship at Multiverse. My professional journey began in retail leadership, where I developed strong communication and problem-solving skills. This experience provided me with a unique perspective, enabling me to effectively bridge the gap between complex technical concepts and user-friendly solutions.
        </p>
        <p>
           I am passionate about developing high-quality, scalable, and user-centric applications, as well as authoring clear and concise documentation. I am eager to contribute my diverse skillset to a forward-thinking team dedicated to building innovative technology.
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
            I completed an intensive, hands-on full-stack development apprenticeship at Multiverse, where I tackled a diverse range of real-world projects. This immersive program solidified my expertise in both front-end and back-end development, database management, and the agile methodologies that drive modern tech.
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
            My apprenticeship was a catalyst for my professional and technical growth. I emerged with a strong foundation in modern web development and a deep appreciation for clean code, effective communication, and continuous learning. This experience has instilled in me a commitment to lifelong learning that I bring to every project.
          </p>
          <p>
            I am currently channeling that passion into a Bachelor of Science in Computer Science from Western Governors University, where I'm deepening my understanding of the fundamental principles that underpin our field. My goal is to not just keep up with the ever-evolving world of technology, but to become a driving force within it.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Homepage