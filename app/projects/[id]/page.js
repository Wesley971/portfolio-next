import '../../styles/ProjectDetails.scss';

async function fetchProjectData(id) {
  const response = await fetch('/projects.json');
  const data = await response.json();
  return data.find((project) => project.id === id);
}

export default async function ProjectDetails({ params }) {
  const project = await fetchProjectData(params.id);

  if (!project) {
    return <div>Projet introuvable</div>;
  }

  return (
    <div className="project-details">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}
