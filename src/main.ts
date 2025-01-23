import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websockets</h2>

    <div style="display: flex; flex-direction: column">
      <input id="jwtoken" placeholder="Json web Token"></input>
      <button id="btnConnect">Conectar</button>
    </div>

    <span id="state">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"></input>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`
//Ejecutar conexión a websocket
// connectToServer(<HTMLSpanElement>document.getElementById('state'));
const inputJwt = document.querySelector<HTMLInputElement>('#jwtoken')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btnConnect')!;

btnConnect.addEventListener('click', ()=>{
  if (inputJwt.value.trim().length <= 0) return alert('Enter a valid JWT');
  connectToServer(<HTMLSpanElement>document.getElementById('state'), inputJwt.value.trim());
})


