'use client';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function ClientWrapper({ children }) {
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const [contentReady, setContentReady] = useState(false); // Attendre le contenu

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem('hasSeenIntro') === 'true';

      if (hasSeenIntro) {
        setShowHeaderFooter(true);
        setContentReady(true);
      }

      const handleIntroFinished = () => {
        setShowHeaderFooter(true);
      };

      const handleContentReady = () => {
        setContentReady(true);
      };

      window.addEventListener('introFinished', handleIntroFinished);
      window.addEventListener('contentReady', handleContentReady);

      return () => {
        window.removeEventListener('introFinished', handleIntroFinished);
        window.removeEventListener('contentReady', handleContentReady);
      };
    }
  }, []);

  return (
    <>
      {showHeaderFooter && contentReady && <Header />}
      <main className="main-content">
        {children}
      </main>
      {showHeaderFooter && contentReady && <Footer />}
    </>
  );
}
