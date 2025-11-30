# US-001: Búsqueda y Filtrado Avanzado de Tareas

## Historia de Usuario

**Como** usuario de ManageTasks  
**Quiero** poder buscar y filtrar mis tareas por múltiples criterios  
**Para** encontrar rápidamente las tareas que necesito sin tener que revisar toda la lista

## Descripción

Los usuarios necesitan una forma eficiente de encontrar tareas específicas cuando tienen muchas tareas en su lista. La funcionalidad de búsqueda y filtrado avanzado permitirá buscar por texto, filtrar por múltiples criterios simultáneos y guardar filtros favoritos.

## Criterios de Aceptación

### Búsqueda por Texto
- [ ] Debe existir un campo de búsqueda en la vista de tareas
- [ ] La búsqueda debe ser en tiempo real (mientras el usuario escribe)
- [ ] Debe buscar en la descripción de la tarea
- [ ] La búsqueda debe ser case-insensitive
- [ ] Debe mostrar un mensaje cuando no hay resultados

### Filtros Múltiples
- [ ] Debe permitir filtrar por:
  - Estado (Sin iniciar, En proceso, Completada, Vencida, Por vencer)
  - Prioridad (Alta, Media, Baja)
  - Fecha de vencimiento (Hoy, Esta semana, Este mes, Vencidas, Sin fecha)
  - Tareas diarias (Sí/No)
- [ ] Los filtros deben poder combinarse
- [ ] Debe mostrar el número de tareas que coinciden con los filtros
- [ ] Debe tener un botón para limpiar todos los filtros

### Filtros Guardados
- [ ] Debe permitir guardar combinaciones de filtros como "filtros favoritos"
- [ ] Debe mostrar una lista de filtros guardados
- [ ] Debe permitir aplicar un filtro guardado con un clic
- [ ] Debe permitir eliminar filtros guardados

## Prioridad

**Alta** - Esta funcionalidad mejorará significativamente la experiencia del usuario cuando tenga muchas tareas.

## Estimación

**8 puntos** - Requiere implementación de UI, lógica de filtrado, y persistencia de filtros guardados.

## Notas Técnicas

- Implementar un componente `TaskSearch` y `TaskFilters`
- Usar `useMemo` para optimizar el filtrado
- Guardar filtros favoritos en localStorage o en la base de datos
- Considerar usar debounce para la búsqueda en tiempo real

## Mockups/Referencias

- Campo de búsqueda en la parte superior de la lista de tareas
- Panel de filtros colapsable en el sidebar
- Badge con contador de resultados filtrados

