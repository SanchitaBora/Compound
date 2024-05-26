import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://raw.githubusercontent.com/SanchitaBora/Login/main/compound.json'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {}

  getall(): Observable<any> {
    return this.http.get(endpoint);
  }
}
