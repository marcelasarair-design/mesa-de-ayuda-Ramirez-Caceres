import { useState } from 'react';
import Ticket from './Ticket';
import { TICKETS_INICIALES } from '../data/tickets';

function MesaDeAyuda() {
  const [tickets, setTickets] = useState(TICKETS_INICIALES);

  return (
    <div className="container py-4">
      <h1>Mesa de ayuda</h1>
      <p className="text-muted">Soporte Técnico · Universidad Técnica Latinoamericana</p>

      {/* R1: lista con componente hijo */}
      <ul className="list-unstyled">
        {tickets.map((t) => (
          <Ticket
            key={t.id}
            titulo={t.titulo}
            prioridad={t.prioridad}
            estado={t.estado}
            onAvanzar={() => {}}
          />
        ))}
      </ul>
    </div>
  );
}

export default MesaDeAyuda;