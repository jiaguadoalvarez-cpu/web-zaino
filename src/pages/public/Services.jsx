import React from 'react';

const Services = () => {
    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)' }}>
            <div className="editorial-text">
                <h1 className="serif text-center" style={{ marginBottom: 'var(--spacing-md)' }}>Servicios</h1>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h3 className="serif">Dirección de Arte & Fotografía</h3>
                    <p>Creación de contenido visual de alto impacto para marcas y editoriales.</p>
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h3 className="serif">Estrategia de Comunicación</h3>
                    <p>Consultoría para definir y potenciar la voz de tu marca en el entorno digital.</p>
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h3 className="serif">Diseño Web & Editorial</h3>
                    <p>Soluciones estéticas minimalistas centradas en el contenido.</p>
                </div>
            </div>
        </div>
    );
};

export default Services;
