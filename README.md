# Formulario Fachada para Google Sheets

Paquete estatico para publicar un formulario personalizado y guardar las respuestas en Google Sheets mediante Google Apps Script.

## Archivos

- `index.html`: frontend completo para hosting estatico.
- `apps-script/Code.gs`: backend para copiar en `script.google.com`.

## Configuracion

1. Crea una Google Sheet nueva.
2. Copia el ID de la hoja desde la URL:
   `https://docs.google.com/spreadsheets/d/ID_DE_LA_HOJA/edit`
3. Entra a `Extensiones > Apps Script`.
4. Pega el contenido de `apps-script/Code.gs`.
5. Reemplaza `TU_ID_DE_GOOGLE_SHEET` por el ID real de tu hoja.
6. Opcional: define `NOTIFICATION_EMAIL` si quieres recibir avisos por correo.
7. Despliega como aplicacion web:
   - Ejecutar como: `Yo`
   - Acceso: `Cualquier persona`
8. Copia la URL terminada en `/exec`.
9. En `index.html`, reemplaza `https://script.google.com/macros/s/TU_SCRIPT_ID/exec` por esa URL.
10. Sube `index.html` a GitHub Pages, Netlify, Vercel o tu hosting.

## Nota sobre CORS

El frontend envia el JSON con `Content-Type: text/plain;charset=utf-8`. Esto evita el preflight CORS del navegador, que en Google Apps Script suele causar problemas con `application/json`. El cuerpo sigue siendo JSON y Apps Script lo parsea con `JSON.parse`.

## Campos guardados

La hoja `Respuestas` se crea automaticamente si no existe y se inicializa con estas columnas:

- Fecha
- Nombre negocio
- Dedicacion
- Email
- Tiene sitio
- Enlaces
- Objetivos
- Sitio ideal
- Estilo
- Colores
- Referencias
- Materiales
- Presupuesto
- Plazo
