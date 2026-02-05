import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import CategoryCard from '../../components/gallery/CategoryCard';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded categories as fallback/initial seed
    const initialCategories = [
        {
            id: 1,
            title: 'Imagen Corporativa',
            slug: 'imagen-corporativa',
            cover_image_url: null,
            description: 'Construir una identidad visual es decidir quién eres y cómo quieres ser reconocido.'
        },
        {
            id: 2,
            title: 'Imagen de Producto',
            slug: 'imagen-producto',
            cover_image_url: null,
            description: 'El producto no cambia. La percepción sí.'
        },
        {
            id: 3,
            title: 'Consultoría IA',
            slug: 'consultoria-ia',
            cover_image_url: null,
            description: 'Trabajar mejor no es hacer más, es hacerlo con sistema.'
        },
        {
            id: 4,
            title: '1900 El Legado',
            slug: '1900-el-legado',
            cover_image_url: null,
            description: 'Cada proyecto tiene una historia. Nuestra labor es saber contarla.'
        },
        {
            id: 5,
            title: 'Cruz de Guía',
            slug: 'cruz-de-guia',
            cover_image_url: null,
            description: 'Un proyecto editorial para documentar, interpretar y preservar la Semana Santa desde una mirada propia.'
        },
        {
            id: 6,
            title: 'Proyectos Personales',
            slug: 'proyectos-personales',
            cover_image_url: null,
            description: 'Un espacio de exploración creativa donde probar ideas antes de llevarlas a proyectos de cliente.'
        },
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                setCategories(data);
            } else {
                setCategories(initialCategories);
            }
        } catch (error) {
            console.log('Error fetching categories (using fallback):', error.message);
            setCategories(initialCategories);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-lg)' }}>

            {/* Intro / About Section */}
            <section className="home-intro" style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '800px' }}>
                <h1 style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '1.8rem',
                    marginBottom: 'var(--spacing-md)',
                    fontWeight: 'normal',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text)'
                }}>
                    Zaino y Azabache Comunicación
                </h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: 'var(--spacing-md)' }}>
                    Soy fotógrafo especializado en el mundo del vino, con años de experiencia trabajando en bodegas,
                    proyectos culturales y marcas que entienden la imagen como parte de su identidad.
                </p>
                <a href="/about" className="text-link" style={{
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    color: 'var(--color-text)',
                    fontWeight: '500'
                }}>
                    Leer más sobre mí &rarr;
                </a>
            </section>

            <div className="grid-gallery">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default Home;
