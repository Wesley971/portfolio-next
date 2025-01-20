'use client';
import { useEffect, useState } from 'react';
import '../styles/HomePage.scss';

export default function HomePage() {
  const welcomeTexts = ['Welcome to My Portfolio', 'Bienvenue sur mon Portfolio'];
  const [randomText, setRandomText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startAnimation, setStartAnimation] = useState(false); // Déclenche l'animation de couverture
  const [showHomeContent, setShowHomeContent] = useState(false); // Affiche le contenu principal

  useEffect(() => {
    const index = Math.floor(Math.random() * welcomeTexts.length);
    setRandomText(welcomeTexts[index]);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  };

  const handleCTA = () => {
    setStartAnimation(true); // Déclenche l'animation
    setTimeout(() => {
      setShowHomeContent(true); // Affiche le contenu principal après l'animation
    }, 1000); // Durée de l'animation CSS
  };

  return (
    <div className="homepage">
      {/* Section de couverture */}
      {!showHomeContent && (
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
      )}

      {/* Contenu principal (affiché après clic sur CTA) */}
      {showHomeContent && (
        <div className="home-content">
          <main>
            <section id="projects">
              <h2>Mes projets récents</h2>
              <p>Voici quelques projets sur lesquels j'ai travaillé récemment.</p>
            </section>
            <section id="about">
              <h2>À propos de moi</h2>
              <p>Je suis passionné de développement web et de design.</p>
            </section>
            <section id="contact">
              <h2>Contactez-moi</h2>
              <p>Envoyez-moi un message pour discuter d'une collaboration !</p>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}
