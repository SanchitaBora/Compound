import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/compounds'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {}

  getall(): Observable<any> {
    return this.http.get(endpoint);
  }

}

export class CompoundService {

  private apiUrl = 'http://localhost:3000/compounds';

  constructor(private http: HttpClient) {}

  deleteCompound(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
