import { useState } from 'react';
import Ticket from './Ticket';
import { TICKETS_INICIALES } from '../data/tickets';

const CICLO_ESTADOS = ['Abierto', 'En proceso', 'Cerrado'];

function MesaDeAyuda() {
  const [tickets, setTickets] = useState(TICKETS_INICIALES);
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [error, setError] = useState('');

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

      {/* R1: lista con componente hijo */}
      <ul className="list-unstyled">
        {tickets.map((t) => (
          <Ticket
            key={t.id}
            titulo={t.titulo}
            prioridad={t.prioridad}
            estado={t.estado}
            onAvanzar={() => handleAvanzar(t.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default MesaDeAyuda;