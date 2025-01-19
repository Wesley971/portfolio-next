'use client';
import { useEffect, useState } from 'react';
import '../styles/HomePage.scss';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter(); // Utilisé pour la navigation Next.js
  const welcomeTexts = ['Welcome to My Portfolio', 'Bienvenue sur mon Portfolio'];
  const [randomText, setRandomText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const index = Math.floor(Math.random() * welcomeTexts.length);
    setRandomText(welcomeTexts[index]);
  }, []);

  const handleMouseMove = (e) => {
    // Calculer la position relative de la souris pour l'effet de parallaxe
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  };

  const handleCTA = () => {
    // Naviguer vers la page principale
    router.push('/projects'); // Remplacer par le chemin de votre page principale
  };

  return (
    <div
      className="homepage fullscreen"
      onMouseMove={handleMouseMove}
      style={{
        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <main>
        <div className="welcome-container">
          <h1 className="welcome-text">
            <span className="typing-effect">{randomText}</span>
            <span className="wave">👋</span>
          </h1>
          <button className="cta-button" onClick={handleCTA}>
            Explorez mon travail 🤗​
          </button>
        </div>
      </main>
    </div>
  );
}
