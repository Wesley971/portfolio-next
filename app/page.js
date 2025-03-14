"use client";
import { useEffect, useState, useCallback } from "react";
import "../styles/HomePage.scss";

export default function HomePage() {
  const welcomeTexts = ["Welcome to My Portfolio", "Bienvenue sur mon Portfolio"];
  const [randomText, setRandomText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startAnimation, setStartAnimation] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    setRandomText(welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)]);
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro") === "true";
    setStartAnimation(hasSeenIntro);
    if (hasSeenIntro) setShowContent(true);
  }, []);

  const handleStartAnimation = () => {
    setStartAnimation(true);
    sessionStorage.setItem("hasSeenIntro", "true");
    window.dispatchEvent(new Event("introFinished"));
    setTimeout(() => {
      setShowContent(true);
      window.dispatchEvent(new Event("contentReady"));
    }, 800);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects.json");
        if (!response.ok) throw new Error("Erreur lors du chargement des projets");
        const data = await response.json();
        if (isMounted) setProjects(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (startAnimation === null) {
    return null;
  }

  const closeModal = () => setCurrentIndex(null);

  const nextProject = () => {
    if (currentIndex !== null && projects.length) {
      setCurrentIndex((currentIndex + 1) % projects.length);
    }
  };

  const prevProject = () => {
    if (currentIndex !== null && projects.length) {
      setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
    }
  };

  return (
    <div className="homepage">
      {!startAnimation && (
        <div
          className="cover fullscreen fade-in"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: "transform 0.1s ease-out",
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

      <div className={`main-content ${showContent ? "fade-in" : "hidden"}`}>
        <main>
          <section id="about">
            <div className="about-text">
              <h1>
                Hey ! Moi, c’est <strong>Wesley Abdoul</strong>
              </h1>
              <p>
                Développeur web passionné🚀<br />
                Mon objectif ? Transformer vos idées en projets innovants, alliant{" "}
                <strong>design percutant</strong> et <strong>performance optimale</strong>.
              </p>
              <ul>
                <li>
                  <strong>Front-end :</strong> HTML, CSS, JavaScript, React, Next.js
                </li>
                <li>
                  <strong>Back-end :</strong> Node.js, Python
                </li>
                <li>
                  <strong>Techniques avancées :</strong> Optimisation des performances, SEO, responsive design
                </li>
              </ul>
              <p>
                💻 <a href="#projects">Explore mes projets</a>, et si tu as une idée ou un projet,{" "}
                <a href="#contact">contacte-moi</a> ! 🙌
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
                  projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => setCurrentIndex(index)}
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

            {currentIndex !== null && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-btn" onClick={closeModal}>
                    &times;
                  </button>
                  <h2>{projects[currentIndex].title}</h2>
                  <img src={projects[currentIndex].projectPageImage} alt={projects[currentIndex].title} />
                  <p>{projects[currentIndex].description}</p>
                  <div className="modal-action">
                    <button onClick={() => window.open(projects[currentIndex].link, "_blank")}>
                      Voir le projet
                    </button>
                  </div>
                  <div className="modal-navigation">
                    <button className="prev" onClick={prevProject}>
                      &#10094;
                    </button>
                    <button className="next" onClick={nextProject}>
                      &#10095;
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
              <button type="submit" className="cta-button">
                Envoyer
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
