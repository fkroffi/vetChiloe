const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/pacientes`;

function especieParaApi(especie) {
  if (especie === 'Perro') return 'Canino';
  if (especie === 'Gato') return 'Felino';
  return especie;
}

function pacienteParaInterfaz(paciente) {
  const especie = paciente.especie === 'Canino'
    ? 'Perro'
    : paciente.especie === 'Felino'
      ? 'Gato'
      : paciente.especie;

  return {
    ...paciente,
    especie,
    edad: typeof paciente.edad === 'number' ? `${paciente.edad} años` : paciente.edad,
    peso: typeof paciente.peso === 'number' ? `${paciente.peso} kg` : paciente.peso,
  };
}

async function solicitar(url, opciones) {
  const respuesta = await fetch(url, opciones);
  const resultado = await respuesta.json();
  if (!respuesta.ok) throw new Error(resultado.error || 'No se pudo completar la solicitud.');
  return resultado;
}

function prepararDatos(datos) {
  return { ...datos, especie: especieParaApi(datos.especie) };
}

export async function obtenerPacientes() {
  const pacientes = await solicitar(API_URL);
  return pacientes.map(pacienteParaInterfaz);
}

export async function obtenerResumenPorEspecie() {
  const resumen = await solicitar(`${API_URL}/resumen`);
  return resumen.map((fila) => ({
    especie: fila.especie,
    total: Number(fila.total),
  }));
}

export async function buscarPacientes(texto) {
  const pacientes = await solicitar(`${API_URL}/buscar?q=${encodeURIComponent(texto)}`);
  return pacientes.map(pacienteParaInterfaz);
}

export async function registrarPaciente(datos) {
  const paciente = await solicitar(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prepararDatos(datos)),
  });
  return pacienteParaInterfaz(paciente);
}

export async function actualizarPaciente(id, datos) {
  const paciente = await solicitar(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prepararDatos(datos)),
  });
  return pacienteParaInterfaz(paciente);
}