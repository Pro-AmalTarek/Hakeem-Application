import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  private _url(apiRoute: string) {
    return environment.baseUrl + apiRoute;
  }
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')};

  public CallAllamAPI(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(this._url("/nlp/allam-prompt"), userData, this.headers);
  }

}
