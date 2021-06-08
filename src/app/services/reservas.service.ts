import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reservas.model';

@Injectable({ providedIn: 'root' })
export class ReservasService {

    constructor(
        private http: HttpClient
    ) { }

    getReservaByWhere(formWhere: FormGroup): Observable<Reserva[]> {

        const options = {
            where: formWhere.value
        };

        return this.http.put<Reserva[]>(environment.url + 'reservas', options).pipe(take(1));
    };
}