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
            </div>
            <h3 className="category-title serif">{category.title}</h3>
            <style>{`
        .category-card {
          display: block;
          text-align: center;
          margin-bottom: var(--spacing-md);
        }
        .card-image {
          height: 350px; /* Portrait aspect ratio */
          width: 100%;
          background-size: cover;
          background-position: center;
          margin-bottom: var(--spacing-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.3s ease;
          background-color: #fcece8; /* Fallback soft color */
        }
        .category-card:hover .card-image {
          filter: brightness(0.95);
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
          color: var(--color-text);
          font-family: var(--font-serif);
        }
      `}</style>
        </Link>
    );
};

export default CategoryCard;
