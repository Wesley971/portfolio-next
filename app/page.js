'use client';
import { useEffect, useState } from 'react';
import '../styles/HomePage.scss';

export default function HomePage() {
  const welcomeTexts = ['Welcome to My Portfolio', 'Bienvenue sur mon Portfolio'];
  const [randomText, setRandomText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startAnimation, setStartAnimation] = useState(false); // Déclenche l'animation de couverture
  const [projects, setProjects] = useState([]); // Chargement des projets depuis JSON

  useEffect(() => {
    // Texte aléatoire
    const index = Math.floor(Math.random() * welcomeTexts.length);
    setRandomText(welcomeTexts[index]);

    // Chargement des projets
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur lors du chargement des projets :', error));
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  };

  const handleCTA = () => {
    setStartAnimation(true); // Déclenche l'animation
  };

  return (
    <div className="homepage">
      {/* Section de couverture */}
      <div
        className={`cover fullscreen ${startAnimation ? 'move-image' : ''}`}
        onMouseMove={handleMouseMove}
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <main className="welcome-container">
          <h1 className="welcome-text">
            <span className="typing-effect">{randomText}</span>
            <span className="wave">👋</span>
          </h1>
          <button className="cta-button" onClick={handleCTA}>
            Explorez mon travail 🤗​
          </button>
        </main>
      </div>

      {/* Contenu principal toujours présent */}
      <div className={`main-content ${startAnimation ? 'show' : 'hidden'}`}>
        <main>
          <section id="about">
            <div className="about-text">
              <h1>Hey ! Moi, c’est <strong>Wesley Abdoul</strong></h1>
              <p>
                Développeur web passionné🚀<br />
                Mon objectif ? Transformer vos idées en projets innovants, alliant <strong>design percutant</strong> et <strong>performance optimale</strong>.
              </p>
              <ul>
                <li><strong>Front-end :</strong> HTML, CSS, JavaScript, React, Next.js</li>
                <li><strong>Back-end :</strong> Node.js, Python</li>
                <li><strong>Techniques avancées :</strong> Optimisation des performances, SEO, responsive design</li>
              </ul>
              <p>
                💻 <a href="#projects">Explore mes projets</a>, et si tu as une idée ou un projet, <a href="#contact">contacte-moi</a> ! 🙌
              </p>
            </div>
            <img src="Photo/wesley.png" alt="Wesley Abdoul" />
          </section>

          <section id="illustrations">
            <h2>Découvrez mes projets</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => window.location.href = `/projects/${project.id}`}
                >
                  <img
                    src={project.projectPageImage}
                    alt={project.title}
                  />
                  <div className="overlay">
                    <p>{project.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact">
            <h2>Contactez-moi</h2>
            <p>Envoyez-moi un message pour discuter d'une collaboration !</p>
            <form method="post" action="">
              <div className="form-group">
                <div className="form-field">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" name="nom" id="nom" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows="10" required></textarea>
              </div>
              <button type="submit" className="cta-button">Envoyer</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}