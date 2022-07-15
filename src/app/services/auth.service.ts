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

        let JsonLogin = {
            "username": formLogin.get("username").value,
            "password": formLogin.get("password").value,
        }
        // return this.http.post(environment.urlPaseShow + 'usuarios/authenticate', FormData.toString(), { headers: headers }).pipe(take(1));
        return this.http.post(environment.url + 'paseshow/authentication', JsonLogin).pipe(take(1));
    };

}