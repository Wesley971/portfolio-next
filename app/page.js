'use client';
import { useEffect, useState, useCallback } from 'react';
import '../styles/HomePage.scss';

export default function HomePage() {
  const welcomeTexts = ['Welcome to My Portfolio', 'Bienvenue sur mon Portfolio'];
  const [randomText, setRandomText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startAnimation, setStartAnimation] = useState(null); // null pour éviter le flash initial
  const [showContent, setShowContent] = useState(false); // Gère l'affichage progressif du contenu principal
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = () => {
    setSelectedProject(null);
  }

  useEffect(() => {
    setRandomText(welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)]);

    // Vérifier si l'intro a déjà été vue
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro') === 'true';
    setStartAnimation(hasSeenIntro);

    if (hasSeenIntro) {
      setShowContent(true); // Afficher immédiatement le contenu principal si l'animation est déjà passée
    }
  }, []);

  const handleStartAnimation = () => {
    setStartAnimation(true);
    sessionStorage.setItem('hasSeenIntro', 'true'); // Marquer comme vu
    setTimeout(() => setShowContent(true), 800); // Lancer le contenu avec un léger délai pour la transition
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await response.json();
        if (isMounted) setProjects(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    fetchProjects();
    return () => { isMounted = false; };
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Ne rien afficher tant que sessionStorage n'a pas été vérifié
  if (startAnimation === null) {
    return null;
  }

  return (
    <div className="homepage">
      {/* Section d'intro avec effet de zoom et fade-in */}
      {!startAnimation && (
        <div
          className="cover fullscreen fade-in"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <main className="welcome-container zoom-in">
            <h1 className="welcome-text">
              <span className="typing-effect">{randomText}</span>
              <span className="wave">👋</span>
            </h1>
            <button className="cta-button" onClick={handleStartAnimation}>
              Explorez mon travail 🤗​
            </button>
          </main>
        </div>
      )}

      {/* Contenu principal avec animation d'apparition */}
      <div className={`main-content ${showContent ? 'fade-in' : 'hidden'}`}>
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
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.projectPageImage} alt={project.title} />
                <div className="overlay">
                  <p>{project.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Chargement des projets...</p>
          )}
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>{selectedProject.title}</h2>
            <img src={selectedProject.projectPageImage} alt={selectedProject.title} />
            <p>{selectedProject.description}</p>
            <div className="modal-action">
              <button onClick={() => window.open(selectedProject.link, '_blank')}>
                Voir le projet
              </button>
            </div>
          </div>
        </div>
      )}
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
