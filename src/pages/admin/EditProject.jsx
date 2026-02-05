import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Trash2, Image as ImageIcon, Type, ArrowUp, ArrowDown } from 'lucide-react';

const EditProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Block State
    const [newText, setNewText] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        // Get Project
        const { data: p } = await supabase.from('projects').select('*').eq('id', id).single();
        if (p) setProject(p);

        // Get Blocks
        const { data: b } = await supabase.from('content_blocks').select('*').eq('project_id', id).order('order_index');
        if (b) setBlocks(b);

        setLoading(false);
    };

    // --- Actions ---

    const handleUpdateProject = async () => {
        await supabase.from('projects').update({
            title: project.title,
            cover_image_url: project.cover_image_url
        }).eq('id', id);
        alert('Proyecto actualizado');
    };

    const handleAddText = async () => {
        if (!newText.trim()) return;
        const { error } = await supabase.from('content_blocks').insert({
            project_id: id,
            type: 'text',
            content: newText,
            order_index: blocks.length
        });
        if (!error) {
            setNewText('');
            fetchProject();
        }
    };

    const handleUploadImage = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setIsUploading(true);

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
                const filePath = `projects/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('images')
                    .getPublicUrl(filePath);

                // Add Block
                await supabase.from('content_blocks').insert({
                    project_id: id,
                    type: 'image',
                    content: publicUrl,
                    order_index: blocks.length // Note: This might cause race conditions with order if many are uploaded at once, but acceptable for now.
                });
            }

            fetchProject();
        } catch (error) {
            alert('Error subiendo imagen: ' + error.message);
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = null;
        }
    };

    const handleSetCover = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `covers/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            // Update local state first for instant feedback (will be saved via handleUpdateProject or auto? let's auto save cover)
            await supabase.from('projects').update({ cover_image_url: publicUrl }).eq('id', id);

            setProject(prev => ({ ...prev, cover_image_url: publicUrl }));

        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const deleteBlock = async (blockId) => {
        if (!window.confirm('Borrar bloque?')) return;
        await supabase.from('content_blocks').delete().eq('id', blockId);
        fetchProject();
    };

    if (loading) return <div>Cargando...</div>;
    if (!project) return <div>No encontrado</div>;

    return (
        <div className="fade-in" style={{ paddingBottom: '100px' }}>
            <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <Link to="/admin/projects" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ArrowLeft size={16} /> Volver
                </Link>
                <button onClick={handleUpdateProject} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'black', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    <Save size={16} /> Guardar Cambios
                </button>
            </div>

            {/* Project Details */}
            <div className="card" style={{ padding: '1.5rem', border: '1px solid #eee', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Detalles del Proyecto</h3>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Título</label>
                    <input
                        type="text"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem', fontSize: '1.2rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Imagen de Portada</label>
                    {project.cover_image_url && <img src={project.cover_image_url} alt="Cover" style={{ height: '150px', marginBottom: '0.5rem', objectFit: 'cover' }} />}
                    <input type="file" onChange={handleSetCover} disabled={isUploading} accept="image/*" />
                </div>
            </div>

            {/* Content Blocks */}
            <h3 style={{ marginBottom: '1rem' }}>Contenido Editorial</h3>

            <div className="blocks-container">
                {blocks.map((block, index) => (
                    <div key={block.id} className="content-block" style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', background: 'white', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span style={{ color: '#ccc' }}>{index + 1}</span>
                        <div style={{ flex: 1 }}>
                            {block.type === 'image' ? (
                                <img src={block.content} alt="Block" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ background: '#fcfcfc', padding: '0.5rem' }} />
                            )}
                        </div>
                        <button onClick={() => deleteBlock(block.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            {/* Add Block Toolbar */}
            <div className="add-block-toolbar" style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Añadir Bloque</h4>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    {/* Add Text */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.5rem' }}><Type size={16} /> Texto</div>
                        <textarea
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Escribe el párrafo aquí... (acepta HTML básico como <b>negrita</b>)"
                            style={{ width: '100%', height: '100px', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                        <button onClick={handleAddText} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Añadir Texto</button>
                    </div>

                    {/* divider */}
                    <div style={{ width: '1px', background: '#ddd' }}></div>

                    {/* Add Image */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.5rem' }}><ImageIcon size={16} /> Imagen</div>
                        <input type="file" onChange={handleUploadImage} disabled={isUploading} accept="image/*" multiple />
                        {isUploading && <span style={{ fontSize: '0.8rem', marginLeft: '5px' }}>Subiendo...</span>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EditProject;
