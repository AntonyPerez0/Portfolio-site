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

        <p>In the world of technology, career paths are often linear. However, my journey to becoming a software developer and technical writer has been anything but conventional. It has equipped me with a unique and powerful combination of skills that I bring to every project.</p>

        <h3>Foundations in Communication and Leadership</h3>
        <p>My career began in a customer-facing role as a Retail Sales Manager at adidas, where I gained invaluable experience in leadership, communication, and problem-solving. I learned to understand people's needs, resolve conflicts, and lead a high-performing team toward a common goal. These skills are just as crucial in a development team as they are on a sales floor, fostering collaboration and ensuring everyone is aligned with the project's vision.</p>

        <h3>Bridging the Gap: A Shift into the Technical World</h3>
        <p>My transition into the tech world began at UL Solutions, where I worked as a Laboratory Technician. This role was a deep dive into the world of meticulous testing, data analysis, and quality assurance. I conducted comprehensive safety testing on electrical products, ensuring they complied with industry standards. It was here that I honed my analytical skills, collaborated closely with engineers to troubleshoot product issues, and gained a deep appreciation for the precision and attention to detail required to build robust and reliable products.</p>
        
        <h3>A Formal Education in Tech</h3>
        <p>With a newfound interest in technology, I pursued a formal education to build a solid theoretical foundation. I completed a comprehensive course in Full Stack Web Development from Altcademy, which gave me my first real taste of building complete web applications. Building on that, I enrolled in the intensive Computer Software Engineering bootcamp at Multiverse. This program was instrumental in refining my practical skills and exposing me to agile methodologies and real-world development workflows.</p>
        <p>My pursuit of knowledge continues. I am currently pursuing a Bachelor of Science in Computer Science from Western Governors University to deepen my understanding of core computing principles, which I expect to complete by the end of 2025. Following my passion for continuous growth, I plan to continue my studies at WGU to obtain a Master of Science in Computer Science. This blend of practical, bootcamp-style learning and a formal degree program has given me a well-rounded and robust technical education.</p>

        <h3>The Developer Who Writes: A Dual Perspective</h3>
        <p>This unique foundation led me to my current role at Clover Network, LLC, where I've had the incredible opportunity to merge my passions for technology and communication as a Technical Writer. Here, I author clear, concise user guides and API documentation that empower third-party developers to seamlessly integrate our mobile SDKs and e-commerce features. To improve our documentation quality and workflow, I develop and automate scripts using GitHub Actions that proactively check for broken links and pull the latest API references from our internal systems, ensuring our documentation is always up-to-date and reliable.</p>

        <h3>Why I'm a Great Fit</h3>
        <ul>
          <li><strong>Passionate about Continuous Learning:</strong> I am a lifelong learner, constantly seeking out new technologies and best practices to improve my skills and deliver cutting-edge solutions.</li>
          <li><strong>Collaborative Team Player:</strong> My experience in both retail leadership and software development has taught me the importance of clear communication, teamwork, and a shared vision for success.</li>
          <li><strong>Proactive Problem-Solver:</strong> I am a proactive and resourceful problem-solver, always looking for opportunities to improve processes, automate tasks, and deliver a better end-product.</li>
        </ul>

        <p>My journey has been anything but conventional, but it has given me a well-rounded perspective that I bring to every line of code I write and every piece of documentation I create. I am not just a developer; I am a problem-solver, a communicator, and a lifelong learner. I am excited to bring my unique skillset to a team that is building the future of technology.</p>
      </div>
    </div>
  );
};

export default Blog;