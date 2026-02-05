import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('order_index', { ascending: true });

        if (!error) setCategories(data);
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setCreating(true);

        const slug = newCategory.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const { error } = await supabase
            .from('categories')
            .insert([{ title: newCategory, slug, order_index: categories.length + 1 }]);

        if (error) {
            alert('Error al crear: ' + error.message);
        } else {
            setNewCategory('');
            fetchCategories();
        }
        setCreating(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres borrar esta categoría? Se borrarán todos los proyectos dentro.')) return;

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error al borrar: ' + error.message);
        } else {
            fetchCategories();
        }
    };

    const handleUploadCover = async (e, categoryId) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `covers/${Date.now()}-${categoryId}.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            // Update Category
            const { error: updateError } = await supabase
                .from('categories')
                .update({ cover_image_url: publicUrl })
                .eq('id', categoryId);

            if (updateError) throw updateError;

            fetchCategories();
            alert('Portada actualizada');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="fade-in">
            <Link to="/admin" className="back-link" style={{ marginBottom: 'var(--spacing-md)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <ArrowLeft size={16} /> Volver al Dashboard
            </Link>

            <h1 className="serif" style={{ marginBottom: 'var(--spacing-md)' }}>Gestionar Categorías</h1>

            {/* Create Form */}
            <form onSubmit={handleCreate} style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nueva Categoría (ej. Imagen Corporativa)"
                    style={{ flex: 1, padding: '0.8rem', border: '1px solid var(--color-border)' }}
                    required
                />
                <button type="submit" disabled={creating} style={{ padding: '0 1.5rem', background: 'var(--color-text)', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {creating ? '...' : <Plus size={20} />}
                </button>
            </form>

            {/* List */}
            <div className="category-list">
                {loading ? <p>Cargando...</p> : categories.map((cat) => (
                    <div key={cat.id} className="admin-list-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                            {cat.cover_image_url && (
                                <img src={cat.cover_image_url} alt="cover" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                            )}
                            <div>
                                <span style={{ display: 'block', fontWeight: 'bold' }}>{cat.title}</span>
                                <small style={{ color: 'gray' }}>/{cat.slug}</small>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', color: 'blue' }}>
                                Cambiar Portada
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleUploadCover(e, cat.id)}
                                />
                            </label>
                            <button onClick={() => handleDelete(cat.id)} className="delete-btn">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .admin-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
          background: white;
        }
        .admin-list-item:first-child {
          border-top: 1px solid var(--color-border);
        }
        .delete-btn {
          background: none;
          border: none;
          color: #ff4444;
          cursor: pointer;
          opacity: 0.6;
        }
        .delete-btn:hover {
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default ManageCategories;
