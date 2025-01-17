import '../../styles/ProjectsPage.scss';

export default async function ProjectsPage() {
  try {
    const res = await fetch('http://localhost:3000/projects.json'); // URL absolue pendant le dev
    if (!res.ok) {
      throw new Error('Erreur lors du chargement des projets');
    }
    const projects = await res.json();

    return (
      <div className="projects-page">
        <h2>Mes Projets</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Voir le projet
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="error">
        <h2>Erreur</h2>
        <p>{error.message}</p>
      </div>
    );
  }
}
