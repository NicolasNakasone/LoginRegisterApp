# LoginRegisterApp

Esta es una aplicación simple para registro e inicio de sesión de usuarios, implementada con React, TypeScript, Express y una base de datos SQL (usando Sequelize). La aplicación incluye validación de contraseñas y manejo de tokens JWT para la autenticación de usuarios.

## Funcionalidades

- Registro de usuarios
- Inicio de sesión de usuarios
- Restablecimiento de contraseñas
- Validación de contraseñas con requisitos específicos (mayúsculas, minúsculas, números y caracteres especiales)
- Manejo de errores de autenticación y validación
- Envío de correos electrónicos para restablecimiento de contraseñas

## Requisitos

- Node.js
- npm
- Una base de datos SQL (MySQL, PostgreSQL, etc.)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/LoginRegisterApp.git
   cd LoginRegisterApp
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tucontraseña
   DB_NAME=nombre_base_datos
   JWT_SECRET=tu_jwt_secreto
   EMAIL_HOST=smtp.tucorreo.com
   EMAIL_PORT=587
   EMAIL_USER=tuemail@tucorreo.com
   EMAIL_PASSWORD=tucontraseña
   ```

4. Ejecuta las migraciones de la base de datos:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

- `src/`
  - `controllers/`: Controladores de las rutas de la aplicación.
    - `authController.ts`: Controlador para autenticación de usuarios.
    - `resetPasswordController.ts`: Controlador para restablecimiento de contraseñas.
  - `models/`: Modelos de Sequelize para la base de datos.
    - `User.ts`: Modelo de usuario.
  - `routes/`: Definición de las rutas de la API.
    - `authRoutes.ts`: Rutas para autenticación.
    - `resetPasswordRoutes.ts`: Rutas para restablecimiento de contraseñas.
  - `services/`: Servicios para lógica de negocio.
    - `emailService.ts`: Servicio para envío de correos electrónicos.
  - `utils/`: Utilidades y helpers.
    - `validators.ts`: Validadores para contraseñas y otras entradas.
  - `index.ts`: Punto de entrada principal de la aplicación.

## Uso

- Para registrar un nuevo usuario, envía una solicitud `POST` a `/api/auth/register` con los campos `email`, `password`, y `full_name`.
- Para iniciar sesión, envía una solicitud `POST` a `/api/auth/login` con los campos `email` y `password`.
- Para solicitar un restablecimiento de contraseña, envía una solicitud `POST` a `/api/auth/reset-password` con el campo `email`.
- Para restablecer la contraseña, envía una solicitud `POST` a `/api/auth/reset-password/confirm` con los campos `token` y `newPassword`.

## Notas

- Asegúrate de tener la base de datos configurada y en funcionamiento antes de iniciar la aplicación.
- La validación de contraseñas requiere al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
