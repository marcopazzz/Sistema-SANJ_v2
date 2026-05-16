import { useState } from "react";
import "./componentes/EmpleadosTable.css";

const empleadosData = [
  { id: 1, nombre: "Kenji Tanaka",   puesto: "Chef Principal",     departamento: "Cocina",   salario: 18500, estado: "Activo",   turno: "Mañana" },
  { id: 2, nombre: "Yuki Sato",      puesto: "Sous Chef",          departamento: "Cocina",   salario: 14200, estado: "Activo",   turno: "Tarde"  },
  { id: 3, nombre: "Carla Mendoza",  puesto: "Cajera",             departamento: "Caja",     salario: 9800,  estado: "Activo",   turno: "Mañana" },
  { id: 4, nombre: "Luis Herrera",   puesto: "Mesero",             departamento: "Servicio", salario: 8500,  estado: "Activo",   turno: "Noche"  },
  { id: 5, nombre: "Ana García",     puesto: "Mesera",             departamento: "Servicio", salario: 8500,  estado: "Inactivo", turno: "Tarde"  },
  { id: 6, nombre: "Roberto Díaz",   puesto: "Ayudante de Cocina", departamento: "Cocina",   salario: 7200,  estado: "Activo",   turno: "Mañana" },
  { id: 7, nombre: "Sofía López",    puesto: "Hostess",            departamento: "Servicio", salario: 8000,  estado: "Activo",   turno: "Noche"  },
];

export default function EmpleadosTable() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [empleados, setEmpleados] = useState(empleadosData);
  const [nuevoEmp, setNuevoEmp] = useState({
    nombre: "",
    puesto: "",
    departamento: "",
    salario: "",
    estado: "Activo",
    turno: "Mañana",
  });

  const empleadosFiltrados = empleados.filter(e => {
    const coincideBusqueda =
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.puesto.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" || e.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const handleAgregar = () => {
    if (!nuevoEmp.nombre || !nuevoEmp.puesto) return;

    setEmpleados([
      ...empleados,
      {
        ...nuevoEmp,
        id: empleados.length + 1,
        salario: Number(nuevoEmp.salario),
      },
    ]);

    setNuevoEmp({
      nombre: "",
      puesto: "",
      departamento: "",
      salario: "",
      estado: "Activo",
      turno: "Mañana",
    });
  };

  const handleEliminar = (id) => {
    setEmpleados(empleados.filter(e => e.id !== id));
  };

  return (
    <div className="et-container">
      <div className="et-header">
        <div>
          <h3 className="et-titulo">Empleados</h3>
          <p className="et-subtitulo">
            Gestión del personal activo e inactivo
          </p>
        </div>
      </div>

      <div className="et-grid">

        {/* 🔴 IZQUIERDA */}
        <div>
          <div className="et-controles">
            <input
              className="et-buscador"
              type="text"
              placeholder="Buscar por nombre o puesto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="et-filtros">
              {["Todos", "Activo", "Inactivo"].map((f) => (
                <button
                  key={f}
                  className={`et-filtro-btn ${
                    filtroEstado === f ? "activo" : ""
                  }`}
                  onClick={() => setFiltroEstado(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="et-tabla-wrapper">
            <table className="et-tabla">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Puesto</th>
                  <th>Departamento</th>
                  <th>Turno</th>
                  <th>Salario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {empleadosFiltrados.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="et-avatar-row">
                        <div className="et-avatar">
                          {emp.nombre.charAt(0)}
                        </div>
                        <span>{emp.nombre}</span>
                      </div>
                    </td>
                    <td>{emp.puesto}</td>
                    <td>
                      <span className="et-badge-dept">
                        {emp.departamento}
                      </span>
                    </td>
                    <td>{emp.turno}</td>
                    <td className="et-salario">
                      ${emp.salario.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`et-estado ${
                          emp.estado === "Activo"
                            ? "activo"
                            : "inactivo"
                        }`}
                      >
                        {emp.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="et-btn-eliminar"
                        onClick={() => handleEliminar(emp.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {empleadosFiltrados.length === 0 && (
              <p className="et-vacio">
                No se encontraron empleados.
              </p>
            )}
          </div>
        </div>

        {/* 🟢 DERECHA */}
        <div className="et-form">
          <h3 className="et-form-title">Crear empleado</h3>

          <input
            className="et-input"
            placeholder="Nombre"
            value={nuevoEmp.nombre}
            onChange={(e) =>
              setNuevoEmp({ ...nuevoEmp, nombre: e.target.value })
            }
          />

          <input
            className="et-input"
            placeholder="Puesto"
            value={nuevoEmp.puesto}
            onChange={(e) =>
              setNuevoEmp({ ...nuevoEmp, puesto: e.target.value })
            }
          />

          <input
            className="et-input"
            placeholder="Departamento"
            value={nuevoEmp.departamento}
            onChange={(e) =>
              setNuevoEmp({
                ...nuevoEmp,
                departamento: e.target.value,
              })
            }
          />

          <input
            className="et-input"
            type="number"
            placeholder="Sueldo base"
            value={nuevoEmp.salario}
            onChange={(e) =>
              setNuevoEmp({ ...nuevoEmp, salario: e.target.value })
            }
          />

          <select
            className="et-input"
            value={nuevoEmp.turno}
            onChange={(e) =>
              setNuevoEmp({ ...nuevoEmp, turno: e.target.value })
            }
          >
            <option>Matutino</option>
            <option>Vespertino</option>
            <option>Nocturno</option>
          </select>

          <select
            className="et-input"
            value={nuevoEmp.estado}
            onChange={(e) =>
              setNuevoEmp({ ...nuevoEmp, estado: e.target.value })
            }
          >
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button className="et-btn-guardar" onClick={handleAgregar}>
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}