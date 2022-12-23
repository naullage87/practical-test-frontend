import { CityElements } from './city.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { backend } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  getCityList(): Observable<CityElements[]>{
    const href = backend;
    let headers_object = new HttpHeaders();
    const currentUser = localStorage.getItem('access_token');
    headers_object = headers_object.append('Content-Type', 'application/json')
    const httpOptions = {
        headers: headers_object
    };
    return this.httpClient.get<CityElements[]>(`${href}city/cityList`,httpOptions);
  }

  editCity(city){
    const href = backend;
    this.httpClient.post<CityElements[]>(`${href}city/updateCity`, city)
    .subscribe(data => city);
  }
}
