# Práctica 3 — Pipeline CI/CD con GitHub Actions

Proyecto basado en la plantilla oficial de Electiva 1, ITLA. Aplicación Node.js/Express para gestionar tareas en memoria, con pruebas Jest/Supertest, build Docker y publicación del frontend estático en GitHub Pages.

## Alcance

La práctica agrega `DELETE /api/tareas/:id`, validación del máximo de 120 caracteres y pruebas adicionales. La sección «Proyecto Final» de la plantilla no es parte de esta entrega: no se incluye base de datos, publicación en GHCR ni alertas.

**GitHub Pages publica únicamente `public/`. No ejecuta Express ni el contenedor Docker.** En Pages se muestra la página informativa; los controles se habilitan cuando la API está disponible, al ejecutar la app localmente o en Docker. La construcción Docker comprueba que se puede generar la imagen, pero no la publica ni la despliega.

## Requisitos

- Laboratorio 0 completado: Git instalado y cuenta de GitHub disponible.
- Node.js 24 y npm para usar el mismo entorno que CI.
- Repositorio público para esta práctica.
- Docker Desktop es opcional en tu PC; GitHub Actions realiza el build en su runner.

## Instalación y ejecución local

Desde la carpeta que contiene `package.json`:

```bash
npm ci
npm run lint
npm test
npm start
```

Abrir http://localhost:3000. Detener con Ctrl+C. El puerto predeterminado es 3000. Las tareas se pierden al reiniciar porque se almacenan en memoria.

## API

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | `/health` | 200; estado de salud |
| GET | `/metrics` | 200; solicitudes, errores, tareas y tiempo activo |
| GET | `/api/tareas` | 200; lista de tareas |
| POST | `/api/tareas` | 201; crea con JSON `{"titulo":"Estudiar"}`; 400 si el título es inválido |
| PATCH | `/api/tareas/:id` | 200; alterna completada; 404 si no existe |
| DELETE | `/api/tareas/:id` | 204 sin cuerpo; 404 si no existe |

Los títulos se recortan en los extremos y deben tener entre 1 y 120 caracteres. El identificador usa un contador independiente del tamaño del arreglo para evitar duplicados después de eliminar.

## Pruebas y cobertura

- `tests/tareas.test.js`: pruebas unitarias de la validación, sin HTTP.
- `tests/app.test.js`: pruebas de integración HTTP entre Express y el estado en memoria usando Supertest.
- `npm test`: ejecuta ambas suites con cobertura de `src/app.js` y `src/tareas.js`.
- `coverage/lcov-report/index.html`: reporte navegable generado localmente.
- `coverage/coverage-summary.json`: resumen numérico.

`src/server.js` es el arranque del proceso y queda fuera de la cobertura. No se declara cobertura de todo el proyecto ni un umbral obligatorio. CI conserva el reporte como artefacto `cobertura`.

## Etapas del pipeline

Archivo: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

| Etapa | Comando/acción | Función |
| --- | --- | --- |
| Preparación | Checkout, setup-node 24, `npm ci` | Obtener código e instalar versiones del lockfile |
| Revisión | `npm run lint` | Comprobar sintaxis JavaScript; no es ESLint |
| Pruebas | `npm test` | Ejecutar Jest y obtener cobertura |
| Evidencia | upload-artifact | Conservar cobertura descargable |
| Build | `docker build` | Construir la imagen con dependencias de producción |
| Despliegue | configure-pages, upload-pages-artifact, deploy-pages | Publicar `public/` en GitHub Pages |

Se ejecuta con push a `main`, pull request dirigido a `main` o lanzamiento manual. `deploy-pages` depende de `build-test`: si falla una prueba o el build, no publica. Los pull requests solo validan; el despliegue requiere `main` y un push o ejecución manual. El permiso de escritura de Pages y el token OIDC se limitan al job de despliegue.

## Subir y desplegar

1. Crear en GitHub un repositorio **público y vacío**, por ejemplo `practica-3-devops-itla`. No añadir README, licencia ni .gitignore desde GitHub.
2. Abrir una terminal en esta carpeta. Sustituir `TU_USUARIO` por tu usuario real:

```bash
git init
git add .
git commit -m "feat: implementa practica 3 de CI/CD"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/practica-3-devops-itla.git
```

3. En el repositorio: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Subir el código:

```bash
git push -u origin main
```

5. En **Actions → CI/CD**, esperar a que terminen los dos jobs. Abrir la URL del entorno `github-pages`. La URL habitual es `https://TU_USUARIO.github.io/practica-3-devops-itla/`.
6. Si el primer despliegue falló por activar Pages después del push, activar Pages y usar **Actions → CI/CD → Run workflow → main**.

Subir el contenido de esta carpeta a la raíz del repositorio. `.github/` debe quedar en la raíz; no subir el ZIP ni una carpeta contenedora adicional.

## Docker local opcional

```bash
docker build -t tareas-devops .
docker run --rm -p 3000:3000 tareas-devops
```

Abrir http://localhost:3000. La imagen usa Node 24 Alpine, usuario `node`, dependencias de producción y comprobación de salud en `/health`.

## Demostración y entrega

- [Guía de prueba fallida y corrección](docs/DEMO.md).
- [Guía de contribución](CONTRIBUTING.md).
- [Informe de implementación](docs/INFORME.md).
- [Guion breve para el video](docs/GUION-VIDEO.md).

Antes de entregar, completar los enlaces pendientes del informe con el repositorio, Pages y las ejecuciones reales roja y verde. Las pruebas locales no sustituyen la evidencia del pipeline en GitHub.

## Integrantes:

Andres Perez | Matricula: 2025-2077 - Seccion: 7 (SDE-7-V)
Jhan Bautista | Matricula: 2025-2084 - Seccion: 7 (SDE-7-V)
