# Guion de video — aproximadamente 3 minutos

## 0:00–0:30 — Presentación

«Esta es mi Práctica 3 de DevOps. Partí de la plantilla oficial de ITLA e implementé un pipeline con GitHub Actions. El repositorio es público y contiene aplicación, pruebas, Dockerfile y documentación.»

Mostrar la raíz del repositorio y el README.

## 0:30–1:00 — Funcionalidad y pruebas

«Agregué la eliminación de tareas y la validación del título. También protegí los identificadores para que no se dupliquen después de eliminar. Las pruebas unitarias validan títulos y las de integración comprueban la API mediante Supertest.»

Con `npm start` ya ejecutado, mostrar localhost:3000: crear, completar y eliminar una tarea. Mostrar después el resultado de `npm test` y su cobertura.

## 1:00–1:35 — Pipeline

«Cada push a main y cada pull request dirigido a main ejecuta las validaciones. El pipeline instala dependencias con npm ci, revisa sintaxis, ejecuta pruebas con cobertura y construye una imagen Docker. Si todo pasa en main, publica el frontend en GitHub Pages.»

Mostrar el YAML y sus dos jobs.

## 1:35–2:20 — Fallo y recuperación

«Introduje una expectativa incorrecta para demostrar que una prueba fallida detiene el pipeline. En esta ejecución roja se ve el fallo y que el despliegue fue omitido. Luego corregí la expectativa; esta ejecución verde muestra pruebas, build y despliegue exitosos.»

Mostrar los runs reales y los commits correspondientes. No decir que funcionó sin haberlo ejecutado.

## 2:20–3:00 — Despliegue y cierre

«Este es el enlace de GitHub Pages. Pages publica archivos estáticos: la API Express se ejecuta localmente o en Docker. La imagen se construye en CI, pero no se despliega a Pages. El README explica la instalación, las etapas y el despliegue; también incluí una guía de contribución y el informe.»

Mostrar Pages y los documentos. Añadir la URL del video al informe antes de entregar.
