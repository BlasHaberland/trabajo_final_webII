// Variables globales
const url = 'https://restcountries.com/v3.1/all';

const paises = [];
const paisesSeleccionados = [];
const preguntas = [];

// Funcion Inicializar

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

cargarPaises();