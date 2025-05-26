// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from './DataBase';

function LoginForm() {
  const [formData, setFormData] = useState({
    loginUser: '',
    loginPassword: ''
  });

  const [verPassword, setVerPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.loginUser.trim()) {
      toast.error("⚠️ El campo 'Correo o Usuario' no puede estar vacío.");
      return;
    }

    if (!formData.loginPassword.trim()) {
      toast.error("⚠️ El campo 'Contraseña' no puede estar vacío.");
      return;
    }

    try {
      const user = await db.validateLogin(formData.loginUser, formData.loginPassword);

      if (!user) {
        toast.error('❌ Usuario o contraseña incorrectos.');
        return;
      }

      toast.success('✅ Inicio de sesión exitoso');
      setTimeout(() => navigate(`/tasks/${user.username}`), 1000);
    } catch (error) {
      console.error(error);
      toast.error('❌ Error al intentar iniciar sesión.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Iniciar sesión</h2>
        <div className="social-buttons mb-3">
          <button className="btn btn-outline-dark me-2"><i className="fab fa-facebook-f" /></button>
          <button className="btn btn-outline-dark me-2"><i className="fab fa-google" /></button>
          <button className="btn btn-outline-dark me-2"><i className="fab fa-x" /></button>
          <button className="btn btn-outline-dark"><i className="fab fa-github" /></button>
        </div>

        <div className="mb-3">
          <label htmlFor="loginUser" className="form-label">Correo o Usuario<span className="required">*</span></label>
          <input
            type="text"
            className="form-control"
            id="loginUser"
            value={formData.loginUser}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="loginPassword" className="form-label">Contraseña<span className="required">*</span></label>
          <input
            type={verPassword ? 'text' : 'password'}
            className="form-control"
            id="loginPassword"
            value={formData.loginPassword}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <span
            onClick={() => setVerPassword(!verPassword)}
            style={{
              position: 'absolute',
              top: '38px',
              right: '12px',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            {verPassword ? '🙈' : '👀'}
          </span>
        </div>

        <div className="mb-3">
          <input className="form-check-input" type="checkbox" id="rememberMe" />
          <label className="form-check-label ms-2" htmlFor="rememberMe">Recordarme</label>
          <a href="#" className="float-end">Olvidé mi contraseña</a>
        </div>

        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default LoginForm;
