import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RefundsService {

    constructor(
        private http: HttpClient
    ) { }

    overallRefunds(forms: FormGroup) {
        const HEADERS = new HttpHeaders();

        const body = {
            "idTransaccion": forms.get('idTransaccion').value,
            "motivo": forms.get('motivo').value,
            "idUser": localStorage.getItem('idUser'),
        };

        return this.http.post(environment.url + `refunds`, { body: body }).pipe(take(1));
    };

    refundsPartial(forms: FormGroup) {

        const BODY = {
            "idTransaccion": forms.get('idTransaccion').value,
            "motivo": forms.get('motivo').value,
            "idUser": localStorage.getItem('idUser'),
            "montoParcial": forms.get('montoParcial').value
        }

        return this.http.post(environment.url + 'refunds/partial', { body: BODY }).pipe(take(1));
    };
}