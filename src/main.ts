import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websockets</h1>

    <span>Offline</span>
  </div>
`
//Ejecutar conexión a websocket
connectToServer();
