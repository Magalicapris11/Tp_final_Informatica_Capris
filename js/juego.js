// Carta
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;


// Función para inicializar el mazo (simula un mazo infinito)
function inicializarMazo() {
    return [
        { valor: 5, imagen: 'img/cartas/1.jpg' },
        { valor: 5, imagen: 'img/cartas/2.jpg' },
        { valor: 5, imagen: 'img/cartas/3.jpg' },
        { valor: 5, imagen: 'img/cartas/4.jpg' },
        { valor: 5, imagen: 'img/cartas/5.jpg' },
        { valor: 4, imagen: 'img/cartas/6.jpg' },
        { valor: 4, imagen: 'img/cartas/7.jpg' },
        { valor: 4, imagen: 'img/cartas/8.jpg' },
        { valor: 4, imagen: 'img/cartas/9.jpg' },
        { valor: 4, imagen: 'img/cartas/10.jpg' },
        { valor: 3, imagen: 'img/cartas/11.jpg' },
        { valor: 3, imagen: 'img/cartas/12.jpg' },
        { valor: 3, imagen: 'img/cartas/13.jpg' },
        { valor: 3, imagen: 'img/cartas/14.jpg' },
        { valor: 3, imagen: 'img/cartas/15.jpg' },
        { valor: 2, imagen: 'img/cartas/16.jpg' },
        { valor: 2, imagen: 'img/cartas/17.jpg' },
        { valor: 2, imagen: 'img/cartas/18.jpg' },
        { valor: 1, imagen: 'img/cartas/19.jpg' },
        { valor: 1, imagen: 'img/cartas/20.jpg' }
    ];
}

// Inicializar el mazo globalmente (siempre se repone cuando se acaba)
let mazo = inicializarMazo();

let jugador1 = {
    id: 1,
    carta: null,
    puntaje: 0,
    turnosGanados: 0
};
let jugador2 = { // IA
    id: 2,
    carta: null,
    puntaje: 0,
    turnosGanados: 0
};

// Estado del juego
let numeroTurnoActual = 1;
let numeroRondaActual = 0;
const maxTurnos = 3;
const puntosParaGanarTurno = 30;

// Elementos HTML
const jugador1CartaImg = document.getElementById('jugador1-carta0-img');
const jugador2CartaImg = document.getElementById('jugador2-carta0-img');
const puntajeJugador1Span = document.getElementById('puntaje-jugador1');
const puntajeJugador2Span = document.getElementById('puntaje-jugador2');
const turnoResultadoH4 = document.getElementById('turno-resultado');
const reiniciarJuegoBtn = document.getElementById('reiniciar-juego');
const repartirCartasBtn = document.getElementById('repartir-cartas');
const mazoImg = document.querySelector('.mazo');
const nuevoTurnoBtn = document.getElementById('nuevo-turno');

// Funciones
function iniciarJuego() {
    barajarMazo();
    repartirCartas();
    repartirCartasBtn.classList.add('d-none');
    reiniciarJuegoBtn.classList.add('d-none');
}

function finDelJuego() {
    let ganadorFinal = "";
    if (jugador1.turnosGanados > jugador2.turnosGanados) {
        ganadorFinal = "Jugador 1 (¡Tú!)";
    } else if (jugador2.turnosGanados > jugador1.turnosGanados) {
        ganadorFinal = "Jugador 2 (IA)";
    } else {
        ganadorFinal = "Empate";
    }

    turnoResultadoH4.textContent = `¡Juego terminado! Ganador final: ${ganadorFinal}.`;
    reiniciarJuegoBtn.classList.remove('d-none');
}

function barajarMazo() {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
}

function repartirCartas() {
    // Si quedan menos de 2 cartas, repone el mazo (para simular un mazo infinito)
    if (mazo.length < 2) {
        mazo = inicializarMazo();
        barajarMazo();
    }
    jugador1.carta = null;
    jugador2.carta = null;

    // Verificar si las cartas ya han sido repartidas
    if (jugador1.carta || jugador2.carta) {
        turnoResultadoH4.textContent = "Las cartas ya han sido repartidas.";
        return;
    }

    jugador1.carta = mazo.pop();
    jugador2.carta = mazo.pop();

    // Mostrar las cartas como dorso hasta que se decida revelar
    jugador1CartaImg.src = 'img/atras _carta.png';
    jugador2CartaImg.src = 'img/atras _carta.png';
}

function mostrarCarta(jugador) {
    // Verificar si las cartas han sido repartidas
    if (!jugador1.carta || !jugador2.carta) {
        turnoResultadoH4.textContent = "Debes repartir las cartas primero.";
        return;
    }

    if (jugador === 1) {
        jugador1CartaImg.src = jugador1.carta.imagen;
        jugador2CartaImg.src = jugador2.carta.imagen; // Revelar automáticamente la carta de la IA
        compararCartas(); // Llamar a compararCartas aquí
    }
}

// Función para comparar las cartas y determinar el ganador
function compararCartas() {
    numeroRondaActual++;
    let resultado = "";

    if (jugador1.carta.valor > jugador2.carta.valor) {
        jugador1.puntaje += jugador1.carta.valor;
        resultado = "Ganaste esta ronda.";
    } else if (jugador2.carta.valor > jugador1.carta.valor) {
        jugador2.puntaje += jugador2.carta.valor;
        resultado = "La IA ganó esta ronda.";
    } else {
        manejarEmpate();
        resultado = "Empate en esta ronda.";
    }

    actualizarInterfaz();
    turnoResultadoH4.textContent = resultado;

    // Verificar si se alcanzaron 30 puntos para habilitar el botón de nuevo turno
    if (jugador1.puntaje >= puntosParaGanarTurno || jugador2.puntaje >= puntosParaGanarTurno) {
        nuevoTurnoBtn.classList.remove('d-none'); // Habilitar botón
        repartirCartasBtn.classList.add('d-none'); // Ocultar botón de repartir
    } else {
        repartirCartasBtn.classList.remove('d-none');
        jugador1.carta = null;
        jugador2.carta = null;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar puntajes y turnos
    puntajeJugador1 = 0;
    puntajeJugador2 = 0;
    numeroTurnoActual = 1;
    numeroRondaActual = 0;
    jugador1.puntaje = 0;
    jugador1.turnosGanados = 0;
    jugador2.puntaje = 0;
    jugador2.turnosGanados = 0;

    // Restablecer visualmente puntajes
    puntajeJugador1Span.textContent = '0';
    puntajeJugador2Span.textContent = '0';
    turnoResultadoH4.textContent = '';

    // Vaciar la tabla de puntajes
    const tablaBody = document.querySelector('#tabla-puntajes tbody');
    tablaBody.innerHTML = '';

    // Restablecer cartas a su estado inicial (boca abajo)
    jugador1CartaImg.src = './img/atras _carta.png';
    jugador2CartaImg.src = './img/atras _carta.png'

   


    // Reiniciar mazo
    mazo = inicializarMazo();
}
function actualizarInterfaz() {
    // Usamos requestAnimationFrame para forzar una actualización inmediata
    requestAnimationFrame(() => {
        // Actualizamos directamente los elementos del DOM
        puntajeJugador1Span.textContent = jugador1.puntaje;
        puntajeJugador2Span.textContent = jugador2.puntaje;

        // Si las cartas están disponibles, las mostramos
        if (jugador1.carta && jugador2.carta) {
            jugador1CartaImg.src = jugador1.carta.imagen;
            jugador2CartaImg.src = jugador2.carta.imagen;
        }

        console.log("Interfaz actualizada: Puntaje Jugador:", jugador1.puntaje, "Puntaje IA:", jugador2.puntaje);
    });
}

function manejarEmpate() {
    console.log("Empate en esta ronda. No se suman puntos.");
    turnoResultadoH4.textContent = "Empate en esta ronda.";
}

function iniciarJuego() {
    barajarMazo();
    repartirCartas();
    repartirCartasBtn.classList.add('d-none');
    reiniciarJuegoBtn.classList.add('d-none');
   ;
}
//  CONTADOR DE TURNOS 3
 let contadorDeTurnos = 0; // Contador para los turno

    function finDeTurno(ganador) {
        turnoResultadoH4.textContent = `Turno ${numeroTurnoActual} ganado por Jugador ${ganador}.`;
        if (ganador === 1) {
            jugador1.turnosGanados++;
        } else {
            jugador2.turnosGanados++;
        }
    
        console.log("Fin de turno. Puntaje Jugador 1:", jugador1.puntaje);
        console.log("Fin de turno. Puntaje Jugador 2:", jugador2.puntaje);
    
        numeroTurnoActual++;
        numeroRondaActual = 0;
        contadorDeTurnos++;
         // Verificar si es el tercer turno
    if (contadorDeTurnos >= 2) {
        nuevoTurnoBtn.classList.remove('d-none'); // Mostrar el botón después de 2 turnos
    }
    
        // Restablecer puntajes para el nuevo turno
        jugador1.puntaje = 0;
        jugador2.puntaje = 0;
        actualizarInterfaz(); // 🔴 Esto asegurará que los puntajes en pantalla se actualicen
    
        // Condición para finalizar el juego o continuar
        if (jugador1.turnosGanados >= 2 || jugador2.turnosGanados >= 2 || numeroTurnoActual > maxTurnos) {
            finDelJuego();
        } else {
            repartirCartas();
        }
    }// Evento para el botón de nuevo turno
nuevoTurnoBtn.addEventListener('click', function() {
    finDeTurno(jugador1.puntaje >= puntosParaGanarTurno ? 1 : 2);
    
    // Ocultar el botón después de hacer clic
    nuevoTurnoBtn.classList.add('d-none');
    repartirCartasBtn.classList.remove('d-none'); // Mostrar el botón para repartir cartas nuevamente
});
    // Elemento de la tabla
const tablaPuntajes = document.getElementById('tabla-puntajes').querySelector('tbody');


// Modifica la función finDeTurno para actualizar la tabla
// Función para fin de turno
function finDeTurno(ganador) {
    turnoResultadoH4.textContent = `Turno ${numeroTurnoActual} ganado por Jugador ${ganador}.`;

    if (ganador === 1) {
        jugador1.turnosGanados++;
    } else {
        jugador2.turnosGanados++;
    }

    console.log("Fin de turno. Puntaje Jugador 1:", jugador1.puntaje);
    console.log("Fin de turno. Puntaje Jugador 2:", jugador2.puntaje);

    numeroTurnoActual++;
    numeroRondaActual = 0;

    // Si es el tercer turno
    if (numeroTurnoActual > 2) {
        nuevoTurnoBtn.classList.remove('d-none'); // Mostrar el botón después del tercer turno
        reiniciarJuegoBtn.classList.remove('d-none'); // Habilitar el botón de reiniciar
    }

    // Restablecer puntajes para el nuevo turno
    jugador1.puntaje = 0;
    jugador2.puntaje = 0;
    actualizarInterfaz();

    // Condición para finalizar el juego o continuar
    if (jugador1.turnosGanados >= 2 || jugador2.turnosGanados >= 2 || numeroTurnoActual > maxTurnos) {
        finDelJuego();
    } else {
        repartirCartas();
    }
}
function finDelJuego() {
    console.log("Juego finalizado"); // 👉 Ver si se ejecuta
    let ganadorFinal = "";
    if (jugador1.turnosGanados > jugador2.turnosGanados) {
        ganadorFinal = "Jugador 1 (¡Tú!)";
    } else if (jugador2.turnosGanados > jugador1.turnosGanados) {
        ganadorFinal = "Jugador 2 (IA)";
    } else {
        ganadorFinal = "Empate";
    }

    turnoResultadoH4.textContent = `¡Juego terminado! Ganador final: ${ganadorFinal}.`;
    reiniciarJuegoBtn.classList.remove('d-none'); // Intenta remover la clase
    reiniciarJuegoBtn.style.display = 'block'; // Asegurar que se muestre

}
