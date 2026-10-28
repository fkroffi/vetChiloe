const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pacientesRoutes = require('./routes/pacientes');
const pacientesRepository = require('./repositories/pacientes');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json());
app.get('/health', async (req, res) => {
  try {
    await pacientesRepository.comprobarConexion();
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'error' });
  }
});
app.use('/api/pacientes', pacientesRoutes);

pacientesRepository.inicializar().then(() => {
  app.listen(PORT, () => {
    console.log(`API VetChiloé disponible en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo inicializar la base de datos:', error.message);
  process.exit(1);
});