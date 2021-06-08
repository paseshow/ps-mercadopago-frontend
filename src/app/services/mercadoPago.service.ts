import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataMercadoPago } from '../models/dataMercadoPago';

@Injectable({ providedIn: 'root' })
export class MercadoPagoService {

    constructor(
        private http: HttpClient
    ) { }

    getDataCuentaVinculada(eventId): Observable<DataMercadoPago> {
        return this.http.get<DataMercadoPago>(environment.url + 'security/' + eventId).pipe(take(1));
    };

    updateDataCuentaVinculada(dataUpdate: FormGroup) {
        return this.http.post(environment.url + 'security/update', dataUpdate.value).pipe(take(1));
    };
}