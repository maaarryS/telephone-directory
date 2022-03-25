import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

export interface Users {
  firstName: string
  lastName: string
  telephoneNumber: string
}

export interface Users {
  firstName: string
  lastName: string
  telephoneNumber: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'test-program';

  constructor(private api : ApiService) {}

  telData: number
  
  index: number

  users: Users[] = [
    {firstName: 'Mariia', lastName: 'Sadova', telephoneNumber: '+3598844419'},
    {firstName: 'OLha', lastName: 'Budova', telephoneNumber: '+359884156159'},
    {firstName: 'Misha', lastName: 'Oleksin', telephoneNumber: '+3594916919'}
  ]

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{
        alert('Error while fetching the User!')
      }
    })
  }
    

}
