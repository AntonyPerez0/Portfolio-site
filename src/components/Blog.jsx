import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog">
      <div className="blog-post">
        <h1>How My Journey from Retail to Tech Made Me a Better Developer</h1>

        <p>In technology, we often hear about traditional career paths—computer science degrees leading directly to software engineering roles. But what about the paths less traveled? My journey to becoming a software developer and technical writer wasn't linear, but it has equipped me with a unique and powerful combination of skills that I bring to every project.</p>

        <h3>Foundations in Communication and Leadership</h3>
        <p>My career began not in front of a computer screen, but on the front lines of customer service. As an Assistant Manager at Toto Trattoria and later a Retail Sales Manager at adidas, I learned invaluable lessons in leadership, communication, and problem-solving. I wasn't just managing inventory or sales targets; I was learning how to understand people's needs, resolve conflicts, and lead a team toward a common goal—skills that are just as crucial in a development team as they are on a sales floor.</p>

        <h3>Bridging the Gap: A Shift into the Technical World</h3>
        <p>My transition into the tech world began at UL Solutions, where I worked as a Laboratory Technician. This role was a deep dive into the world of meticulous testing, data analysis, and quality assurance. It was here that I honed my analytical skills and collaborated closely with engineers, gaining a deep appreciation for the precision and attention to detail required to build robust and reliable products.</p>

        <h3>The Developer Who Writes: A Dual Perspective</h3>
        <p>This foundation led me to my current role at Clover, where I've had the incredible opportunity to merge my passions for technology and communication as a Technical Writer. Here, I craft clear, concise user guides and API documentation that empower other developers. To improve our documentation quality and workflow, I develop scripts to automate tasks like link checking and pulling the latest API references from our internal systems. To make these tools accessible and efficient for the entire team, I create and maintain GitHub Actions that run these scripts automatically. This ensures our documentation is always up-to-date and reliable.</p>

        <h3>My Technical Skills Include:</h3>
        <ul>
          <li><strong>Programming Languages:</strong> Java, Kotlin, JavaScript, HTML/CSS</li>
          <li><strong>Frameworks & Libraries:</strong> ReactJS, JetPack Compose, Node.js, Bootstrap, Next.js</li>
          <li><strong>Developer Tools:</strong> Git, TypeScript</li>
          <li><strong>Methodologies:</strong> Agile, Scrum</li>
        </ul>

        <p>My journey has been unconventional, but it has given me a well-rounded perspective that I bring to every line of code I write and every piece of documentation I create. I'm not just a developer; I'm a problem-solver, a communicator, and a team player, and I'm excited to bring my unique skillset to a team that is building the future of technology.</p>
      </div>
    </div>
  );
};

export default Blog;