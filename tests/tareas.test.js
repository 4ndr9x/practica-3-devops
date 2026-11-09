const { validarTitulo } = require('../src/tareas');

describe('Validación unitaria del título', function () {
  test.each([undefined, null, 42, {}, '', '   '])('rechaza título inválido: %p', function (valor) {
    expect(validarTitulo(valor)).toEqual({ error: 'El título es obligatorio' });
  });

  test('elimina espacios al principio y al final', function () {
    expect(validarTitulo('  Estudiar DevOps  ')).toEqual({ titulo: 'Estudiar DevOps' });
  });

  test('acepta exactamente 120 caracteres', function () {
    expect(validarTitulo('a'.repeat(120))).toEqual({ titulo: 'a'.repeat(120) });
  });

  test('rechaza más de 120 caracteres', function () {
    expect(validarTitulo('a'.repeat(121))).toHaveProperty('error');
  });
});
