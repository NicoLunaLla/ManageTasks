// RegisterForm.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from './DataBase';

function RegisterForm() {
  const [formData, setFormData] = useState({
    registerName: '',
    registerLastName: '',
    registerUser: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      { id: 'registerName', label: 'Nombres' },
      { id: 'registerUser', label: 'Usuario' },
      { id: 'registerEmail', label: 'Correo' },
      { id: 'registerPassword', label: 'Contraseña' },
      { id: 'registerConfirmPassword', label: 'Confirmar contraseña' }
    ];

    let isValid = true;

    requiredFields.forEach(({ id, label }) => {
      if (!formData[id].trim()) {
        toast.error(` El campo '${label}' no puede estar vacío.`, {
          icon: '❗',
          className: 'custom-toast-error'
        });
        isValid = false;
      }
    });

    if (formData.registerEmail && !validarEmail(formData.registerEmail)) {
      toast.error(" El campo 'Correo' no tiene un formato válido.", {
        icon: '❗',
        className: 'custom-toast-error'
      });
      isValid = false;
    }

    if (formData.registerPassword !== formData.registerConfirmPassword) {
      toast.error(" Las contraseñas no coinciden.", {
        icon: '❗',
        className: 'custom-toast-error'
      });
      isValid = false;
    }

    const users = await db.getUsers();

    if (users.find(u => u.email === formData.registerEmail)) {
      toast.error(" Ya existe un usuario registrado con ese correo.", {
        icon: '❗',
        className: 'custom-toast-error'
      });
      isValid = false;
    }

    if (users.find(u => u.username === formData.registerUser)) {
      toast.error(" Ya existe un usuario con ese nombre de usuario.", {
        icon: '❗',
        className: 'custom-toast-error'
      });
      isValid = false;
    }

    if (!isValid) return;

    const newUser = {
      name: formData.registerName,
      lastName: formData.registerLastName,
      username: formData.registerUser,
      email: formData.registerEmail,
      password: formData.registerPassword
    };

    try {
      await db.insertUser(newUser);
      toast.success('✅ Usuario registrado con éxito');

      setFormData({
        registerName: '',
        registerLastName: '',
        registerUser: '',
        registerEmail: '',
        registerPassword: '',
        registerConfirmPassword: ''
      });
    } catch (error) {
      toast.error('❌ Error al registrar el usuario.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-3">Registrarse</h2>
        <div className="social-buttons mb-3">
          <button className="btn btn-outline-dark me-2" type="button"><i className="fab fa-facebook-f" /></button>
          <button className="btn btn-outline-dark me-2" type="button"><i className="fab fa-google" /></button>
          <button className="btn btn-outline-dark me-2" type="button"><i className="fab fa-x" /></button>
          <button className="btn btn-outline-dark" type="button"><i className="fab fa-github" /></button>
        </div>
        <label>Todos los campos marcados con (<span className="required">*</span>) son obligatorios</label>

        {['registerName', 'registerLastName', 'registerUser', 'registerEmail', 'registerPassword', 'registerConfirmPassword'].map((field, index) => (
          <div className="mb-3" key={index}>
            <label htmlFor={field} className="form-label">
              {field === 'registerName' && 'Nombres'}
              {field === 'registerLastName' && 'Apellidos'}
              {field === 'registerUser' && 'Usuario'}
              {field === 'registerEmail' && 'Correo electrónico'}
              {field === 'registerPassword' && 'Contraseña'}
              {field === 'registerConfirmPassword' && 'Confirmar contraseña'}
              {['registerName', 'registerUser', 'registerEmail', 'registerPassword', 'registerConfirmPassword'].includes(field) && <span className="required">*</span>}
            </label>
            <input
              type={field.includes('Password') ? 'password' : 'text'}
              className="form-control"
              id={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </>
  );
}

export default RegisterForm;
