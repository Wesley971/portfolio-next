'use client';
import { useState, useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/projects.json'); // Remplacer par votre API
        if (!res.ok) throw new Error('Erreur lors du chargement des projets');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
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
      interval: 5000,
      rewind: true,
    });

    const thumbnails = new Splide(thumbnailSliderRef.current, {
      rewind: true,
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

    // Synchronisation des sliders
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
      {loading ? (
        <div
          className="loading-container"
          style={{
            minHeight: '80vh', // Cette hauteur garantit que le footer ne remontera pas
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>Chargement des projets...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Slider principal */}
          <div
            id="main-slider"
            className="splide"
            ref={mainSliderRef}
            style={{ minHeight: '80vh' }} // Ajout d'un minHeight pour éviter le déplacement du footer
          >
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
          <div
            id="thumbnail-slider"
            className="splide"
            ref={thumbnailSliderRef}
          >
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
        </motion.div>
      )}
    </div>
  );
}
