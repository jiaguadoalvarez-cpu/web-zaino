import React from 'react';

export const TextBlock = ({ content }) => {
    return (
        <div className="editorial-text">
            {/* Allow basic HTML or just whitespace preservation */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export const ImageBlock = ({ content }) => {
    return (
        <div className="editorial-image-container">
            <img src={content} alt="" className="editorial-image" />
            <style>{`
        .editorial-image-container {
          width: 100%;
          max-width: 1000px; /* Wider than text */
          margin: var(--spacing-md) auto;
        }
        .editorial-image {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
        </div>
    );
};
