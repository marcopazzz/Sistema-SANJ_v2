// Importamos las funciones necesarias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- Faltaba esta línea

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfUdBsf9__53EzgQbNk7hWGt4lyUEZD64",
  authDomain: "sanji-roll-admin.firebaseapp.com",
  projectId: "sanji-roll-admin",
  storageBucket: "sanji-roll-admin.firebasestorage.app",
  messagingSenderId: "591339962260",
  appId: "1:591339962260:web:f9b27b813e62598bba1981"
};

// Inicializamos la aplicación de Firebase (UNA sola vez)
const app = initializeApp(firebaseConfig);

// Exportamos "auth" para que tu login lo pueda encontrar
export const auth = getAuth(app);