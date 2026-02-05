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
                // Merge fetched data with initial descriptions if missing in DB
                const mergedData = data.map(cat => {
                    // Try to find fallback by slug OR by title (normalized) to be more robust
                    const fallback = initialCategories.find(c =>
                        c.slug === cat.slug ||
                        c.title.toLowerCase() === cat.title.toLowerCase()
                    );
                    return {
                        ...cat,
                        // Use DB description if available, otherwise fallback to local hardcoded text
                        description: cat.description || (fallback ? fallback.description : '')
                    };
                });
                setCategories(mergedData);
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
            <div className="grid-gallery">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default Home;
