import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  // Placeholder colors/images if no image provided
  const bgStyle = category.cover_image_url
    ? { backgroundImage: `url(${category.cover_image_url})` }
    : { backgroundColor: '#f5f5f5' };

  return (
    <Link to={`/gallery/${category.slug}`} className="category-card">
      <div className="card-image" style={bgStyle}>
        {!category.cover_image_url && <span className="placeholder-text">Z & A</span>}
        <div className="overlay">
          <h3 className="category-title serif">{category.title}</h3>
        </div>
      </div>
      <style>{`
        .category-card {
          display: block;
          text-align: center;
          margin-bottom: var(--spacing-md);
          position: relative;
        }
        .card-image {
          height: 350px; /* Portrait aspect ratio */
          width: 100%;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease;
          background-color: #fcece8;
          position: relative;
          overflow: hidden;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3); /* Subtle dark overlay for contrast */
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .category-card:hover .overlay {
          opacity: 1;
        }
        .category-card:hover .card-image {
          transform: scale(1.02); /* Subtle zoom */
        }
        .placeholder-text {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: #ccc;
        }
        .category-title {
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: white; /* White text for contrast */
          font-family: var(--font-serif);
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </Link>
  );
};

export default CategoryCard;
