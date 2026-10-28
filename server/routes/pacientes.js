const express = require('express');
const pacientesController = require('../controllers/pacientes');

const router = express.Router();

router.get('/buscar', pacientesController.buscarPacientes);
router.get('/resumen', pacientesController.obtenerResumenPorEspecie);
router.put('/:id/diagnostico', pacientesController.actualizarDiagnostico);
router.get('/', pacientesController.obtenerPacientes);
router.post('/', pacientesController.registrarPaciente);
router.put('/:id', pacientesController.actualizarPaciente);

module.exports = router;