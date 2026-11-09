const MAX_TITULO = 120;

function validarTitulo(valor) {
  const titulo = typeof valor === 'string' ? valor.trim() : '';
  if (!titulo) return { error: 'El título es obligatorio' };
  if (titulo.length > MAX_TITULO) {
    return { error: 'El título no puede superar 120 caracteres' };
  }
  return { titulo };
}

module.exports = { validarTitulo };
