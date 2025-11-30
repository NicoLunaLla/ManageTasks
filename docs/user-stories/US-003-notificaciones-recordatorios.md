# US-003: Notificaciones y Recordatorios

## Historia de Usuario

**Como** usuario de ManageTasks  
**Quiero** recibir notificaciones y recordatorios de mis tareas  
**Para** no olvidar tareas importantes y cumplir con mis fechas límite

## Descripción

Los usuarios necesitan ser notificados sobre tareas que requieren atención, especialmente aquellas que están por vencer o que ya vencieron. El sistema debe enviar recordatorios configurables para ayudar a los usuarios a mantenerse al día.

## Criterios de Aceptación

### Notificaciones del Navegador
- [ ] Debe solicitar permiso para mostrar notificaciones del navegador
- [ ] Debe mostrar notificación cuando una tarea está por vencer (configurable: 1 día antes, 2 días antes, etc.)
- [ ] Debe mostrar notificación cuando una tarea vence hoy
- [ ] Debe mostrar notificación cuando una tarea ya venció
- [ ] Las notificaciones deben incluir el título de la tarea y la fecha
- [ ] Debe permitir hacer clic en la notificación para abrir la aplicación

### Recordatorios Configurables
- [ ] Debe permitir configurar recordatorios al crear/editar una tarea
- [ ] Opciones de recordatorio:
  - X días antes de la fecha de vencimiento
  - El día de vencimiento
  - X horas antes de una hora específica
- [ ] Debe permitir múltiples recordatorios por tarea
- [ ] Debe mostrar un indicador visual de tareas con recordatorios activos

### Configuración de Notificaciones
- [ ] Debe tener una sección de configuración de notificaciones en el perfil
- [ ] Debe permitir activar/desactivar notificaciones globalmente
- [ ] Debe permitir configurar horarios de "no molestar"
- [ ] Debe permitir elegir qué tipos de notificaciones recibir

### Notificaciones en la Aplicación
- [ ] Debe mostrar un badge con el número de notificaciones pendientes
- [ ] Debe tener un panel de notificaciones donde se pueden ver todas
- [ ] Debe permitir marcar notificaciones como leídas
- [ ] Debe permitir eliminar notificaciones

## Prioridad

**Alta** - Mejora significativamente la utilidad de la aplicación para gestión de tareas.

## Estimación

**21 puntos** - Requiere implementación de Service Workers, gestión de permisos, lógica de programación de notificaciones, y UI para configuración.

## Notas Técnicas

- Implementar Service Worker para notificaciones en segundo plano
- Usar la API de Notificaciones del navegador
- Usar `setTimeout` o `setInterval` para verificar tareas pendientes
- Considerar usar una librería como `react-toastify` para notificaciones in-app
- Guardar preferencias de notificaciones en localStorage o base de datos

## Mockups/Referencias

- Icono de campana con badge de contador en el header
- Panel deslizable de notificaciones
- Configuración de recordatorios en el formulario de tarea
- Página de configuración de notificaciones en el perfil

