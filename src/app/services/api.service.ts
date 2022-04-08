import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("http://localhost:3000/users/", data);
  }

  getUser() {
    return this.http.get<any>("http://localhost:3000/users/");
  }

  editData(data: any, id:number) {
    return this.http.put<any>("http://localhost:3000/users/"+id, data)
  }

  deleteData(id:number) {
    return this.http.delete<any>("http://localhost:3000/users/"+id)
  }
}
