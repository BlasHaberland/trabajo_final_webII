# Trabajo Final - Web II
Este proyecto es una aplicación web interactiva llamada TrivEarth, diseñada como trabajo final para la materia Web II. La aplicación consiste en un juego de preguntas y respuestas relacionadas con países, utilizando datos obtenidos de la API de RestCountries.

## Requisitos
- Tener instalado Node.js y npm.
- Tener un servidor MySQL en funcionamiento.

## Info del juego
### Jugabilidad
- Al hacer click en "Empezar a jugar" empezara la partida.
- La partida consta de 10 preguntas de tres temas distintos (Nombre de capitales, Bandera de paises y cantidad de paiseslimitrofes).
- Al contestar cada pregunta, se le indica al jugador si la respuesta fue correcta o incorrecta (se muestra la opcion correcta).
- Al terminar de contestar las 10 preguntas, se le pide al jugador un nombre de usuario para guardar el puntaje.
- Se muestra ademas la cantidad de preguntas correctas e incorrectas.

### Lista de los mejores
- Desde el menu principal permite acceder a un top 20 de los mejores juadores.
- La lista se ordena primero por puntos, luego por cantidad de preguntas correctas y por ultimo el tiempo.

## Instalacion
1. Clonar el repositorio
```bash
   git clone https://github.com/tu-usuario/trabajo-final-webii.git
```
2. Acceder a la carpeta
```bash
cd trabajo-final-webii
```
3. Crea un archivo .env en la carpeta backend con el siguiente contenido:
```
PORT=3000
MYSQL_URI="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
```
- Reemplaza usuario, contraseña y nombre_base_datos con tus credenciales de MySQL.

4. Instala las dependencias
```
npm install
```
5. inicia el servidor
```
npm run dev
```

## Tecnologias usadas
### Frontend
- HTML5: Estructura de la aplicación.
- CSS3: Estilos personalizados y diseño responsivo.
- JavaScript: Lógica del juego y manejo de eventos.
- Bootstrap: Framework CSS para diseño y componentes.
  
### Backend
- Node.js: Entorno de ejecución para el servidor.
- Express.js: Framework para la creación de rutas y manejo de peticiones.
- MySQL: Base de datos para almacenar puntajes de los jugadores.
- dotenv: Manejo de variables de entorno.
- mysql2: Conexión con la base de datos MySQL.

### API
RestCountries: API utilizada para obtener datos de países (banderas, capitales, fronteras, etc.).  
**link**: `https://restcountries.com/`
