import { Manager } from 'socket.io-client'

export const connectToServer = (span: HTMLSpanElement) =>{
    // http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js'); //Asignar la url de la conexión

    const socket = manager.socket('/'); //Conectar al namespace /

    socket.on('connect', ()=>{
        span.innerHTML = 'Connected';
    })
    
    socket.on('disconnect', () =>{
        span.innerHTML = 'Disconnected';
    })
    console.log(socket);
}