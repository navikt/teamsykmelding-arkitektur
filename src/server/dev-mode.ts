import { randomUUID } from 'crypto'
import { ServerWebSocket } from 'bun'

const devModeUuid = Bun.env.NODE_ENV === 'production' ? null : randomUUID()

export async function devModeMessageHandler(ws: ServerWebSocket, message: string | Buffer): Promise<void> {
    if (message === 'whoareyou') {
        ws.send(devModeUuid ?? '')
    }
}

export const devModeBrowserScript = /* language=JavaScript */ `let webSocket = null;
let initialDevUUID = null;

setInterval(() => {
    if (webSocket == null) return;

    webSocket.send('whoareyou')
}, 1000)

webSocket = webSockIt()

function webSockIt() {
    console.info("Setting up dev reload socket")

    webSocket = new WebSocket('ws://localhost:3000/dev')
    webSocket.onerror = () => {
        setTimeout(() => {
            webSocket = webSockIt()
        }, 500)
    }

    webSocket.onclose = () => {
        setTimeout(() => {
            webSocket = webSockIt()
        }, 500)
    }
    webSocket.onmessage = (event) => {
        if (initialDevUUID == null) {
            initialDevUUID = event.data
            return;
        }

        if (initialDevUUID !== event.data) {
            console.log('Hot reloading')
            window.location.reload()
        }
    }

    return webSocket;
}
`
