import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketIoService extends Socket {

    outEven: EventEmitter<any> = new EventEmitter();

    constructor() {
        super({
            url: environment.url,
            options: {
                query: {
                    reservaId: 12345
                }
            }
        });

        // RECIBE EVENTO DEL BACK
        this.ioSocket.on('event', res => this.outEven.emit(res));
    }

    // EMITE EVENTO AL BACK
    emitEvent = (payload = {}) => {
        this.ioSocket.emit('event', payload);
    };

}