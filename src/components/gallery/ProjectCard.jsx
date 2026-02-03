import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const bgStyle = project.cover_image_url
        ? { backgroundImage: `url(${project.cover_image_url})` }
        : { backgroundColor: '#f0f0f0' };

    return (
        <Link to={`/project/${project.slug}`} className="project-card fade-in">
            <div className="project-image" style={bgStyle}>
                {!project.cover_image_url && <span className="text-gray-400">Sin Imagen</span>}
            </div>
            <h3 className="project-title serif">{project.title}</h3>
            <style>{`
        .project-card {
          margin-bottom: var(--spacing-md);
          display: block;
        }
        .project-image {
          width: 100%;
          aspect-ratio: 4/5; /* Slightly taller than square */
          background-size: cover;
          background-position: center;
          margin-bottom: var(--spacing-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
        }
        .project-title {
          font-size: 1rem;
          color: var(--color-text);
          margin-top: 0.5rem;
        }
        .project-card:hover .project-image {
          opacity: 0.9;
        }
      `}</style>
        </Link>
    );
};

export default ProjectCard;
