// src/components/TaskAlerts.js
import React from 'react';

function TaskAlert({ tasks, username }) {
  const getAlertMessage = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const tareasUsuario = tasks.filter(t => t.user === username && !t.completed);

    const vencidas = tareasUsuario.filter(t => (t.date || '').split('T')[0] < hoy);
    const hoyVencen = tareasUsuario.filter(t => (t.date || '').split('T')[0] === hoy);

    if (vencidas.length > 0) {
      return `⚠️ Tienes ${vencidas.length} tarea(s) vencida(s). ¡Revísalas!`;
    } else if (hoyVencen.length > 0) {
      return `📅 Tienes ${hoyVencen.length} tarea(s) que vencen hoy.`;
    } else if (tareasUsuario.length > 0) {
      return `📝 Tienes ${tareasUsuario.length} tarea(s) pendientes por completar.`;
    } else {
      return null;
    }
  };

  const alertMessage = getAlertMessage();

  return (
    alertMessage && (
      <div className="alert alert-warning text-dark text-center fs-5 fw-bold" role="alert">
        {alertMessage}
      </div>
    )
  );
}

export default TaskAlert;
