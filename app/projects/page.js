'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const mainInstance = useRef(null);
  const thumbnailsInstance = useRef(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/projects.json');
      if (!res.ok) throw new Error('Erreur lors du chargement des projets');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (projects.length === 0 || !mainSliderRef.current || !thumbnailSliderRef.current) return;

    if (!mainInstance.current && !thumbnailsInstance.current) {
      mainInstance.current = new Splide(mainSliderRef.current, {
        type: 'fade',
        heightRatio: 0.5,
        pagination: false,
        arrows: false,
        cover: true,
        autoplay: true,
        interval: 5000,
        rewind: true,
      });

      thumbnailsInstance.current = new Splide(thumbnailSliderRef.current, {
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

      mainInstance.current.sync(thumbnailsInstance.current);
      mainInstance.current.mount();
      thumbnailsInstance.current.mount();
    }

    return () => {
      mainInstance.current?.destroy();
      thumbnailsInstance.current?.destroy();
      mainInstance.current = null;
      thumbnailsInstance.current = null;
    };
  }, [projects]);

  return (
    <div className="fullscreen-carousel">
      {loading ? (
        <motion.div 
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <p>Chargement des projets...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Slider principal */}
          <motion.div 
            id="main-slider" 
            className="splide" 
            ref={mainSliderRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ minHeight: '80vh' }} // Ajout d'une hauteur minimale
          >
            <div className="splide__track">
              <ul className="splide__list">
                {projects.map((project, index) => (
                  <motion.li 
                    key={project.id} 
                    className="splide__slide"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Slider des miniatures */}
          <motion.div 
            id="thumbnail-slider" 
            className="splide" 
            ref={thumbnailSliderRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="splide__track">
              <ul className="splide__list">
                {projects.map((project, index) => (
                  <motion.li 
                    key={project.id} 
                    className="splide__slide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <img src={project.imageUrl} alt={project.title} />
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
