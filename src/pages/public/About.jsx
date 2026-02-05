import React from 'react';

const About = () => {
    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)' }}>
            <div className="about-grid">
                {/* Image Column */}
                <div className="about-images">
                    <img src="/images/about/profile-portrait.jpg" alt="Zaino y Azabache" className="main-portrait" />
                    <img src="/images/about/profile-full.jpg" alt="En acción" className="secondary-image" />
                </div>

                {/* Text Column */}
                <div className="editorial-text">
                    <h1 className="serif" style={{ marginBottom: 'var(--spacing-md)' }}>Sobre Mí</h1>

                    <p>
                        Soy fotógrafo especializado en el mundo del vino, con años de experiencia trabajando en bodegas,
                        proyectos culturales y marcas que entienden la imagen como parte de su identidad, no como un recurso puntual.
                    </p>
                    <p>
                        Mi trabajo siempre ha estado ligado a la narrativa visual, al cuidado del detalle y a la coherencia a largo plazo.
                        Con el tiempo, esa experiencia me ha llevado a incorporar la consultoría en inteligencia artificial y automatización,
                        aplicada de forma práctica a la comunicación, los flujos de trabajo y la gestión de contenidos.
                    </p>
                    <p>
                        De la unión entre imagen, criterio y sistema nace <strong>Zaino y Azabache Comunicación</strong>, un proyecto desde el que
                        desarrollamos soluciones visuales y estratégicas para bodegas y marcas que buscan trabajar mejor,
                        comunicar con sentido y construir valor en el tiempo.
                    </p>

                    <div className="quote-box">
                        <p className="serif">
                            "No se trata solo de hacer imágenes. Se trata de saber por qué, para qué y cómo utilizarlas."
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .about-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--spacing-lg);
                    align-items: center;
                }
                
                @media (min-width: 768px) {
                    .about-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .about-images {
                    display: grid;
                    gap: var(--spacing-md);
                }

                .main-portrait {
                    width: 100%;
                    border-radius: 4px; /* Slight softening if desired, or keep sharp for editorial look */
                    aspect-ratio: 3/4;
                    object-fit: cover;
                }

                .secondary-image {
                    width: 100%;
                    max-width: 80%; /* Smaller secondary image */
                    margin-left: auto; /* Align right */
                    filter: grayscale(100%); /* Editorial touch */
                }

                .quote-box {
                    margin-top: var(--spacing-md);
                    padding-left: var(--spacing-md);
                    border-left: 3px solid var(--color-text);
                    font-style: italic;
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    );
};

export default About;
