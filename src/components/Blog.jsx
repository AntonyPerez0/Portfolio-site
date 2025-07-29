import React, { useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Antony Perez";
    document.querySelector('meta[name="description"]').setAttribute("content", "Read about Antony Perez's journey from retail to tech, his educational path, and his experience as a software developer and technical writer.");
  }, []);

  return (
    <div className="blog">
      <div className="blog-post">
        <h1>How My Unconventional Journey Made Me a Better Developer</h1>

        <p>In the world of technology, we often hear about the traditional career paths—a computer science degree that leads directly to a software engineering role. But what about the paths less traveled? My journey to becoming a software developer and technical writer hasn't been linear, but it has been a deliberate and rewarding one, equipping me with a unique and powerful combination of skills that I bring to every project.</p>

        <h3>Foundations in Communication and Leadership</h3>
        <p>My career began not in front of a computer screen, but on the front lines of customer service. As a Retail Sales Manager at adidas, I learned invaluable lessons in leadership, communication, and problem-solving. I wasn't just managing inventory levels or implementing sales strategies; I was learning how to understand people's needs, resolve conflicts, and lead a high-performing team toward a common goal. These are skills that are just as crucial in a development team as they are on a sales floor, fostering collaboration and ensuring everyone is aligned on the project's vision.</p>

        <h3>Bridging the Gap: A Shift into the Technical World</h3>
        <p>My transition into the tech world began at UL Solutions, where I worked as a Laboratory Technician. This role was a deep dive into the world of meticulous testing, data analysis, and quality assurance. I conducted comprehensive safety testing on electrical products, ensuring they complied with industry standards. It was here that I honed my analytical skills, collaborated closely with engineers to troubleshoot product issues, and gained a deep appreciation for the precision and attention to detail required to build robust and reliable products. This experience gave me a foundational understanding of the engineering lifecycle from a quality perspective.</p>
        
        <h3>A Formal Education in Tech</h3>
        <p>With my interest in technology ignited, I pursued a formal education to build a solid theoretical foundation. I completed a comprehensive course in Full Stack Web Development from Altcademy, which gave me my first real taste of building complete web applications. Building on that, I enrolled in the intensive Computer Software Engineering bootcamp at Multiverse. This program was instrumental in refining my practical skills and exposing me to agile methodologies and real-world development workflows.</p>
        <p>My hunger for knowledge hasn't stopped there. I am currently pursuing a Bachelor of Science in Computer Science from Western Governors University to deepen my understanding of core computing principles, which I expect to complete in May 2025. Following my passion for continuous growth, I plan to continue my studies at WGU to obtain a Master of Science in Computer Science. This blend of practical, bootcamp-style learning and a formal degree program has given me a well-rounded and robust technical education.</p>

        <h3>The Developer Who Writes: A Dual Perspective</h3>
        <p>This unique foundation led me to my current role at Clover Network, LLC, where I've had the incredible opportunity to merge my passions for technology and communication as a Technical Writer. Here, I author clear, concise user guides and API documentation that empower third-party developers to integrate our mobile SDKs and e-commerce features seamlessly. To improve our documentation quality and workflow, I develop and automate scripts using GitHub Actions that proactively check for broken links and pull the latest API references from our internal systems, ensuring our documentation is always up-to-date and reliable.</p>

        <h3>My Technical Skills Include:</h3>
        <ul>
          <li><strong>Programming Languages:</strong> Java, Kotlin, JavaScript, HTML/CSS</li>
          <li><strong>Frameworks & Libraries:</strong> ReactJS, JetPack Compose, Node.js, Bootstrap, Next.js</li>
          <li><strong>Developer Tools:</strong> Git, TypeScript</li>
          <li><strong>Methodologies:</strong> Agile, Scrum</li>
        </ul>

        <p>My journey has been anything but conventional, but it has given me a well-rounded perspective that I bring to every line of code I write and every piece of documentation I create. I'm not just a developer; I'm a problem-solver, a communicator, and a lifelong learner. I'm excited to bring my unique skillset to a team that is building the future of technology.</p>
      </div>
    </div>
  );
};

export default Blog;