import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import CategoryCard from '../../components/gallery/CategoryCard';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded categories as fallback/initial seed
    const initialCategories = [
        { id: 1, title: 'Imagen Corporativa', slug: 'imagen-corporativa', cover_image_url: null },
        { id: 2, title: 'Imagen de Producto', slug: 'imagen-producto', cover_image_url: null },
        { id: 3, title: 'Consultoría IA', slug: 'consultoria-ia', cover_image_url: null },
        { id: 4, title: '1900 El Legado', slug: '1900-el-legado', cover_image_url: null },
        { id: 5, title: 'Cruz de Guía', slug: 'cruz-de-guia', cover_image_url: null },
        { id: 6, title: 'Proyectos Personales', slug: 'proyectos-personales', cover_image_url: null },
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
            <div className="grid-gallery">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default Home;
