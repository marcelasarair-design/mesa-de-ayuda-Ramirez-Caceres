import { useState, useEffect } from 'react';
import Ticket from './Ticket';
import { TICKETS_INICIALES } from '../data/tickets';

const CICLO_ESTADOS = ['Abierto', 'En proceso', 'Cerrado'];

function MesaDeAyuda() {
  // Estado principal: la lista de tickets
  const [tickets, setTickets] = useState(TICKETS_INICIALES);

  // Campos controlados del formulario (R2)
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [error, setError] = useState('');

  // Filtro por prioridad (R4)
  const [filtro, setFiltro] = useState('Todas');

  // R6: efecto de observación
  useEffect(() => {
    console.log(`La lista tiene ${tickets.length} tickets`);
  }, [tickets]);

  // R2: agregar ticket con validación
  const handleAgregar = () => {
    if (titulo.trim().length < 5) {
      setError('El título debe tener al menos cinco caracteres');
      return;
    }
    setError('');
    const nuevoTicket = {
      id: Date.now(),
      titulo: titulo.trim(),
      prioridad,
      estado: 'Abierto',
    };
    setTickets([...tickets, nuevoTicket]);
    setTitulo('');
  };

  // R3: avance de estado sin mutar el arreglo original
  const handleAvanzar = (id) => {
    setTickets(
      tickets.map((t) => {
        if (t.id !== id) return t;
        const idx = CICLO_ESTADOS.indexOf(t.estado);
        if (idx === CICLO_ESTADOS.length - 1) return t; // ya está Cerrado
        return { ...t, estado: CICLO_ESTADOS[idx + 1] };
      })
    );
  };

  // R4: lista filtrada (derivada, no es estado propio)
  const ticketsFiltrados =
    filtro === 'Todas' ? tickets : tickets.filter((t) => t.prioridad === filtro);

  // R5: resumen derivado a partir de TODOS los tickets, no de los filtrados
  const abiertos = tickets.filter((t) => t.estado === 'Abierto').length;
  const enProceso = tickets.filter((t) => t.estado === 'En proceso').length;
  const cerrados = tickets.filter((t) => t.estado === 'Cerrado').length;

  return (
    <div className="container py-4">
      <h1>Mesa de ayuda</h1>
      <p className="text-muted">Soporte Técnico · Universidad Técnica Latinoamericana</p>

      {/* R2: formulario controlado */}
      <div className="input-group" style={{ maxWidth: 500 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Título del ticket"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: 140 }}
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button className="btn btn-primary" onClick={handleAgregar}>
          Agregar
        </button>
      </div>
      {error && <div className="text-danger small">{error}</div>}

      {/* R4: filtro por prioridad */}
      <div className="d-flex align-items-center gap-2 mt-4 mb-2">
        <label>Filtrar por prioridad</label>
        <select
          className="form-select form-select-sm"
          style={{ maxWidth: 140 }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      {/* R1: lista con componente hijo */}
      <ul className="list-unstyled">
        {ticketsFiltrados.map((t) => (
          <Ticket
            key={t.id}
            titulo={t.titulo}
            prioridad={t.prioridad}
            estado={t.estado}
            onAvanzar={() => handleAvanzar(t.id)}
          />
        ))}
      </ul>

      {/* R5: resumen derivado */}
      <p className="text-muted small">
        Abiertos: <strong>{abiertos}</strong> · En proceso: <strong>{enProceso}</strong> · Cerrados:{' '}
        <strong>{cerrados}</strong>
      </p>
    </div>
  );
}

export default MesaDeAyuda;