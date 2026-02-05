-- 1. Add description column if it doesn't exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;

-- 2. Update existing categories with the provided slogans
UPDATE categories SET description = 'Trabajar mejor no es hacer más, es hacerlo con sistema.' WHERE title ILIKE '%Consultor IA%';
UPDATE categories SET description = 'Construir una identidad visual es decidir quién eres y cómo quieres ser reconocido.' WHERE title ILIKE '%Imagen Corporativa%';
UPDATE categories SET description = 'La memoria visual también construye identidad.' WHERE title ILIKE '%1900%';
UPDATE categories SET description = 'El producto no cambia. La percepción sí.' WHERE title ILIKE '%Imagen de producto%';
UPDATE categories SET description = 'Un proyecto editorial para documentar, interpretar y preservar la Semana Santa desde una mirada propia.' WHERE title ILIKE '%Cruz de Guia%';
UPDATE categories SET description = '(Laboratorio creativo / I+D visual)' WHERE title ILIKE '%Proyectos Personales%';
