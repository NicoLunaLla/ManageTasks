# Comenzando con Create React App

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Comandos disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará automáticamente cuando hagas cambios.  
También puedes ver errores de lint en la consola.

### `npm test`

Lanza el ejecutor de pruebas en modo interactivo.  
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.  
Agrupa correctamente React en modo producción y optimiza el build para el mejor rendimiento.

El build será minificado y los nombres de archivo incluirán hash.  
¡Tu app estará lista para ser desplegada!

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

### `npm run eject`

**Nota: esta es una operación irreversible. Una vez ejecutes `eject`, no podrás volver atrás.**

Si no estás satisfecho con la configuración del build y las herramientas incluidas, puedes ejecutar `eject` en cualquier momento.  
Este comando moverá todas las configuraciones (webpack, Babel, ESLint, etc.) directamente a tu proyecto para que tengas control total.

Todos los comandos seguirán funcionando, pero ahora serán locales al proyecto.  
A partir de ese punto, tú serás responsable del mantenimiento de esas configuraciones.

No necesitas usar `eject` nunca. La configuración predeterminada es suficiente para la mayoría de los proyectos pequeños y medianos.  
Sin embargo, la opción existe si necesitas personalizar en profundidad.

## Más información

Puedes aprender más en la [documentación oficial de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, visita la [documentación de React](https://reactjs.org/).

### División de Código (Code Splitting)

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Análisis del Tamaño del Bundle

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Crear una Aplicación Web Progresiva (PWA)

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuración Avanzada

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Despliegue

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` falla al minificar

Esta sección se ha movido aquí:  
[https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Iniciar la base de datos (json-server)

Este proyecto utiliza [json-server](https://github.com/typicode/json-server) para simular una API REST local.

### Instalación (una sola vez)

Si no tienes `json-server` instalado globalmente, puedes hacerlo con:

```bash
npm install -g json-server
```

O como dependencia de desarrollo en el proyecto:

```bash
npm install json-server --save-dev
```

### Ejecutar el servidor de base de datos

Desde la raíz del proyecto, ejecuta el siguiente comando:

```bash
npx json-server --watch db.json --port 3001
```

Esto iniciará un servidor en:  
🔗 [http://localhost:3001](http://localhost:3001)

Tu aplicación React se conecta a esta API para consultar, crear, editar y eliminar tareas y usuarios.

---

**Importante:** Asegúrate de que el archivo `db.json` esté en la raíz del proyecto y contenga una estructura inicial como la siguiente:

```json
{
  "users": [],
  "tasks": []
}
```
