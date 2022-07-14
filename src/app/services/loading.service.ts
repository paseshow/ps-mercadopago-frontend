import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private load: boolean;
  private subjectLoad: Subject<boolean> = new Subject();

  constructor() { }

  getLoader(): boolean {
    return this.load;
  };

  setLoader(load: boolean) {
    this.setSubject(load);
  };

  setSubject(load: boolean) {
    this.subjectLoad.next(load);
  };

  getSubject(): Observable<any> {
    return this.subjectLoad.asObservable();
  };
}