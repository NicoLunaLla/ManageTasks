// TasksPage.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import TaskAlert from './TaskAlerts';
import { API_ENDPOINTS } from '../config/api';
import { formatDateToISO } from '../utils/dateUtils';
import { validateEmail, validatePassword } from '../utils/validation';

function TasksPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [activeSection, setActiveSection] = useState('inicio');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [date, setDateTask] = useState('');
  const [isDaily, setIsDaily] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [taskFilter, setTaskFilter] = useState(null);
  const [priority, setPriority] = useState('media');
  const [sortOption, setSortOption] = useState('prioridad');
  const [loading, setLoading] = useState(false); 


  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.TASKS);
      setTasks(res.data);
    } catch (err) {
      console.error('Error al obtener las tareas:', err);
      toast.error('❌ Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = useCallback(async () => {
    if (!username) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_ENDPOINTS.USERS}?username=${username}`);
      if (res.data.length > 0) {
        setUserProfile(res.data[0]);
        setEditForm({
          name: res.data[0].name,
          lastName: res.data[0].lastName,
          email: res.data[0].email,
          password: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      toast.error('❌ Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (activeSection === 'tareas' || activeSection === 'inicio') fetchTasks();
    if (activeSection === 'perfil') fetchUserProfile();
  }, [activeSection, fetchTasks, fetchUserProfile]);

  const handleProfileChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    if (editForm.password && editForm.password !== editForm.confirmPassword) {
      toast.error('⚠️ Las contraseñas no coinciden.');
      return;
    }

    if (editForm.password && !validatePassword(editForm.password)) {
      toast.error('⚠️ La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (editForm.email && !validateEmail(editForm.email)) {
      toast.error('⚠️ El correo electrónico no tiene un formato válido.');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_ENDPOINTS.USERS}/${userProfile.id}`, {
        ...userProfile,
        ...editForm,
        password: editForm.password ? editForm.password : userProfile.password
      });
      toast.success('✅ Perfil actualizado correctamente');
      setEditForm({
        ...editForm,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      toast.error('❌ Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = useCallback(async (task, nuevoEstado) => {
    try {
      const completada = nuevoEstado === 'Completada';
      const res = await axios.put(`${API_ENDPOINTS.TASKS}/${task.id}`, {
        ...task,
        status: nuevoEstado,
        completed: completada
      });
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? res.data : t));
      toast.success('✅ Estado actualizado');
    } catch (error) {
      console.error('Error actualizando estado:', error);
      toast.error('❌ Error al actualizar el estado');
    }
  }, []);

  const addTask = useCallback(async () => {
    if (!newTask.trim()) {
      toast.error('⚠️ La descripción de la tarea no puede estar vacía');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(API_ENDPOINTS.TASKS, {
        description: newTask,
        user: username,
        date: formatDateToISO(date),
        daily: isDaily,
        priority: priority,
        status: 'Sin iniciar',
        completed: false
      });
      setTasks(prevTasks => [...prevTasks, res.data]);
      setNewTask('');
      setDateTask('');
      setIsDaily(false);
      setPriority('media');
      toast.success('✅ Tarea agregada correctamente');
    } catch (err) {
      console.error('Error al agregar tarea:', err);
      toast.error('❌ Error al agregar la tarea');
    } finally {
      setLoading(false);
    }
  }, [newTask, username, date, isDaily, priority]);

  const toggleTask = useCallback(async (task) => {
    const nuevoEstado = task.status === 'Completada' ? 'Sin iniciar' : 'Completada';
    const completada = nuevoEstado === 'Completada';

    try {
      const res = await axios.put(`${API_ENDPOINTS.TASKS}/${task.id}`, {
        ...task,
        status: nuevoEstado,
        completed: completada
      });
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? res.data : t));
      toast.success(completada ? '✅ Tarea completada' : '📝 Tarea marcada como pendiente');
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      toast.error('❌ Error al actualizar la tarea');
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${API_ENDPOINTS.TASKS}/${id}`);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      toast.success('✅ Tarea eliminada correctamente');
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
      toast.error('❌ Error al eliminar la tarea');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResize = (e) => {
    const newWidth = Math.max(150, Math.min(400, e.clientX));
    if (!sidebarCollapsed) setSidebarWidth(newWidth);
  };

  const sortTasksByPriority = useCallback((tasks) => {
    const prioridadOrden = { alta: 1, media: 2, baja: 3 };
    return [...tasks].sort((a, b) => {
      const aVal = prioridadOrden[(a.priority || '').toLowerCase()] || 4;
      const bVal = prioridadOrden[(b.priority || '').toLowerCase()] || 4;
      return aVal - bVal;
    });
  }, []);

const getPriorityBadge = (priority) => {
  const lower = (priority || '').toLowerCase();
  let colorClass = 'secondary';

  if (lower === 'alta') colorClass = 'danger';
  else if (lower === 'media') colorClass = 'warning';
  else if (lower === 'baja') colorClass = 'success';

  return (
    <span className={`badge bg-${colorClass} ms-4 px-3 py-2 fs-6`}>
      Prioridad: {priority}
    </span>
  );
};

const getTaskStatus = (task) => {
  return task.status || 'Sin iniciar';
};

const getStatusBadge = (status) => {
  const colors = {
    'Vencida': 'danger',
    'En proceso': 'primary',
    'Por vencer': 'warning',
    'Sin iniciar': 'secondary',
    'Completada': 'success'
  };

  const icons = {
    'Vencida': '⚠️',
    'En proceso': '⏳',
    'Por vencer': '📅',
    'Sin iniciar': '📝',
    'Completada': '✅'
  };

  return (
    <span
      className={`badge bg-${colors[status] || 'light'} ms-1 px-4 py-2 fs-6 rounded-pill`}
      style={{
        outline: 'none',
        boxShadow: 'none',
        border: 'none'
      }}
    >
      {icons[status] || ''} Estado: {status}
    </span>
  );
};



  const sortTasksByStatus = useCallback((tasks) => {
    const statusOrder = {
      'Vencida': 1,
      'En proceso': 2,
      'Por vencer': 3,
      'Sin iniciar': 4,
      'Completada': 5
    };

    return [...tasks].sort((a, b) => {
      const statusA = getTaskStatus(a);
      const statusB = getTaskStatus(b);
      return statusOrder[statusA] - statusOrder[statusB];
    });
  }, []);



  const renderTaskList = (taskList) => (
    <ul className="list-group mt-3">
      {taskList.map(task => (
        <li key={task.id} className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.description} 
              {task.daily && <small className="text-info ms-2">(Diaria)</small>} 
              {getPriorityBadge(task.priority)}

            </span>
              {getStatusBadge(getTaskStatus(task))}
          <div>
          <div className="mt-2">
            <select
              className="form-select form-select-sm bg-dark text-white border-secondary"
              style={{ width: '180px' }}
              value={getTaskStatus(task)}
              onChange={(e) => actualizarEstado(task, e.target.value)}
            >
              {['Sin iniciar', 'Por vencer', 'En proceso', 'Vencida', 'Completada'].map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
            <button className="btn btn-sm btn-outline-light me-2" onClick={() => toggleTask(task)}>
              {task.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderPerfilSection = () => (
    <div className="d-flex justify-content-center">
      <div className="card text-light bg-dark w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Mis datos</h2>
          {userProfile ? (
            <form onSubmit={(e) => { e.preventDefault(); handleProfileUpdate(); }}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input type="text" className="form-control" name="name" value={editForm.name} onChange={handleProfileChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" name="lastName" value={editForm.lastName} onChange={handleProfileChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" name="email" value={editForm.email} onChange={handleProfileChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input type="password" className="form-control" name="password" value={editForm.password} onChange={handleProfileChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control" name="confirmPassword" value={editForm.confirmPassword} onChange={handleProfileChange} />
                {editForm.password !== editForm.confirmPassword && (
                  <div className="text-danger mt-1">⚠️ Las contraseñas no coinciden</div>
                )}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
              </div>
            </form>
          ) : (
            <p className="text-center">Cargando perfil...</p>
          )}
        </div>
      </div>
    </div>
  );

  const tareasUsuario = useMemo(() => 
    tasks.filter(t => t.user === username), 
    [tasks, username]
  );

  const tareasFiltradasYOrdenadas = useMemo(() => {
    const tareasFiltradas = taskFilter || tareasUsuario;
    return sortOption === 'prioridad' 
      ? sortTasksByPriority(tareasFiltradas)
      : sortTasksByStatus(tareasFiltradas);
  }, [taskFilter, tareasUsuario, sortOption, sortTasksByPriority, sortTasksByStatus]);

  const estadisticas = useMemo(() => {
    const completadas = tareasUsuario.filter(t => t.status === 'Completada');
    const pendientes = tareasUsuario.filter(t => t.status !== 'Completada');
    return { total: tareasUsuario.length, completadas, pendientes };
  }, [tareasUsuario]);

  const renderContent = () => {
    if (activeSection === 'inicio') {
      const { total, completadas, pendientes } = estadisticas;

      return (
        <div className="container text-light">
          <TaskAlert tasks={tasks} username={username} />
          <h2 className="text-center mb-4">Resumen de Actividad</h2>
          <div className="row text-center mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white" onClick={() => setTaskFilter(tareasUsuario)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <p className="display-6">{total}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white" onClick={() => setTaskFilter(completadas)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title">Completadas</h5>
                  <p className="display-6">{completadas.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning text-dark" onClick={() => setTaskFilter(pendientes)} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5 className="card-title">Pendientes</h5>
                  <p className="display-6">{pendientes.length}</p>
                </div>
              </div>
            </div>
          </div>
          {taskFilter && (
            <div className="mt-4">
              <h4 className="text-center">Detalle de Tareas</h4>
              {renderTaskList(sortTasksByPriority(taskFilter))}
              <div className="text-center mt-3">
                <button className="btn btn-secondary" onClick={() => setTaskFilter(null)}>Ocultar Detalle</button>
              </div>
            </div>
          )}
          {!taskFilter && <p className="text-center">Puedes hacer clic sobre las tarjetas para ver el detalle de cada una.</p>}
        </div>
      );
    } else if (activeSection === 'tareas') {
      return (
        <div className="d-flex flex-column align-items-center">
          <div className="card text-light bg-dark w-100" style={{ maxWidth: '600px' }}>
            <div className="card-body">
              <h2 className="mb-3">Tareas</h2>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control d-inline w-75 me-2 mb-2"
                  placeholder="Nueva tarea"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control d-inline w-75 me-2 mb-2"
                  value={date}
                  onChange={(e) => setDateTask(e.target.value)}
                />
                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dailyCheckbox"
                    checked={isDaily}
                    onChange={(e) => setIsDaily(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="dailyCheckbox">
                    Marcar como tarea diaria
                  </label>
                </div>
                <div className="mb-2">
                  <label className="form-label">Prioridad</label>
                    <select
                      className="form-select"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                </div>
                <button className="btn btn-success" onClick={addTask}>Agregar</button>
              </div>
            </div>
          </div>
          <div className="mb-3 w-100" style={{ maxWidth: '600px' }}>
            <label className="form-label text-white">Ordenar por:</label>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="prioridad">Prioridad</option>
              <option value="estado">Estado actual</option>
            </select>
          </div>
          <div className="w-100 mt-4">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              renderTaskList(tareasFiltradasYOrdenadas)
            )}
          </div>
        </div>
      );
    } else if (activeSection === 'perfil') {
      return renderPerfilSection();
    }
    return null;
  };

  return (
    <div className="d-flex">
      <div
        style={{
          width: `${sidebarCollapsed ? 60 : sidebarWidth}px`,
          background: '#3e3e3e',
          height: '100vh',
          padding: '1rem',
          color: 'white',
          position: 'relative',
          transition: 'width 0.3s ease',
          borderRight: '2px solid #444'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          {!sidebarCollapsed && <h4 className="m-0">ManageTasks</h4>}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            <i className={`fas ${sidebarCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
          </button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 text-start" onClick={() => setActiveSection('inicio')}>
              <i className="fas fa-home me-2"></i>
              {!sidebarCollapsed && 'Inicio'}
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 text-start" onClick={() => setActiveSection('tareas')}>
              <i className="fas fa-tasks me-2"></i>
              {!sidebarCollapsed && 'Tareas'}
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 text-start" onClick={() => setActiveSection('perfil')}>
              <i className="fas fa-user me-2"></i>
              {!sidebarCollapsed && 'Mis datos'}
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-white d-flex align-items-center border-0 bg-transparent w-100 text-start"
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                  navigate("/");
                }
              }}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              {!sidebarCollapsed && 'Cerrar sesión'}
            </button>
          </li>
        </ul>
        {!sidebarCollapsed && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '5px',
              height: '100%',
              cursor: 'col-resize',
              background: '#444'
            }}
            onMouseDown={(e) => {
              const onMouseMove = (e) => handleResize(e);
              const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
              };
              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', onMouseUp);
            }}
          ></div>
        )}
      </div>
      <div className="flex-grow-1 p-4 text-light">
        {loading && activeSection !== 'tareas' && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
        {renderContent()}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default TasksPage;
