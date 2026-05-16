import React, { useState } from "react";
import "./Ventas.css";

// 1. Separamos los datos.
const ventasData = {
  sucursal1: {
    "7d": [
      { day: "Lun", sales: 12400, orders: 98  },
      { day: "Mar", sales: 15800, orders: 120 },
      { day: "Mié", sales: 11200, orders: 87  },
      { day: "Jue", sales: 17600, orders: 138 },
      { day: "Vie", sales: 22000, orders: 175 },
      { day: "Sáb", sales: 24800, orders: 196 },
      { day: "Hoy", sales: 18460, orders: 134 },
    ],
    "30d": [
      { day: "S1", sales: 88000,  orders: 620 },
      { day: "S2", sales: 102000, orders: 740 },
      { day: "S3", sales: 95000,  orders: 690 },
      { day: "S4", sales: 118000, orders: 830 },
    ],
    "3m": [
      { day: "Ene", sales: 320000, orders: 2400 },
      { day: "Feb", sales: 295000, orders: 2180 },
      { day: "Mar", sales: 182000, orders: 1340 },
    ],
  },
  sucursal2: {
    "7d": [
      { day: "Lun", sales: 9500,  orders: 80  },
      { day: "Mar", sales: 14200, orders: 110 },
      { day: "Mié", sales: 10500, orders: 75  },
      { day: "Jue", sales: 16000, orders: 125 },
      { day: "Vie", sales: 19800, orders: 160 },
      { day: "Sáb", sales: 21500, orders: 180 },
      { day: "Hoy", sales: 17000, orders: 120 },
    ],
    "30d": [
      { day: "S1", sales: 75000,  orders: 580 },
      { day: "S2", sales: 98000,  orders: 710 },
      { day: "S3", sales: 89000,  orders: 650 },
      { day: "S4", sales: 105000, orders: 790 },
    ],
    "3m": [
      { day: "Ene", sales: 290000, orders: 2100 },
      { day: "Feb", sales: 275000, orders: 1980 },
      { day: "Mar", sales: 165000, orders: 1240 },
    ],
  }
};

function getFechaActual() {
  const ahora = new Date();
  const dias  = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${dias[ahora.getDay()]} ${ahora.getDate()} ${meses[ahora.getMonth()]}, ${ahora.getFullYear()}`;
}

function ModuloSucursal({ nombreSucursal, datosSucursal }) {
  const [seg, setSeg] = useState("7d");

  const data = datosSucursal[seg];
  const maxS = Math.max(...data.map((d) => d.sales));
  const maxO = Math.max(...data.map((d) => d.orders));

  return (
    <div className="modulo-sucursal">
      <div className="v-card">
        <div className="v-card-hd">
          <div>
            <div className="v-card-title">Ventas por Período - {nombreSucursal}</div>
            <div className="v-card-sub">Ingresos ($) y órdenes comparados</div>
          </div>
          <div className="seg-ctrl">
            {["7d", "30d", "3m"].map((s) => (
              <div
                key={s}
                className={`seg-btn${seg === s ? " on" : ""}`}
                onClick={() => setSeg(s)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="bar-chart bar-chart-full">
          {data.map((d) => (
            <div className="bc-group" key={d.day}>
              <div className="bc-bars">
                <div
                  className="bc-bar bc-red"
                  style={{ height: `${Math.round((d.sales / maxS) * 118)}px` }}
                  title={`$${d.sales.toLocaleString()}`}
                />
                <div
                  className="bc-bar bc-gold"
                  style={{ height: `${Math.round((d.orders / maxO) * 118)}px` }}
                  title={`${d.orders} órdenes`}
                />
              </div>
              <div className="bc-label">{d.day}</div>
            </div>
          ))}
        </div>

        <div className="chart-legend">
          <div className="leg-item"><div className="leg-dot red-dot" />Ventas ($)</div>
          <div className="leg-item"><div className="leg-dot gold-dot" />Órdenes</div>
        </div>
      </div>

      <div className="v-card" style={{ marginTop: "20px" }}>
        <div className="v-card-hd">
          <div>
            <div className="v-card-title">Detalle de Ventas - {nombreSucursal}</div>
            <div className="v-card-sub">Registro por día del período seleccionado</div>
          </div>
        </div>

        <table className="ventas-table">
          <thead>
            <tr>
              <th>Período</th>
              <th>Ventas ($)</th>
              <th>Órdenes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.day}>
                <td className="td-day">{d.day}</td>
                <td className="td-sales">${d.sales.toLocaleString()}</td>
                <td>{d.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 3. SECCIÓN CORTE DEL DÍA (MEJORADA Y HUMANIZADA)
function SeccionCorteDelDia() {
  // Estados para los 9 campos solicitados
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [sucursal, setSucursal] = useState("Lola Beltrán");
  
  const [inicioEfectivo, setInicioEfectivo] = useState("");
  const [inicioCuenta, setInicioCuenta] = useState("");
  const [fondoCaja, setFondoCaja] = useState("");
  
  const [ingresosTotales, setIngresosTotales] = useState("");
  const [egresosTotales, setEgresosTotales] = useState("");
  
  const [finalEfectivo, setFinalEfectivo] = useState("");
  const [finalCuenta, setFinalCuenta] = useState("");

  const [resultado, setResultado] = useState(null);

  // Función para procesar y calcular
  const calcularCorte = () => {
    // Convertimos a números (si está vacío, vale 0)
    const num = (val) => Number(val) || 0;

    const totalInicio = num(inicioEfectivo) + num(inicioCuenta) + num(fondoCaja);
    const balanceOperativo = num(ingresosTotales) - num(egresosTotales);
    
    // Lo que DEBERÍA haber en total al final del día
    const esperado = totalInicio + balanceOperativo;
    
    // Lo que DECLARAN que hay físicamente
    const declarado = num(finalEfectivo) + num(finalCuenta);
    
    // La diferencia (positiva = sobra, negativa = falta, cero = cuadra)
    const diferencia = declarado - esperado;

    setResultado({
      esperado,
      declarado,
      diferencia
    });
  };

  return (
    <div className="v-card" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "30px" }}>
      
      {/* ── COLUMNA IZQUIERDA: FORMULARIO ── */}
      <div style={{ flex: "1 1 55%" }}>
        <h3 className="v-card-title" style={{ fontSize: "1.3rem", marginBottom: "5px" }}>Corte del Día</h3>
        <p className="v-card-sub" style={{ marginBottom: "25px", color: "#888" }}>
          Ingresa los montos del día para calcular el balance.
        </p>

        {/* Fila 1 */}
        <div className="form-grid-2">
          <div className="input-group">
            <label>Fecha del Corte</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="corte-input" />
          </div>
          <div className="input-group">
            <label>Sucursal</label>
            <select value={sucursal} onChange={(e) => setSucursal(e.target.value)} className="corte-input">
              <option value="Lola Beltrán">Lola Beltrán</option>
              <option value="Santa Fe">Santa Fe</option>
            </select>
          </div>
        </div>

        {/* Fila 2 */}
        <h4 className="seccion-label">Apertura</h4>
        <div className="form-grid-3">
          <div className="input-group">
            <label>Inicio Efectivo ($)</label>
            <input type="number" placeholder="0" value={inicioEfectivo} onChange={(e) => setInicioEfectivo(e.target.value)} className="corte-input" />
          </div>
          <div className="input-group">
            <label>Inicio Cuenta ($)</label>
            <input type="number" placeholder="0" value={inicioCuenta} onChange={(e) => setInicioCuenta(e.target.value)} className="corte-input" />
          </div>
          <div className="input-group">
            <label>Fondo Caja ($)</label>
            <input type="number" placeholder="0" value={fondoCaja} onChange={(e) => setFondoCaja(e.target.value)} className="corte-input" />
          </div>
        </div>

        {/* Fila 3 */}
        <h4 className="seccion-label">Movimientos del Día</h4>
        <div className="form-grid-2">
          <div className="input-group">
            <label>Ingresos Totales ($)</label>
            <input type="number" placeholder="0" value={ingresosTotales} onChange={(e) => setIngresosTotales(e.target.value)} className="corte-input" />
          </div>
          <div className="input-group">
            <label>Egresos Totales ($)</label>
            <input type="number" placeholder="0" value={egresosTotales} onChange={(e) => setEgresosTotales(e.target.value)} className="corte-input" />
          </div>
        </div>

        {/* Fila 4 */}
        <h4 className="seccion-label">Cierre Real (Declarado)</h4>
        <div className="form-grid-2">
          <div className="input-group">
            <label>Final Efectivo ($)</label>
            <input type="number" placeholder="0" value={finalEfectivo} onChange={(e) => setFinalEfectivo(e.target.value)} className="corte-input" />
          </div>
          <div className="input-group">
            <label>Final Cuenta ($)</label>
            <input type="number" placeholder="0" value={finalCuenta} onChange={(e) => setFinalCuenta(e.target.value)} className="corte-input" />
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button className="corte-btn primary animated-btn" onClick={calcularCorte}>
            ✨ Calcular Corte
          </button>
          <button className="corte-btn outline animated-btn">
            💾 Guardar Cierre
          </button>
        </div>
      </div>

      {/* ── COLUMNA DERECHA: RESULTADO HUMANIZADO ── */}
      <div className="resultado-panel">
        <h3 className="v-card-title" style={{ fontSize: "1.2rem", borderBottom: "1px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>
          Resumen del Balance
        </h3>
        
        {!resultado ? (
          <div className="estado-vacio">
            <p>Llena los datos y presiona "Calcular Corte" para ver el resumen.</p>
          </div>
        ) : (
          <div className="resultado-datos">
            <div className="resumen-item">
              <span>Total Esperado en Sistema:</span>
              <span className="monto">${resultado.esperado.toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
            </div>
            
            <div className="resumen-item">
              <span>Total Declarado (Físico/Cuentas):</span>
              <span className="monto">${resultado.declarado.toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
            </div>

            <div className="resumen-divisor"></div>

            <div className={`resumen-final ${resultado.diferencia === 0 ? 'cuadra' : resultado.diferencia < 0 ? 'falta' : 'sobra'}`}>
              <div className="resultado-texto">
                {resultado.diferencia === 0 && "✅ ¡El corte cuadra perfectamente!"}
                {resultado.diferencia < 0 && "⚠️ Faltante detectado:"}
                {resultado.diferencia > 0 && "💰 Sobrante detectado:"}
              </div>
              <div className="resultado-valor">
                ${Math.abs(resultado.diferencia).toLocaleString('es-MX', {minimumFractionDigits: 2})}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Componente principal exportado
export default function Ventas() {
  return (
    <div className="ventas-page">
      <div className="ventas-header">
        <div>
          <h1 className="ventas-title">Inicio</h1>
          <p className="ventas-sub"> · Reporte de ingresos y rendimiento</p>
        </div>
        <div className="ventas-header-right">
          <div className="time-chip">📅 {getFechaActual()}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        <ModuloSucursal nombreSucursal="LOLA BELTRÁN" datosSucursal={ventasData.sucursal1} />
        <ModuloSucursal nombreSucursal="SANTA FE" datosSucursal={ventasData.sucursal2} />
      </div>

      {/* AQUÍ ESTÁ LA LLAMADA AL NUEVO COMPONENTE */}
      <SeccionCorteDelDia />
    </div>
  );
}