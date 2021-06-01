import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    login(formLogin: FormGroup) {

        const FormData = new HttpParams()
            .append('username', formLogin.get('username').value)
            .append('password', formLogin.get('password').value)

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(environment.urlPaseShow + 'usuarios/authenticate', FormData.toString(), { headers: headers }).pipe(take(1));
    };

}