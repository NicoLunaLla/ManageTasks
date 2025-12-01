# 🚀 ManageTasks – Proyecto Colaborativo (Git + GitHub)

## 👥 Integrantes del equipo
- **Nicolás Andrés Reyes Suárez**  
  - Usuario GitHub: *NicolasLunaL*  
  - Correo institucional: __________________  
  - ID Banner: __________________  

- **Nicolás Luna Llanos**  
  - Usuario GitHub: *NicoLunaLla*  
  - Correo institucional: __________________  
  - ID Banner: __________________  

---

## 📖 Descripción del proyecto
**ManageTasks** es una aplicación desarrollada en **React** para la gestión simple de tareas y usuarios.  
Este proyecto se construyó como parte de la actividad colaborativa del módulo **Mantenimiento de Software**, implementando versionamiento con Git y GitHub.

La aplicación permite:

- Registrar nuevas tareas  
- Listarlas y visualizarlas  
- Marcar tareas como completadas  
- Gestionar usuarios (simulados) asociados a dichas tareas  
- Consumir una API local mediante **json-server**

---

## 🚀 Cómo ejecutar el proyecto

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Ejecutar aplicación React

```bash
npm start
```

La aplicación se abrirá en:

```
http://localhost:3000
```

### 3️⃣ Iniciar servidor JSON (API local)

```bash
json-server --watch db.json --port 3001
```

El servidor estará disponible en:

```
http://localhost:3001
```
**Importante:** Asegúrate de que el archivo `db.json` esté en la raíz del proyecto y contenga una estructura inicial como la siguiente:

```json
{
  "users": [],
  "tasks": []
}
```
---

## 🧪 Funcionalidades implementadas (Historias de usuario)

### ✔ Historia 1 – Nicolás Luna  
**Como** usuario  
**Quiero** ver un mensaje de bienvenida  
**Para** entender rápidamente el propósito de la aplicación  

### ✔ Historia 2 – Nicolás Reyes  
**Como** usuario  
**Quiero** registrar nuevas tareas  
**Para** organizar mis pendientes  

### ✔ Historia 3 – Nicolás Luna  
**Como** usuario  
**Quiero** ver un listado de tareas registradas  
**Para** gestionarlas fácilmente  

### ✔ Historia 4 – Nicolás Reyes  
**Como** usuario  
**Quiero** poder marcar tareas como completadas  
**Para** distinguir entre pendientes y finalizadas  

### ✔ Historia 5 – Trabajo en equipo  
**Como** usuario avanzado  
**Quiero** gestionar usuarios asociados a tareas  
**Para** distribuir responsabilidades dentro del sistema  

---

## 🛠 Comandos Git utilizados

```bash
git clone <url>
git status
git add .
git commit -m "mensaje"
git push origin main
git branch
git checkout <rama>
git merge <rama>
git log --oneline
```

---

## 🤝 Colaboración del equipo

- Se utilizaron ramas individuales para implementar las historias de usuario.  
- Se realizaron commits identificando claramente el autor y la historia correspondiente.  
- Los cambios se integraron en la rama principal (**main**) usando `merge`.  
- La participación de cada integrante puede verificarse en la sección **Contributors** y en el historial de commits del repositorio.

---

## 📎 Enlaces

📌 **Repositorio del proyecto:**  
- https://github.com/NicoLunaLla/ManageTasks
- https://github.com/BR017/ManageTasks

---

## 📝 Notas adicionales

- Este proyecto es académico y está basado en *json-server* y *Create React App*.  
- Se recomienda instalar **json-server** globalmente si no está disponible:

```bash
npm install -g json-server
```

---

¡Gracias por visitar este repositorio! 🎉


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



