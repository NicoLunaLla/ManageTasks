# US-004: Exportar e Importar Tareas

## Historia de Usuario

**Como** usuario de ManageTasks  
**Quiero** poder exportar e importar mis tareas  
**Para** hacer respaldos, compartir con otras aplicaciones, o migrar mis datos

## Descripción

Los usuarios necesitan poder exportar sus tareas en diferentes formatos para respaldos, análisis externos, o integración con otras herramientas. También deben poder importar tareas desde archivos para facilitar la migración o carga masiva de datos.

## Criterios de Aceptación

### Exportar Tareas
- [ ] Debe permitir exportar todas las tareas del usuario
- [ ] Debe permitir exportar solo las tareas filtradas/seleccionadas
- [ ] Debe soportar múltiples formatos de exportación:
  - JSON (formato completo con todos los datos)
  - CSV (para análisis en Excel/Google Sheets)
  - TXT (formato legible para humanos)
- [ ] El archivo JSON debe incluir:
  - Todas las propiedades de las tareas
  - Metadatos de exportación (fecha, usuario)
- [ ] El archivo CSV debe incluir columnas: Descripción, Estado, Prioridad, Fecha, Categoría, Etiquetas
- [ ] El archivo TXT debe ser formateado de manera legible
- [ ] Debe mostrar un mensaje de éxito después de la exportación

### Importar Tareas
- [ ] Debe permitir seleccionar un archivo para importar
- [ ] Debe validar el formato del archivo antes de importar
- [ ] Debe mostrar un preview de las tareas que se van a importar
- [ ] Debe permitir elegir qué hacer con tareas duplicadas:
  - Saltar duplicados
  - Sobrescribir existentes
  - Crear nuevas (renombrar)
- [ ] Debe mostrar un resumen de la importación (cuántas se importaron, cuántas se saltaron)
- [ ] Debe validar que los datos importados sean correctos
- [ ] Debe mostrar errores específicos si hay problemas con el archivo

### Validación y Manejo de Errores
- [ ] Debe validar que el archivo JSON tenga la estructura correcta
- [ ] Debe validar que el CSV tenga las columnas requeridas
- [ ] Debe mostrar mensajes de error claros si el archivo es inválido
- [ ] Debe permitir cancelar la importación antes de completarla

## Prioridad

**Media** - Útil para respaldos y migración, pero no es crítica para el uso diario.

## Estimación

**13 puntos** - Requiere implementación de parsers, validación de datos, y UI para selección de archivos y preview.

## Notas Técnicas

- Usar `FileReader` API para leer archivos
- Implementar parser para CSV (considerar librería como `papaparse`)
- Validar estructura JSON con schema validation
- Usar `download` attribute o `Blob` API para descargar archivos
- Considerar límite de tamaño de archivo para importación

## Mockups/Referencias

- Botón "Exportar" en la vista de tareas con menú desplegable de formatos
- Botón "Importar" que abre un diálogo de selección de archivo
- Modal de preview antes de confirmar importación
- Mensajes de éxito/error después de exportar/importar

