import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("http://localhost:3000/userList/", data);
  }

  getUser() {
    return this.http.get<any>("http://localhost:3000/userList/");
  }
}
