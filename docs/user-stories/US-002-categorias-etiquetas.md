# US-002: Categorías y Etiquetas para Tareas

## Historia de Usuario

**Como** usuario de ManageTasks  
**Quiero** poder organizar mis tareas con categorías y etiquetas  
**Para** agrupar tareas relacionadas y mantener mejor organización de mis actividades

## Descripción

Los usuarios necesitan una forma de categorizar y etiquetar sus tareas para poder organizarlas por proyectos, contextos, o cualquier otro criterio que les sea útil. Esto facilitará la gestión de múltiples proyectos o áreas de trabajo.

## Criterios de Aceptación

### Categorías
- [ ] Debe permitir crear categorías personalizadas (ej: "Trabajo", "Personal", "Estudios", "Proyecto X")
- [ ] Cada tarea debe poder asignarse a una categoría
- [ ] Debe mostrar un selector de categoría al crear/editar una tarea
- [ ] Debe permitir filtrar tareas por categoría
- [ ] Debe mostrar un color distintivo para cada categoría
- [ ] Debe permitir editar y eliminar categorías (solo si no hay tareas asignadas)

### Etiquetas
- [ ] Debe permitir agregar múltiples etiquetas a una tarea
- [ ] Debe permitir crear etiquetas nuevas al escribir
- [ ] Debe mostrar sugerencias de etiquetas existentes mientras se escribe
- [ ] Debe mostrar las etiquetas como badges en la lista de tareas
- [ ] Debe permitir filtrar por una o múltiples etiquetas
- [ ] Debe mostrar un contador de tareas por etiqueta

### Gestión de Categorías y Etiquetas
- [ ] Debe tener una sección de administración de categorías y etiquetas
- [ ] Debe permitir cambiar el color de las categorías
- [ ] Debe mostrar estadísticas de uso de categorías y etiquetas
- [ ] Debe permitir fusionar etiquetas similares

## Prioridad

**Media-Alta** - Mejora la organización pero no es crítica para el funcionamiento básico.

## Estimación

**13 puntos** - Requiere cambios en el modelo de datos, UI para gestión, y lógica de filtrado.

## Notas Técnicas

- Agregar campos `category` y `tags` (array) al modelo de tarea en `db.json`
- Crear componentes `CategorySelector`, `TagInput`, `CategoryManager`
- Implementar autocompletado para etiquetas
- Considerar límite de etiquetas por tarea (ej: máximo 5)

## Mockups/Referencias

- Selector de categoría con colores en el formulario de tarea
- Input de etiquetas con autocompletado tipo "chips"
- Panel lateral con lista de categorías y etiquetas para filtrado rápido

