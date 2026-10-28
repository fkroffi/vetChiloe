const pacientesService = require('../services/pacientes');

async function obtenerPacientes(req, res) {
  try {
    const pacientes = await pacientesService.obtenerPacientes();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarPacientes(req, res) {
  try {
    const pacientes = await pacientesService.buscarPacientes(req.query.q || '');
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerResumenPorEspecie(req, res) {
  try {
    const resumen = await pacientesService.obtenerResumenPorEspecie();
    res.json(resumen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function registrarPaciente(req, res) {
  try {
    const paciente = await pacientesService.registrarPaciente(req.body);
    res.status(201).json(paciente);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function actualizarDiagnostico(req, res) {
  try {
    const paciente = await pacientesService.actualizarDiagnostico(req.params.id, req.body.diagnostico);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado.' });
    res.json(paciente);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function actualizarPaciente(req, res) {
  try {
    const paciente = await pacientesService.actualizarPaciente(req.params.id, req.body);
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }
    res.json(paciente);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  obtenerPacientes,
  buscarPacientes,
  obtenerResumenPorEspecie,
  registrarPaciente,
  actualizarPaciente,
  actualizarDiagnostico,
};