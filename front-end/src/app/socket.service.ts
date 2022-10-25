import { Injectable } from '@angular/core'
import { Socket, SocketIoConfig } from 'ngx-socket-io'
import { Observable } from 'rxjs'
import { SocketResponse } from "./model/socketSensorResponse"

@Injectable({ providedIn: 'root' })
export class SocketService {
    config: SocketIoConfig = {
        url: 'http://localhost:1884',
        options: {},
    }

    constructor(private socket: Socket) {
        this.socket.disconnect()
        this.socket = new Socket(this.config)
        this.checkStatus()
    }

    checkStatus(): void {
        this.socket.on('connect', () => {
            console.log('socket connected')
        })

        this.socket.on('disconnect', () => {
            console.log('socket disconnected')
        })
    }

    listen(event: string): Observable<SocketResponse> {
        return this.socket.fromEvent(event)
    }

    sendArduino(socketResponse: SocketResponse): void {
        this.socket.emit('arduino', socketResponse)
    }
}
