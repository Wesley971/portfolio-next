'use client';
import '../styles/HomePage.scss';

export default function HomePage() {
  const welcomeTexts = ['Welcome to My Portfolio', 'Bienvenue sur mon Portfolio'];
  const randomText = welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];

  return (
    <div className="homepage">
      <main>
        <div className="welcome-container">
          <h1 className="welcome-text">
            {randomText} <span className="wave">👋</span>
          </h1>
        </div>
      </main>
    </div>
  );
}
