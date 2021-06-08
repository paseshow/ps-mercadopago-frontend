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

    getReferencesMp(limit: number): Observable<ReferenceMp[]> {
        let param: any;

        if (limit) param = new HttpParams().set('limit', limit.toString());
        else param = new HttpParams();

        return this.http.get<ReferenceMp[]>(environment.url + `report/reservas`, { params: param }).pipe(take(1));
    }

}