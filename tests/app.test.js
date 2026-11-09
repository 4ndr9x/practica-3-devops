const request = require('supertest');
const { createApp } = require('../src/app');

describe('API de tareas', () => {
  let app;
  beforeEach(() => { app = createApp(); });

  test('GET /health responde ok', async () => {
    const r = await request(app).get('/health');
    expect(r.status).toBe(200);
    expect(r.body.estado).toBe('ok');
  });

  test('POST /api/tareas crea una tarea', async () => {
    const r = await request(app).post('/api/tareas').send({ titulo: 'Configurar pipeline' });
    expect(r.status).toBe(201);
    expect(r.body).toMatchObject({ id: 1, titulo: 'Configurar pipeline', completada: false });
  });

  test('POST /api/tareas sin título devuelve 400', async () => {
    const r = await request(app).post('/api/tareas').send({});
    expect(r.status).toBe(400);
  });

  test('PATCH /api/tareas/:id alterna completada', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Escribir pruebas' });
    const r = await request(app).patch('/api/tareas/1');
    expect(r.body.completada).toBe(true);
  });

  test('PATCH de una tarea inexistente devuelve 404', async () => {
    const r = await request(app).patch('/api/tareas/99');
    expect(r.status).toBe(404);
  });

  test('GET /metrics cuenta solicitudes y tareas', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Medir' });
    const r = await request(app).get('/metrics');
    expect(r.body.tareas).toBe(1);
    expect(r.body.solicitudes).toBeGreaterThanOrEqual(2);
  });
});

// Pruebas de integración añadidas para la Práctica 3.
describe('Creación, consulta y eliminación de tareas', function () {
  let app;
  beforeEach(function () { app = createApp(); });

  test('GET /api/tareas devuelve una lista inicialmente vacía', async function () {
    const respuesta = await request(app).get('/api/tareas');
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('DELETE elimina la tarea y no devuelve contenido', async function () {
    const creada = await request(app).post('/api/tareas').send({ titulo: 'Eliminar esta tarea' });
    const respuesta = await request(app).delete('/api/tareas/' + creada.body.id);
    expect(respuesta.status).toBe(204);
    expect(respuesta.text).toBe('');
    const listado = await request(app).get('/api/tareas');
    expect(listado.body).toEqual([]);
    const metricas = await request(app).get('/metrics');
    expect(metricas.body.tareas).toBe(0);
  });

  test('DELETE de una tarea inexistente devuelve 404', async function () {
    const respuesta = await request(app).delete('/api/tareas/999');
    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Tarea no encontrada' });
  });

  test('eliminar dos veces devuelve 204 y después 404', async function () {
    await request(app).post('/api/tareas').send({ titulo: 'Temporal' });
    expect((await request(app).delete('/api/tareas/1')).status).toBe(204);
    expect((await request(app).delete('/api/tareas/1')).status).toBe(404);
  });

  test('crear después de eliminar mantiene identificadores únicos', async function () {
    await request(app).post('/api/tareas').send({ titulo: 'Primera' });
    await request(app).post('/api/tareas').send({ titulo: 'Segunda' });
    await request(app).delete('/api/tareas/1');
    const tercera = await request(app).post('/api/tareas').send({ titulo: 'Tercera' });
    expect(tercera.body.id).toBe(3);
    const listado = await request(app).get('/api/tareas');
    expect(listado.body.map(function (tarea) { return tarea.id; })).toEqual([2, 3]);
  });

  test('un DELETE fallido no elimina otras tareas', async function () {
    await request(app).post('/api/tareas').send({ titulo: 'Conservar' });
    expect((await request(app).delete('/api/tareas/abc')).status).toBe(404);
    expect((await request(app).get('/api/tareas')).body).toHaveLength(1);
  });

  test('POST rechaza un título de 121 caracteres sin crear la tarea', async function () {
    const respuesta = await request(app).post('/api/tareas').send({ titulo: 'a'.repeat(121) });
    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({ error: 'El título no puede superar 120 caracteres' });
    expect((await request(app).get('/api/tareas')).body).toEqual([]);
  });
});
