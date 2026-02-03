import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Settings, Plus, ArrowLeft, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Project Form Data
    const [newTitle, setNewTitle] = useState('');
    const [selectedCat, setSelectedCat] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // Fetch Categories for the dropdown
        const { data: catData } = await supabase.from('categories').select('*').order('title');
        setCategories(catData || []);

        // Fetch Projects
        const { data: projData, error } = await supabase
            .from('projects')
            .select('*, categories(title)')
            .order('created_at', { ascending: false });

        if (!error) setProjects(projData);
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !selectedCat) return;
        setCreating(true);

        const slug = newTitle.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4); // Ensure uniqueness

        const { data, error } = await supabase
            .from('projects')
            .insert([{
                title: newTitle,
                slug,
                category_id: selectedCat,
                is_published: false
            }])
            .select();

        if (error) {
            alert('Error: ' + error.message);
        } else {
            setNewTitle('');
            fetchData();
        }
        setCreating(false);
    };

    const togglePublish = async (id, currentStatus) => {
        const { error } = await supabase.from('projects').update({ is_published: !currentStatus }).eq('id', id);
        if (!error) fetchData();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Borrar proyecto?')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) fetchData();
    };

    return (
        <div className="fade-in">
            <Link to="/admin" className="back-link" style={{ marginBottom: 'var(--spacing-md)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <ArrowLeft size={16} /> Volver
            </Link>

            <h1 className="serif" style={{ marginBottom: 'var(--spacing-md)' }}>Gestionar Proyectos</h1>

            {/* Create Box */}
            <div style={{ background: '#f9f9f9', padding: '1rem', border: '1px solid #eee', marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Crear Nuevo Proyecto</h4>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr auto' }}>
                    <input
                        type="text"
                        placeholder="Título del Proyecto"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{ padding: '0.5rem' }}
                        required
                    />
                    <select
                        value={selectedCat}
                        onChange={(e) => setSelectedCat(e.target.value)}
                        style={{ padding: '0.5rem' }}
                        required
                    >
                        <option value="">Seleccionar Categoría...</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                    <button type="submit" disabled={creating} style={{ cursor: 'pointer', background: 'black', color: 'white', border: 'none', padding: '0 1rem' }}>
                        {creating ? '...' : <Plus />}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="project-list">
                {projects.map((p) => (
                    <div key={p.id} className="admin-list-item">
                        <div style={{ flex: 1 }}>
                            <strong>{p.title}</strong>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                {p.categories?.title} • {p.slug}
                            </div>
                        </div>

                        <div className="actions" style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => togglePublish(p.id, p.is_published)}
                                title={p.is_published ? "Ocultar" : "Publicar"}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.is_published ? 'green' : 'gray' }}
                            >
                                {p.is_published ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>

                            <Link to={`/admin/projects/${p.id}`} style={{ color: 'blue' }}>
                                <Edit size={20} />
                            </Link>

                            <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
        .admin-list-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }
      `}</style>
        </div>
    );
};

export default ManageProjects;
