'use client';
import { useState, useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const mainSliderRef = useRef(null); // Référence pour le slider principal
  const thumbnailSliderRef = useRef(null); // Référence pour le slider des miniatures

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
    if (projects.length === 0) return;

    const main = new Splide(mainSliderRef.current, {
      type: 'fade',
      heightRatio: 0.5,
      pagination: false,
      arrows: false,
      cover: true,
      autoplay: true,
      interval: 5000, // Change toutes les 5 secondes
      rewind: true, // Assure une boucle infinie
    });

    const thumbnails = new Splide(thumbnailSliderRef.current, {
      rewind: true, // Assure une boucle infinie pour les miniatures
      fixedWidth: 104,
      fixedHeight: 58,
      isNavigation: true,
      gap: 10,
      focus: 'center',
      pagination: false,
      cover: true,
      breakpoints: {
        640: {
          fixedWidth: 66,
          fixedHeight: 38,
        },
      },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();

    return () => {
      main.destroy();
      thumbnails.destroy();
    };
  }, [projects]);

  return (
    <div className="fullscreen-carousel">
      {/* Slider principal */}
      <div id="main-slider" className="splide" ref={mainSliderRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {projects.map((project) => (
              <li key={project.id} className="splide__slide">
                <div
                  className="carousel-slide"
                  style={{
                    backgroundImage: `url(${project.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="content">
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      Voir le projet
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider des miniatures */}
      <div id="thumbnail-slider" className="splide" ref={thumbnailSliderRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {projects.map((project) => (
              <li key={project.id} className="splide__slide">
                <img src={project.imageUrl} alt={project.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
