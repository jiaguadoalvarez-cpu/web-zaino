import React from 'react';

const About = () => {
    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)' }}>
            <div className="editorial-text text-center">
                <h1 className="serif" style={{ marginBottom: 'var(--spacing-md)' }}>Quién Soy</h1>
                <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                    Soy Zaino y Azabache. Mi trabajo se centra en capturar la esencia de la narrativa visual,
                    buscando siempre la belleza en lo simple y lo auténtico.
                </p>
                <p>
                    A través de la lente y la estrategia digital, ayudo a marcas y proyectos a contar su historia
                    con elegancia y claridad.
                </p>
            </div>
        </div>
    );
};

export default About;
