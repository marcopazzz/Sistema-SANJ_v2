import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Importamos las funciones de Firebase (necesitaremos configurar esto después)
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Asumimos que crearás este archivo
import "./componentes/login.css";

const Login = () => {
  const navigate = useNavigate();
  const usuarioRef = useRef(null);
  const passRef = useRef(null); // Añadimos ref para la contraseña
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [focused, setFocused] = useState({ user: false, pass: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Limpiamos errores previos

    const emailUsuario = usuarioRef.current?.value;
    const password = passRef.current?.value;

    try {
      // 1. Firebase valida el usuario y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, emailUsuario, password);
      
      // 2. Pedimos el Token (la pulsera VIP real)
      const tokenReal = await userCredential.user.getIdToken();
      
      // 3. Guardamos el token seguro y el nombre
      localStorage.setItem("token", tokenReal);
      localStorage.setItem("usuario", userCredential.user.email);
      
      // 4. Redirigimos a ventas
      navigate("/ventas");
      
    } catch (err) {
      // Si la contraseña está mal, Firebase arroja un error
      console.error("Error de autenticación:", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-bg">
      <div className="lg-noise" />
      <div className="lg-side-bar" />

      <div className="lg-card">
        {/* ── Marca con imagen ── */}
        <div className="lg-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <img 
            src="/LOGO-removebg-preview.png" 
            alt="Logo Sanji Roll" 
            style={{ width: "150px", height: "auto", borderRadius: "17%", marginBottom: "5px" }} 
          />
        </div>

        <div className="lg-divider" />

        <div className="lg-header">
          <h1 className="lg-title">Iniciar Sesión</h1>
          <p className="lg-sub">Accede al panel de control</p>
        </div>

        <form className="lg-form" onSubmit={handleSubmit}>
          {/* Usuario (Firebase usa correos por defecto) */}
          <div className={`lg-field ${focused.user ? "active" : ""}`}>
            <label className="lg-label" htmlFor="lg-user">Correo electrónico</label>
            <div className="lg-input-wrap">
              <svg className="lg-ico" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3.5 17c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="lg-user"
                type="email" // Mejor usar type email para Firebase
                ref={usuarioRef}
                className="lg-input"
                placeholder="admin@sanjiroll.com"
                required
                autoComplete="username"
                onFocus={() => setFocused(f => ({ ...f, user: true }))}
                onBlur={() => setFocused(f => ({ ...f, user: false }))}
              />
            </div>
            <div className="lg-underline" />
          </div>

          {/* Contraseña */}
          <div className={`lg-field ${focused.pass ? "active" : ""}`}>
            <label className="lg-label" htmlFor="lg-pass">Contraseña</label>
            <div className="lg-input-wrap">
              <svg className="lg-ico" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="lg-pass"
                type="password"
                ref={passRef} // Conectamos el ref aquí
                className="lg-input"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                onFocus={() => setFocused(f => ({ ...f, pass: true }))}
                onBlur={() => setFocused(f => ({ ...f, pass: false }))}
              />
            </div>
            <div className="lg-underline" />
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <p style={{ color: "#ff4d4d", fontSize: "0.85rem", textAlign: "center", margin: "5px 0" }}>
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className={`lg-btn ${loading ? "lg-btn--loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="lg-spinner" />
            ) : (
              <>
                <span>Entrar al sistema</span>
                <svg className="lg-arrow" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>

          <p className="login-mensaje-admin" style={{ color: "#888", fontSize: "0.8rem", textAlign: "center", marginTop: "15px" }}>
            En caso de olvidar la contraseña, comunícate con el administrador
          </p>
        </form>

        <div className="lg-footer">
          <span className="lg-dot">·</span>
        </div>
      </div>

      <span className="lg-version">v2.0 · 売上管理</span>
    </div>
  );
};

export default Login;