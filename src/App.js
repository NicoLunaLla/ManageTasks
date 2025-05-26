// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tabs from './components/Tabs';
import TasksPage from './components/UserTasks'; // crea este componente si no lo tienes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/tasks/:username" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
