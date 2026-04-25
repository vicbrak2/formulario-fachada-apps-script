# Contexto Operativo del Proyecto — Formulario Web Desacoplado

## 1. Naturaleza del proyecto

Este repositorio corresponde al **core funcional de un formulario web desacoplado**, diseñado como módulo reutilizable dentro de un sistema mayor.

Componentes actuales:
- Frontend standalone (HTML + CSS + JS)
- Backend liviano en Google Apps Script
- Persistencia en Google Sheets
- Comunicación vía HTTP (fetch + JSON)

Este módulo debe evolucionar sin perder su independencia.

---

## 2. Principios operativos clave

### 2.1 Eficiencia de tokens (CRÍTICO)

- Responder de forma **directa, sin redundancia ni relleno**
- Evitar explicaciones largas si no agregan valor
- Priorizar:
  - outputs accionables
  - diffs concretos
  - decisiones técnicas claras
- Reutilizar contexto previo en lugar de re-explicarlo
- No repetir código completo si solo cambian partes

---

### 2.2 Uso de Skills y herramientas

El agente puede y debe apoyarse en herramientas externas cuando sea más eficiente que razonar extensamente.

#### Uso recomendado:

- **Mapeo de Chrome / navegador**
  - Inspección del DOM
  - Validación de formularios en runtime
  - Debug de eventos JS
  - Verificación de requests (Network tab)

- **Clientes locales**
  - `wp-cli` → si el formulario se integra con WordPress
  - `mcp` → para orquestación, automatización o acceso a servicios locales
  - scripts locales → validación, testing o transformación de datos

- **Automatización**
  - Preferir ejecución directa vs explicación teórica
  - Si algo puede verificarse → hacerlo

---

### 2.3 Criterio de decisión

Antes de responder o implementar:

1. ¿Esto requiere razonamiento largo o ejecución?
2. Si es ejecución → usar herramientas
3. Si es diseño → ser preciso y estructurado
4. Si es código → entregar mínimo necesario funcional

---

## 3. Arquitectura esperada

El sistema debe mantenerse desacoplado:

Frontend:
- Captura de datos
- Validación básica
- UX/UI

Backend (Apps Script):
- Validación server-side
- Persistencia
- Notificaciones

Futuro:
- API intermedia (BFF / backend real)
- Integración con CRM
- Automatizaciones (n8n, etc.)

---

## 4. Reglas de implementación

- No romper el contrato del payload actual
- Mantener compatibilidad con Google Sheets
- Evitar lógica compleja en frontend
- No acoplar el formulario a un único entorno
- Diseñar pensando en reutilización

---

## 5. Seguridad mínima

- Validación de input (cliente y servidor)
- Honeypot activo
- No exponer lógica sensible
- Manejo claro de errores
- Sanitización básica

---

## 6. Evolución esperada

Este módulo puede escalar hacia:

- Form engine dinámico (schema-driven)
- Backend desacoplado (Node / Spring / etc.)
- Integración con dashboards
- Pipelines de automatización
- Multi-tenant usage

---

## 7. Estilo de trabajo del agente

- Preciso > Verboso
- Accionable > Teórico
- Modular > Monolítico
- Reutilizable > Específico

Si existe una forma más eficiente de resolver algo usando herramientas o ejecución directa, debe priorizarse sobre la explicación.

---