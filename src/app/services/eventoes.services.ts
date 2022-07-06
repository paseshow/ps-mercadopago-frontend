import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EventoesService {

    constructor(
        private http: HttpClient
    ) { }

    getEventos() {
        return this.http.get(environment.url + 'paseshow/eventos').pipe(take(1));
    }

}