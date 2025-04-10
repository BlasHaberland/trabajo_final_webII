const btnEmpezarJuego = document.getElementById('btnEmpezarJuego');
const btnTop20 = document.getElementById('btnTop20');
const container = document.getElementById('container');
const badnerasImg = document.getElementById('cont-banderas');

// URL 
const urlLocal = 'http://localhost:3000/players';
const urlRemota = 'https://trabajo-final-webii.onrender.com/players';

let resBien = 0;
let resMal = 0;

let indexPreguntaActual = 0;
let puntos = 0;
let tiempoInicio;
let intervaloReloj;

// Función para obtener y mostrar el Top 20
async function mostrarTop20(lista) {
    try {
        const response = await fetch(urlLocal);
        if (!response.ok) {
            throw new Error(`Error al obtener el Top 20: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        const jugadores = data.jugadores;
        const topList = document.getElementById(lista);

        // Limpia la lista
        topList.innerHTML = '';

        // Crear el contenido del Top 20
        jugadores.forEach(player => {
            const listItem = document.createElement('li');

            // Crear el span para el nombre
            const nombreSpan = document.createElement('span');
            nombreSpan.className = 'nombre';
            nombreSpan.textContent = player.name;

            // Crear el span para los detalles (puntaje y segundos)
            const detallesSpan = document.createElement('span');
            detallesSpan.className = 'detalles';
            detallesSpan.textContent = `Puntaje: ${player.points}, Resp.correctas: ${player.correctsAnswer}, Segundos: ${player.seconds}`;

            // Agregar los spans al elemento li
            listItem.appendChild(nombreSpan);
            listItem.appendChild(detallesSpan);

            // Agregar el li a la lista
            topList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar el Top 20.');
    }
}

//Empezar a juar
if (btnEmpezarJuego) {
    btnEmpezarJuego.addEventListener('click', async () => {
        await Inicializar(); // LLenar variable 'preguntas'

        if (preguntas.length > 0) {
            btnEmpezarJuego.style.display = 'none';
            btnTop20.style.display = 'none';
            badnerasImg.style.display = 'none';

            reiniciarJuego();
            tiempoInicio = Date.now();
            iniciarReloj();

            console.log(`paises: ${cantidadDePaises}`)
            console.log(`preguntas: ${preguntas.length}`)
            mostrarPreguntas();
        } else {
            container.innerHTML = '<p>No hay preguntas disponibles</p>';
        }
    })
}

function mostrarPreguntas() {

    // Accion si se llega al final de las preguntas

    if (indexPreguntaActual >= preguntas.length) {
        clearInterval(intervaloReloj);
        const tiempoFinal = Math.floor((Date.now() - tiempoInicio) / 1000);

        container.innerHTML = `
        <p> Fin del juego. Puntaje final: ${puntos} puntos.</p>
        <p> Tiempo total: ${tiempoFinal} s. </p>

        <div class="resultados">
            <div class="resultado-correcto">
                <p>Correctas: ${resBien}</p>
            </div>
            <div class="resultado-incorrecto">
                <p>Incorrectas: ${resMal}</p>
            </div>
        </div>

       <div class="input-container">
        <input type="text" id="nombreJugador" placeholder="Ingrese su nombre">
        <button id="btnEnviarPuntaje" class="btn btn-success">Enviar puntaje</button>
    </div>`;


        console.log(resBien, resMal);
        document.getElementById('reloj').style.display = 'none';
        document.body.style.backgroundColor = '#005E54';


        //Envento al hacer click al boton enviar puntaje

        document.getElementById('btnEnviarPuntaje').addEventListener('click', () => {
            let nombreJugador = document.getElementById('nombreJugador').value;
            nombreJugador = nombreJugador.trim().toLowerCase();

            if (nombreJugador.trim() === '') {
                alert('Por favor ingrese el nombre del jugador para poder publicar el puntaje.');
            } else {

                fetch(urlLocal, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: nombreJugador,
                        points: puntos,
                        seconds: tiempoFinal,
                        correctsAnswer: resBien
                    })
                })

                    .then((res) => res.json())
                    .then((res) => console.log(res))

                console.log(`Enviando puntaje: ${nombreJugador} - ${puntos} puntos - cantidad de respuestas correctas ${resBien} - ${tiempoFinal} s.`);
                alert('Puntaje enviado con exito');
                btnEmpezarJuego.style.display = 'block';
                btnTop20.style.display = 'block';
                badnerasImg.style.display = 'block';
                container.innerHTML = '';
            }
        });

        return;
    }

    const pregunta = preguntas[indexPreguntaActual];

    container.innerHTML = `
    <h2 class= "pregunta">${pregunta.pregunta}</h2>
    <p> Pregunta ${indexPreguntaActual + 1} / ${preguntas.length}</p>
    <div id = "opciones"></div>`;

    if (pregunta.bandera) {
        const img = document.createElement('img');
        img.src = pregunta.bandera;
        img.className = 'img-thumbnail';
        img.alt = 'Bandera';
        img.classList.add('bandera');
        container.insertBefore(img, container.firstChild);
    }

    const opcionesDiv = document.getElementById('opciones');

    pregunta.opciones.forEach((opcion) => {
        const btn = document.createElement('button');
        btn.textContent = opcion;
        btn.addEventListener('click', () =>
            evaluarRespuesta(opcion, pregunta.respuestaCorrecta, pregunta.puntaje)
        );
        opcionesDiv.appendChild(btn);
    });
}

//Funciones auxiliares

function evaluarRespuesta(opcionSeleccionada, respuestaCorrecta, puntaje) {
    if (opcionSeleccionada === respuestaCorrecta) {
        cambiarColorRespuesta('#C2BB00');
        puntos += puntaje;
        resBien++;
        mostrarModal(`Sumaste <strong>+${puntaje} puntos</strong>.`, `Correcto!`);

    } else {
        cambiarColorRespuesta('#E1523D');
        resMal++;
        mostrarModal(`La respuesta correcta era: <strong>${respuestaCorrecta}</strong>`, `Incorrecto!`);
    }
    //indexPreguntaActual++;
    //mostrarPreguntas();
}


function iniciarReloj() {
    let reloj = document.getElementById('reloj');
    if (!reloj) {
        reloj = document.createElement('p');
        reloj.id = 'reloj';
        document.body.appendChild(reloj);
    }

    intervaloReloj = setInterval(() => {
        const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
        reloj.textContent = `Tiempo: ${tiempoTranscurrido} s.`;
    }, 1000);
}

function reiniciarJuego() {
    indexPreguntaActual = 0;
    puntos = 0; // Se reinicia el puntaje
    clearInterval(intervaloReloj); // se reinicia el reloj
    const reloj = document.getElementById('reloj');
    if (reloj) {
        reloj.textContent = `Tiempo: 0 s.`; // se reinicia el texto del reloj
    }
}

// Cambiar el color segun la respuesta
function cambiarColorRespuesta(color) {
    document.body.style.backgroundColor = color;
    setTimeout(() => {
        document.body.style.backgroundColor = '#005E54';
    }, 600);
}

// Mostrar el Top 20 al hacer clic en el botón 
if (btnTop20) {
    btnTop20.addEventListener('click', () => {
        window.location.href = 'top-20.html'
    });
}

// Modal
function mostrarModal(mensaje, solucion) {
    const mensajeModal = document.getElementById('mensajeModal');
    const tituloModal = document.getElementById('modalTitulo');

    mensajeModal.innerHTML = mensaje;
    tituloModal.innerHTML = solucion;
    const modalElement = document.getElementById('modalRespuesta');

    // muestro el modal usando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('modalRespuesta'), {
        backdrop: 'static',
        keyboard: false
    });
    modal.show();

    modalElement.addEventListener('hidden.bs.modal', () => {

        indexPreguntaActual++;
        mostrarPreguntas();
    }, { once: true });
}
