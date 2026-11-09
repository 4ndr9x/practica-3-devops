# Demostración del pipeline: verde → rojo → verde

Realizar después del primer despliegue exitoso. Ejecutar los comandos desde la raíz del proyecto, en la rama `main`. No hacer los dos push seguidos: esperar y capturar cada resultado.

## 1. Guardar el estado inicial

Abrir Actions → CI/CD y guardar el enlace de la ejecución exitosa. Comprobar que la página está publicada y descargar el artefacto `cobertura` si se desea.

## 2. Provocar una prueba fallida

Crear `tests/demo.test.js` en el editor con este contenido:

```javascript
test('Demostración de bloqueo del despliegue', function () {
  expect(1 + 1).toBe(3);
});
```

Ejecutar `npm test` para ver el fallo local. Después:

```bash
git add tests/demo.test.js
git commit -m "test: demuestra bloqueo de CI por prueba fallida"
git push
```

En Actions, esperar hasta que termine esa ejecución. Debe verse `Build y pruebas` fallido en el paso de Jest y el job de Pages omitido. Guardar enlace y captura con el error. El sitio publicado anteriormente puede seguir accesible: se bloquea la actualización, no se borra la versión anterior.

## 3. Corregir la prueba

En `tests/demo.test.js`, cambiar `toBe(3)` por `toBe(2)`. Ejecutar `npm test` y luego:

```bash
git add tests/demo.test.js
git commit -m "test: corrige expectativa de la demostracion"
git push
```

Esperar la nueva ejecución: pruebas, build y despliegue deben estar en verde. Guardar enlace y captura. Mostrar los dos commits para relacionar error y corrección. Este archivo añade una prueba a la cantidad del informe local.

## 4. Completar la evidencia

Añadir al informe los enlaces reales del repositorio, Pages, run rojo, run verde y video. Se puede conservar la prueba de demostración ya corregida. Nunca entregar la rama con la expectativa incorrecta.

## Problemas frecuentes

- **`npm ci` no encuentra lockfile:** comprobar que `package-lock.json` se subió al repositorio.
- **No aparece Actions:** comprobar `.github/workflows/ci.yml` en la raíz y rama `main`.
- **Pages devuelve error de configuración:** seleccionar GitHub Actions como Source y relanzar el workflow.
- **Los botones están deshabilitados en Pages:** es el frontend estático; la API funciona con `npm start` o Docker.
- **El push fue rechazado:** el repositorio remoto debería estar vacío para seguir los comandos iniciales. No usar force push; revisar el historial antes de continuar.
