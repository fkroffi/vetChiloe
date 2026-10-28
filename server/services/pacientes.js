const pacientesRepository = require('../repositories/pacientes');

const especiesPermitidas = new Set(['Felino', 'Canino', 'Otro']);

function validarPaciente(datos) {
  if (!especiesPermitidas.has(datos.especie)) {
    const error = new Error('La especie debe ser Felino o Canino.');
    error.statusCode = 400;
    throw error;
  }

  const edad = Number(datos.edad);
  const peso = Number(datos.peso);
  if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) {
    const error = new Error('La edad y el peso deben ser números no negativos.');
    error.statusCode = 400;
    throw error;
  }

  return { ...datos, edad, peso };
}

async function obtenerPacientes() {
  return pacientesRepository.obtenerTodos();
}

async function buscarPacientes(texto) {
  return pacientesRepository.buscar(String(texto || '').trim());
}

async function obtenerResumenPorEspecie() {
  return pacientesRepository.resumenPorEspecie();
}

async function registrarPaciente(datos) {
  const pacienteValidado = validarPaciente(datos);
  return pacientesRepository.crear(pacienteValidado);
}

async function actualizarPaciente(id, datos) {
  const pacienteActual = await pacientesRepository.obtenerPorId(id);
  if (!pacienteActual) return null;

  const pacienteValidado = validarPaciente({ ...pacienteActual, ...datos });
  return pacientesRepository.actualizar(id, {
    ...pacienteValidado,
    emoji: pacienteValidado.especie === 'Felino' ? '🐱' : '🐶',
  });
}

async function actualizarDiagnostico(id, diagnostico) {
  const texto = String(diagnostico || '').trim();
  if (!texto) {
    const error = new Error('El diagnóstico no puede estar vacío.');
    error.statusCode = 400;
    throw error;
  }
  return pacientesRepository.actualizarDiagnostico(id, texto);
}

module.exports = {
  obtenerPacientes,
  buscarPacientes,
  obtenerResumenPorEspecie,
  registrarPaciente,
  actualizarPaciente,
  actualizarDiagnostico,
};