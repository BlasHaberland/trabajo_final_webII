// Variables globales
const url = 'https://restcountries.com/v3.1/all';

const paises = [];
const paisesSeleccionados = [];
const preguntas = [];

// Funcion Inicializar

const Inicializar = async () =>  {

    //Hacer la carga de los paises en el array paises
    await cargarPaises();

    //Extraer 10 paises aleatorios
    extraerPaises(paises.length,10);
}


//Funciones generales

const cargarPaises = async () => {
    try {
        //LLamada a la api
        const respuesta = await fetch(url);

        //respuesta a formato json
        const paisesApi = await respuesta.json();

        //Guardar solo los paises que tengan capital en el array paises.
        for (const pais of paisesApi) {

            if (pais.capital === undefined) {
                continue;   // Si el pais no tiene capital, se saltea y pasa al siguiente
            }
            paises.push(pais);
        }

        
    } catch (error) {
        console.log(error);
    }
}

//Extraer países aleatorios (10)

const extraerPaises = (arrayLength, cantidad) => {

    let posicionesSeleccionadas = [];
    let posicionesDisponibles = Array.from({length: arrayLength}, (_,i) => i); // <- EXPLICAMELO FEDE;

    console.log(paises);
    for (let i = 0; i < cantidad; i++) {
     const indiceAleatorio = Math.floor(Math.random() * posicionesDisponibles.length);

     posicionesSeleccionadas.push(posicionesDisponibles[indiceAleatorio]);
     posicionesDisponibles.slice(indiceAleatorio,1); 
    }

    //extraer paises seleccionados
    posicionesSeleccionadas.forEach((posicion) => {
        paisesSeleccionados.push(paises[posicion]);
    });

   
}

