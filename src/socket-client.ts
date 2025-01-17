import { Manager } from 'socket.io-client'

export const connectToServer = () =>{
    // http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js'); //Asignar la url de la conexión

    const socket = manager.socket('/'); //Conectar al namespace /
    console.log(socket);
}