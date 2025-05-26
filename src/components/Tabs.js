import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';



function Tabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className='tab-container'>
      {/* 👇 Añade el nombre de la app aquí */}
      <h1 className="text-center text-light mb-4" style={{ fontWeight: 'bold' }}>
        ManageTasks
      </h1>

      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </li>
      </ul>
 
      <div className="tab-content">
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'register' && <RegisterForm />}
      </div>
    </div>
  );
}


export default Tabs;
