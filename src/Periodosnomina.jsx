import { useState } from "react";
import "./componentes/PeriodosNomina.css";

/* 🧠 Helpers */
const formatear = (fecha) =>
  fecha.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const generarSemana = (base = new Date()) => {
  const inicio = new Date(base);
  const dia = inicio.getDay();

  // Ajustar a lunes
  inicio.setDate(inicio.getDate() - (dia === 0 ? 6 : dia - 1));

  const fin = new Date(inicio);
  fin.setDate(inicio.getDate() + 6);

  return {
    inicio,
    fin,
    texto: `${formatear(inicio)} – ${formatear(fin)}`,
    fecha: formatear(fin),
  };
};

export default function PeriodosNomina() {
  const semanaActual = generarSemana();

  const [historial, setHistorial] = useState([]);
  const [pendiente, setPendiente] = useState({
    periodo: semanaActual.texto,
    empleados: 7,
    totalBruto: 41500,
    totalNeto: 36200,
    estado: "Pendiente",
    fecha: semanaActual.fecha,
  });

  const procesarPago = () => {
    const nuevo = {
      ...pendiente,
      id: historial.length + 1,
      estado: "Pagado",
    };

    // 🔥 siguiente semana automática
    const siguienteBase = new Date();
    siguienteBase.setDate(siguienteBase.getDate() + 7);

    const nuevaSemana = generarSemana(siguienteBase);

    setHistorial([nuevo, ...historial]);

    setPendiente({
      periodo: nuevaSemana.texto,
      empleados: 7,
      totalBruto: 42000,
      totalNeto: 36700,
      estado: "Pendiente",
      fecha: nuevaSemana.fecha,
    });
  };

  const fmt = (n) => `$${n.toLocaleString()}`;

  return (
    <div className="pn-container">
      <div className="pn-header">
        <h3 className="pn-titulo">Períodos de Nómina</h3>
        <p className="pn-subtitulo">
          Historial y control de pagos semanales
        </p>
      </div>

      {/* 🔥 ACTUAL */}
      <div className="pn-actual">
        <div className="pn-actual-info">
          <span className="pn-badge pendiente">⏳ Semana actual</span>

          <h4 className="pn-actual-periodo">
            {pendiente.periodo}
          </h4>

          <div className="pn-actual-stats">
            <div className="pn-stat">
              <span className="pn-stat-label">Empleados</span>
              <span className="pn-stat-valor">
                {pendiente.empleados}
              </span>
            </div>

            <div className="pn-stat">
              <span className="pn-stat-label">Total Bruto</span>
              <span className="pn-stat-valor">
                {fmt(pendiente.totalBruto)}
              </span>
            </div>

            <div className="pn-stat">
              <span className="pn-stat-label">Total Neto</span>
              <span className="pn-stat-valor neto">
                {fmt(pendiente.totalNeto)}
              </span>
            </div>

            <div className="pn-stat">
              <span className="pn-stat-label">Fecha de pago</span>
              <span className="pn-stat-valor">
                {pendiente.fecha}
              </span>
            </div>
          </div>
        </div>

        <button
          className="pn-btn-procesar"
          onClick={procesarPago}
        >
          Procesar Pago →
        </button>
      </div>

      {/* HISTORIAL */}
      <div className="pn-historial-header">
        <p className="pn-historial-label">
          HISTORIAL DE SEMANAS
        </p>
      </div>

      <div className="pn-lista">
        {historial.map((p) => (
          <div key={p.id} className="pn-item">
            <div className="pn-item-left">
              <span className="pn-badge pagado">
                ✓ Pagado
              </span>
              <span className="pn-item-periodo">
                {p.periodo}
              </span>
            </div>

            <div className="pn-item-right">
              <span className="pn-item-emp">
                {p.empleados} empleados
              </span>
              <span className="pn-item-bruto">
                {fmt(p.totalBruto)}
              </span>
              <span className="pn-item-neto">
                {fmt(p.totalNeto)} neto
              </span>
              <span className="pn-item-fecha">
                {p.fecha}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}