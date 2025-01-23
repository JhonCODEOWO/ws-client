import { Manager, Socket } from 'socket.io-client'

let socket: Socket;
let manager: Manager;
export const connectToServer = (span: HTMLSpanElement, token: string) =>{
    // http://localhost:3000/socket.io/socket.io.js
    manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            token: token
        }
    }); //Asignar la url de la conexión

    socket?.removeAllListeners(); //Eliminar todos los listeners anteriores asignados a este objeto
    socket = manager.socket('/'); //Conectar al namespace /
    console.log(socket);
    addListeners(); //Añadir listeners nuevos
}

const addListeners = () =>{
    const clientsUl = document.querySelector('#clients-ul')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector('#state')!;

    //TODO: #clients-ul
    socket.on('clients-updated', (clients: string[])=>{
        let clientsHTML = ``;
        clients.forEach(clientId => {
            clientsHTML +=  `<li>${clientId}</li>`;
        })
        clientsUl.innerHTML = clientsHTML;
    })


    socket.on('connect', ()=>{
        serverStatusLabel.innerHTML = 'Connected';
    })
    
    socket.on('disconnect', () =>{
        serverStatusLabel.innerHTML = 'Disconnected';
    })

    socket.on('message-from-server', (payload: { fullName: String, message: string})=>{
        console.log(payload);
        let {fullName, message} = payload;

        messagesUl.innerHTML += `<li>${fullName}: ${message}</li>`
    })
}