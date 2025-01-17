import PropTypes from 'prop-types';


const ProjectCard = ({ title, description, imageUrl, link, onClick }) => {
    return (
        <div className="project-card" onClick={onClick}>
            <img src={imageUrl} alt={title} className="project-card-image" />
            <div className="project-card-content">
                <h3 className="project-card-title">{title}</h3>
                <p className="project-card-description">{description}</p>
                <a className="project-card-link" href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Voir le GitHub
                </a>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ProjectCard;
