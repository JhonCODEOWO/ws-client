import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websockets</h1>

    <span id="state">Offline</span>

    <form id="message-form">
      <input placeholder="message" id="message-input"></input>
    </form>

    <ul id="clients-ul">
      
    </ul>
  </div>
`
//Ejecutar conexión a websocket
connectToServer(<HTMLSpanElement>document.getElementById('state'));
