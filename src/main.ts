import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websockets</h1>

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
connectToServer(<HTMLSpanElement>document.getElementById('state'));
