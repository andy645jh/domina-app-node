
# Microservicios con NodeJs

Este proyecto está compuesto por tres aplicaciones:

- `domina-app-back-task`: Aplicación del microservicio de tareas, ocupa el puerto  **3001**
- `domina-app-back-user`: Aplicación del microservicio de usuario, ocupa el puerto **3002**.
- `domina-app-front`: Aplicación frontend que usa los microservicios nombrados anteriormente, se ejecuta en el puerto **3005**.

---

## 🚀 Instalación y ejecución

### Base de datos

Para esta prueba se uso mysql como base de datos, se creo una base de datos llamada domina_db. En la carpeta sql_scripts se encuentran los queries para crear cada tabla.
Es necesario crear la base de datos y las tablas antes de ejecutar el proyecto.

En caso de ser necesario modificar algun dato relacionado con la base de datos, dentro de `domina-app-back-task` y `domina-app-back-user` existe la carpeta config.js en ella se puede modificar los datos relacionados a la base de datos.

### 📁 Aplicación `domina-app-back-task`

    cd domina-app-back-task
    npm install
    npm run start

ℹ️ Asegurate de que el puerto **3001** esté disponible antes de iniciar.

----------

### 📁 Aplicación `domina-app-back-user`

 cd domina-app-back-user
 npm install
 npm run start

ℹ️ Asegurate de que el puerto **3002** esté disponible antes de iniciar.

----------

### 📁 Aplicación `domina-app-front`

 cd domina-app-front
 npm install
 npm start

🔗 Una vez iniciado, automaticamente se abrira una ventana en el navegado con direccion: [http://localhost:3005](http://localhost:3005)
