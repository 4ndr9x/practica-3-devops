# Guía de contribución

1. Clonar el repositorio y ejecutar `npm ci` con Node.js 24.
2. Crear una rama: `git switch -c feature/nombre-del-cambio`.
3. Implementar un cambio pequeño con su prueba. No incluir `node_modules/`, `coverage/` ni credenciales. Sí incluir `package-lock.json`.
4. Ejecutar `npm run lint` y `npm test`. Si cambian dependencias, usar `npm install` y versionar el lockfile actualizado.
5. Crear el commit y subir la rama con `git push -u origin feature/nombre-del-cambio`.
6. Abrir un pull request dirigido a `main`, explicando el cambio y sus pruebas.
7. Revisar el resultado de CI y fusionar cuando sea correcto. Al actualizar `main`, se publica Pages si todo pasa.

La demostración de fallo deliberado en main es una excepción didáctica para esta práctica, descrita en `docs/DEMO.md`.
