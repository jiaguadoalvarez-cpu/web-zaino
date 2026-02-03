import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { TextBlock, ImageBlock } from '../../components/editorial/Blocks';
import { ArrowLeft } from 'lucide-react';

const ProjectView = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjectDetail();
    }, [slug]);

    const fetchProjectDetail = async () => {
        setLoading(true);
        try {
            // 1. Get Project
            const { data: projData, error: projError } = await supabase
                .from('projects')
                .select('*')
                .eq('slug', slug)
                .single();

            if (projError) throw projError;
            setProject(projData);

            // 2. Get Content Blocks
            const { data: blocksData, error: blocksError } = await supabase
                .from('content_blocks')
                .select('*')
                .eq('project_id', projData.id)
                .order('order_index', { ascending: true });

            if (blocksError) throw blocksError;
            setBlocks(blocksData);
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container text-center" style={{ paddingTop: 'var(--spacing-lg)' }}>Cargando...</div>;
    if (!project) return <div className="container text-center">Proyecto no encontrado</div>;

    return (
        <div className="project-view fade-in">
            {/* Back Button */}
            <div className="container" style={{ margin: 'var(--spacing-md) auto' }}>
                <Link to={-1} className="back-link">
                    <ArrowLeft size={20} /> Volver
                </Link>
            </div>

            <header className="project-header text-center">
                <h1 className="serif project-title">{project.title}</h1>
                {project.cover_image_url && (
                    <div className="hero-image-container">
                        <img src={project.cover_image_url} alt={project.title} className="hero-image" />
                    </div>
                )}
            </header>

            <section className="project-content">
                {blocks.map((block) => (
                    <React.Fragment key={block.id}>
                        {block.type === 'text' && <TextBlock content={block.content} />}
                        {block.type === 'image' && <ImageBlock content={block.content} />}
                    </React.Fragment>
                ))}
            </section>

            {/* Navigation Footer within Project? Maybe Next/Prev project later */}

            <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-light);
          margin-bottom: var(--spacing-md);
        }
        .project-title {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-md);
          padding: 0 var(--spacing-sm);
        }
        .hero-image-container {
            max-width: 1200px;
            margin: 0 auto var(--spacing-lg);
        }
        .hero-image {
            width: 100%;
            max-height: 80vh;
            object-fit: cover;
        }
        .project-content {
            padding-bottom: var(--spacing-xl);
        }
      `}</style>
        </div>
    );
};

export default ProjectView;
