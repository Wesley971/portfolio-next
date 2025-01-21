'use client';
import { useState, useEffect } from 'react';


export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/projects.json'); // Remplacer par votre API
        if (!res.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 10000); // Change toutes les 10 secondes
    return () => clearInterval(interval);
  }, [projects.length]);

  const handleNavigation = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fullscreen-carousel">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${project.imageUrl})` }} // Utiliser une image si disponible
        >
          <div className="content">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Voir le projet
            </a>
          </div>
        </div>
      ))}
      <div className="carousel-controls">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleNavigation(index)}
          />
        ))}
      </div>
    </div>
  );
}
