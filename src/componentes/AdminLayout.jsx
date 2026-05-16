import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const navItems = [
  { to: "/ventas",   icon: "🍣", label: "Inicio"   },
  { to: "/nomina",   icon: "👥", label: "Nómina"   },
  { to: "/finanzas", icon: "📊", label: "Finanzas" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const usuarioCompleto = localStorage.getItem("usuario") || "Usuario";
  const iniciales = usuarioCompleto
    .split(" ")
    .slice(0, 2)
    .map(p => p.charAt(0).toUpperCase())
    .join("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="admin-shell">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        
        {/* LOGO */}
        <div className="sidebar-logo">
          <img 
            src="/LOGO-removebg-preview.png" 
            alt="Logo Sanji Roll" 
            className="logo-img"
          />
        </div>

        {/* NAVEGACIÓN */}
        <nav className="sidebar-nav">
          <span className="nav-section-label">Principal</span>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
            >
              <div className="nav-item-content">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
              <span className="nav-arrow">›</span>
            </NavLink>
          ))}
        </nav>

        {/* SECCIÓN INFERIOR */}
        <div className="sidebar-bottom">
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">{iniciales}</div>
              <div className="user-details">
                <span className="user-name">{usuarioCompleto}</span>
                <span className="user-role">Gerente</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── CONTENIDO DE LAS PÁGINAS ── */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}