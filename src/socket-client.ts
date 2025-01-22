import { Manager, Socket } from 'socket.io-client'

export const connectToServer = (span: HTMLSpanElement) =>{
    // http://localhost:3000/socket.io/socket.io.js
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js'); //Asignar la url de la conexión

    const socket = manager.socket('/'); //Conectar al namespace /

    addListeners(socket);
}

const addListeners = (socket: Socket) =>{
    const serverStatusLabel = document.querySelector('#state')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const formMessage = document.querySelector('#message-form')!;
    const inputMessage = document.querySelector<HTMLInputElement>('#message-input')!;

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

    formMessage.addEventListener('submit', (event)=>{
        event.preventDefault();
        if (inputMessage.value.trim().length < 0) return; //Validar que haya contenido en el input

        //Emitir mensaje desde el cliente
        socket.emit('message-from-client', {id: 'Yo', message: inputMessage.value});

        //Vacíar input
        inputMessage.value = '';
    })
}