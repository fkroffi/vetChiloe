import './BuscadorPaciente.css';

function BuscadorPaciente({ texto, onCambiar }) {
  return (
    <input
      className="buscador-paciente"
      type="search"
      value={texto}
      placeholder="Buscar por nombre o especie..."
      aria-label="Buscar pacientes por nombre o especie"
      onChange={(evento) => onCambiar(evento.target.value)}
    />
  );
}

export default BuscadorPaciente;