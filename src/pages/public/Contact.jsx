import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)' }}>
            <div className="editorial-text text-center">
                <h1 className="serif" style={{ marginBottom: 'var(--spacing-md)' }}>Contacto</h1>
                <p style={{ marginBottom: 'var(--spacing-md)' }}>
                    Para colaboraciones y consultas, por favor contactar a través de correo electrónico o teléfono.
                </p>

                <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <a href="mailto:zainoyazabachecomunicacion@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Mail size={20} /> zainoyazabachecomunicacion@gmail.com
                    </a>
                    <a href="tel:+34699463997" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Phone size={20} /> 699 463 997
                    </a>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Instagram size={20} /> @zainoyazabache (Próximamente)
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
