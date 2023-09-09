const botonincio = document.getElementById("inicioJuego")
botonincio.addEventListener("click", () =>{ 
    juego.inicio()

})


const tablero = (() =>{
    let numerosTablero  = ["","","","","","","","","",]
    
    const renderizado = () =>{
        let contenedor = "";
        numerosTablero.forEach((cuadrado, index)=>{
            contenedor += `<div class="cuadrado" id="cuadrado-${index}">${cuadrado}</div>`
        })
        document.getElementById("contenedor").innerHTML = contenedor
        const cuadrado = document.querySelectorAll(".cuadrado")
        cuadrado.forEach((cuadro)=>{
            cuadro.addEventListener("click", juego.handlecuadrado)
   
        })
        
    }
    const actualizarTablero =(index, valor)=>{
        numerosTablero[index] = valor
        renderizado()
    }
   const getTablero = () => numerosTablero

   
    return {
        renderizado,
        actualizarTablero,
        getTablero 
        
    }
  
})()

const crearJugadores = ((nombre, marca)=>{
    return{
        nombre,
        marca
    }
})

const juego = (() =>{
    let indexJugador;
    let JuegoTerminado;
    let jugadores;
     const inicio = ()=> {
        jugadores = [crearJugadores(document.getElementById("jugador1").value , "X"),
                     crearJugadores(document.getElementById("jugador2").value, "O")]
        JuegoTerminado = false;
        indexJugador = 0;
        tablero.renderizado()
        const cuadrado = document.querySelectorAll(".cuadrado")
        cuadrado.forEach((cuadro)=>{
            cuadro.addEventListener("click", handlecuadrado)
   
        })
     }
    
     const handlecuadrado = (event) =>{
            
            const indexcuadrado = parseInt(event.target.id.split("-")[1])
            
            if(tablero.getTablero()[indexcuadrado] !=="")
              return;
         
            tablero.actualizarTablero(indexcuadrado, jugadores[indexJugador].marca ) 

            if (jugadorGanador(tablero.getTablero(), jugadores[indexJugador].marca)){
                JuegoTerminado = true;
                alert(`${jugadores[indexJugador].nombre} ha ganado`)
                console.log("render209")
            }
            else if(empatados(tablero.getTablero())){
                JuegoTerminado = true;
                alert("empate")
            }
            indexJugador = indexJugador === 0 ? 1 : 0
                   
            
     }
     const Reinicio =()=>{
        for (let i = 0; i < 9; i ++ ){
            tablero.actualizarTablero(i, "")
        }
        tablero.renderizado()

   
     }
    
     return{
        inicio,
        handlecuadrado,
        Reinicio
     }

})()

const botonreinicio = document.getElementById("reinicio")
botonreinicio.addEventListener("click", ()=>{
    juego.Reinicio()
})

function jugadorGanador(array) {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2]
    ]
    for(let i = 0; i < combinacionesGanadoras.length; i++){
        const [a, b, c] = combinacionesGanadoras[i]
        if(array[a] && array[a] === array[b] && array[a] === array[c]){
           console.log("hola")
        return true      
        }    
    }
    return false
}

function empatados(array){
    return array.every(cuadro => cuadro !== "")

}