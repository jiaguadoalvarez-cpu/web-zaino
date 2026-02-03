import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import ProjectCard from '../../components/gallery/ProjectCard';

const CategoryView = () => {
    const { slug } = useParams();
    const [projects, setProjects] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoryAndProjects();
    }, [slug]);

    const fetchCategoryAndProjects = async () => {
        setLoading(true);
        try {
            // 1. Get Category ID from slug
            const { data: catData, error: catError } = await supabase
                .from('categories')
                .select('id, title')
                .eq('slug', slug)
                .single();

            if (catError) throw catError;
            setCategoryName(catData.title);

            // 2. Get Projects for this Category
            const { data: projData, error: projError } = await supabase
                .from('projects')
                .select('*')
                .eq('category_id', catData.id)
                .eq('is_published', true)
                .order('order_index', { ascending: true });

            if (projError) throw projError;
            setProjects(projData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container text-center" style={{ paddingTop: 'var(--spacing-lg)' }}>Cargando...</div>;

    return (
        <div className="container fade-in" style={{ paddingTop: 'var(--spacing-md)' }}>
            <h1 className="serif text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>{categoryName}</h1>

            {projects.length === 0 ? (
                <p className="text-center text-gray-500">No hay proyectos en esta categoría aún.</p>
            ) : (
                <div className="grid-gallery">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryView;
