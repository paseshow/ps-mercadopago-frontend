import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReferenceMp } from '../models/referneceMp.model';

@Injectable({ providedIn: 'root' })
export class ReferenceMpService {

    constructor(
        private http: HttpClient
    ) { }
    getReferenceMpByReservaId(reservaId): Observable<ReferenceMp> {
        return this.http.get<ReferenceMp>(environment.url + `refounds/${reservaId}`).pipe(take(1));
    };

}