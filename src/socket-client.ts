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

const formSubmitListener = (event: Event) => {
    const inputMessage = document.querySelector<HTMLInputElement>('#message-input')!;
    event.preventDefault();
    if (inputMessage.value.trim().length <= 0) return; // Validar que haya contenido en el input

    // Emitir mensaje desde el cliente
    socket.emit('message-from-client', { message: inputMessage.value });

    // Vaciar input
    inputMessage.value = '';
};

const addListeners = () => {
    const clientsUl = document.querySelector('#clients-ul')!;
    const formMessage = document.querySelector('#message-form')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector('#state')!;

    // Listener para actualizar clientes
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHTML = '';
        clients.forEach(clientId => {
            clientsHTML += `<li>${clientId}</li>`;
        });
        clientsUl.innerHTML = clientsHTML;
    });

    // Listener para estado de conexión
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected';
    });

    // Listener para mensajes del servidor
    socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
        const { fullName, message } = payload;
        messagesUl.innerHTML += `<li>${fullName}: ${message}</li>`;
    });

    // **Eliminar listener existente antes de agregarlo**
    formMessage.removeEventListener('submit', formSubmitListener); // Evita duplicados
    formMessage.addEventListener('submit', formSubmitListener); // Agrega nuevo listener
};