// Un componente en React es una función que retorna JSX
// `props` (propiedades) es un objeto que contiene los datos del componentes

function TarjetaPaciente({ paciente, onVerFicha }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta-identidad">
        <span className="tarjeta-mascota" aria-hidden="true">{paciente.emoji}</span>
        <div>
          <p className={`tarjeta-especie ${paciente.especie.toLowerCase()}`}>{paciente.especie}</p>
          <h3>{paciente.nombre}</h3>
        </div>
      </div>
      <p className="tarjeta-responsable"><strong>Responsable</strong>{paciente.duenio}</p>
      <p className="tarjeta-numero">N° atención <span>{paciente.numero_atencion}</span></p>
      <button className="btn-detalle" type="button" onClick={() => onVerFicha(paciente)}>
        Abrir ficha clínica
      </button>
    </article>
  );
}
export default TarjetaPaciente;
