# Informe de implementación — Práctica 3

## Identificación

- Estudiante: Yeilen Ramos.
- Matrícula: 2025-2085.
- Asignatura: Electiva 1 — Introducción a DevOps, ITLA.
- Repositorio público: **PENDIENTE: añadir URL real**.
- Sitio GitHub Pages: **PENDIENTE: añadir URL real**.
- Video de demostración: **PENDIENTE: añadir URL real**.

## Objetivo

Automatizar la revisión de sintaxis, las pruebas, la construcción de una imagen Docker y la publicación del frontend estático mediante GitHub Actions, partiendo de la plantilla oficial.

## Cambios implementados

1. Endpoint `DELETE /api/tareas/:id`: responde 204 sin cuerpo al eliminar y 404 si la tarea no existe.
2. Contador incremental independiente para evitar IDs duplicados después de eliminar.
3. Validación reutilizable del título: texto no vacío y máximo de 120 caracteres después de recortar espacios.
4. Pruebas unitarias de validación y pruebas de integración para eliminación, consulta, IDs únicos y rechazo de títulos largos.
5. Frontend local con botones para completar y eliminar. En Pages muestra su condición estática y deshabilita los controles si no hay API.
6. Lockfile versionado y uso de `npm ci` en CI y Docker.
7. Pipeline con Node 24, cobertura descargable y permisos de despliegue limitados al job de Pages.
8. README, guía de contribución, demostración y guion de video.

## Verificación local realizada

- `npm run lint`: correcto; comprobación de sintaxis, no análisis ESLint.
- `npm test`: **22 pruebas aprobadas, 2 suites**.
- `npm ci`: instalación reproducible verificada.
- Arranque real con `src/server.js`, página principal y `/health`: correctos.
- La plantilla contenía 6 pruebas; se añadieron 16 casos ejecutados.
- Cobertura de `src/app.js` y `src/tareas.js`: **96.36% de sentencias, 88.88% de ramas, 100% de funciones y 100% de líneas**.
- El arranque `src/server.js` y el frontend no están incluidos en esas métricas de cobertura.
- Docker no estaba disponible en el entorno de preparación: **build Docker pendiente de comprobar en GitHub Actions o Docker Desktop**.
- No se ejecutó ni se verificó GitHub Actions o Pages desde este entorno. Los resultados locales no prueban el funcionamiento remoto.

El conteo cambia si se conserva la prueba de demostración de `docs/DEMO.md`: habrá 23 pruebas cuando su expectativa sea correcta.

## Evidencias de GitHub pendientes

| Evidencia | URL real / resultado |
| --- | --- |
| Primera ejecución exitosa | PENDIENTE |
| Ejecución roja por prueba deliberadamente incorrecta | PENDIENTE |
| Captura del error y despliegue omitido | PENDIENTE |
| Commit que corrige la expectativa | PENDIENTE |
| Ejecución verde posterior a la corrección | PENDIENTE |
| GitHub Pages accesible | PENDIENTE |
| Video de demostración | PENDIENTE |

## Relación con los requisitos

| Requisito | Implementación | Estado |
| --- | --- | --- |
| Aplicación simple | Express y frontend de tareas | Implementado |
| Funcionalidad adicional | Eliminación de tareas | Implementado y probado localmente |
| Al menos dos pruebas nuevas | 16 casos nuevos | Probado localmente |
| Pruebas unitarias e integración | Jest y Supertest | Probado localmente |
| Cobertura | Reporte local y artefacto de CI configurado | Local verificado; artefacto remoto pendiente |
| Build | Dockerfile y paso del workflow | Configurado; ejecución pendiente |
| Publicación | GitHub Pages | Configurado; ejecución pendiente |
| Pipeline rojo y luego verde | Procedimiento en DEMO.md | Pendiente de ejecución y evidencia |
| Documentación Markdown | README, CONTRIBUTING y docs | Preparada |

## Limitaciones y aprendizajes

GitHub Pages sirve archivos estáticos; no aloja la API Express ni ejecuta la imagen Docker. La API puede demostrarse localmente mientras el sitio estático demuestra el despliegue. Las tareas son volátiles: no existe persistencia en base de datos.

La dependencia `needs: build-test` evita publicar cuando falla una prueba o el build. Una ejecución fallida conserva la versión de Pages publicada previamente. El ejercicio demuestra que una expectativa incorrecta puede bloquear la entrega y que corregirla permite continuar.

## Conclusión

La implementación local y la documentación están preparadas. La entrega se completa al publicar el repositorio, ejecutar los workflows reales, registrar las evidencias y añadir el video. No se presentan las ejecuciones remotas como realizadas antes de contar con esas evidencias.
