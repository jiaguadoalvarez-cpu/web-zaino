# Guía de Despliegue - Zaino y Azabache

Esta guía detalla los pasos para desplegar la aplicación web de Zaino y Azabache. La aplicación está construida con **React** y **Vite**, y utiliza **Supabase** como backend.

## Prerrequisitos

Antes de desplegar, asegúrate de tener:
1.  El código fuente subido a un repositorio (GitHub, GitLab, o Bitbucket).
2.  Las credenciales de tu proyecto en Supabase (`SUPABASE_URL` y `SUPABASE_ANON_KEY`).

## Variables de Entorno

La aplicación requiere las siguientes variables de entorno para funcionar correctamente. Asegúrate de configurarlas en tu proveedor de hosting.

```env
VITE_SUPABASE_URL=tu_supabase_project_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> **Nota:** No subas el archivo `.env` a tu repositorio público.

---

## Opción 1: Despliegue en Netlify (Recomendado)

Netlify es excelente para aplicaciones Vite single-page.

1.  Inicia sesión en [Netlify](https://www.netlify.com/).
2.  Haz clic en **"Add new site"** > **"Import an existing project"**.
3.  Conecta tu proveedor de Git (ej. GitHub) y selecciona el repositorio de `webzainoyazabache`.
4.  En la configuración de despliegue ("Build settings"):
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
5.  Haz clic en **"Advanced"** o **"Environment variables"** y añade las variables mencionadas arriba (`VITE_SUPABASE_URL`, etc.).
6.  Haz clic en **"Deploy site"**.

### Configuración de Redirecciones (SPA)
Para evitar errores 404 al recargar páginas internas, Netlify necesita una regla de redirección.
Crea un archivo llamado `_redirects` en la carpeta `public/` con el siguiente contenido:

```
/* /index.html 200
```

*(Si no existe, puedes crearlo ahora).*

---

## Opción 2: Despliegue en Vercel

Vercel está optimizado para frameworks frontend y funciona muy bien con Vite.

1.  Inicia sesión en [Vercel](https://vercel.com/).
2.  Haz clic en **"Add New..."** > **"Project"**.
3.  Importa tu repositorio de Git.
4.  Vercel detectará automáticamente que es un proyecto Vite.
    *   **Build Command:** `vite build` (o `npm run build`)
    *   **Output Directory:** `dist`
5.  Despliega la sección **"Environment Variables"** y añade:
    *   `VITE_SUPABASE_URL`
    *   `VITE_SUPABASE_ANON_KEY`
6.  Haz clic en **"Deploy"**.

### Configuración de Rewrites (SPA)
Vercel suele manejar bien las SPAs con su configuración por defecto para Vite, pero si encuentras problemas de navegación, asegúrate de tener un archivo `vercel.json` en la raíz:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## Verificación del Despliegue

Una vez desplegado:
1.  Abre la URL proporcionada por el hosting.
2.  Navega por las secciones (Home, Galería, etc.) para verificar que el enrutamiento funciona.
3.  Prueba la autenticación del admin para asegurar que la conexión con Supabase es correcta.
