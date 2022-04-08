import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
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
  displayedColumns: string[] = ['firstName', 'lastName', 'telephoneNumbers', 'action'];
  dataSource!: MatTableDataSource<any>;

  isFullVer$: Observable<boolean>;

  constructor(
    private api : ApiService, 
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
    ) {}

  ngOnInit() {

    if (this.breakpointObserver.isMatched('(max-width : 800px)')) {
      console.log('The screen width is less than 800px');
    }
    this.isFullVer$ = this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape])
      .pipe(map(({ matches }) => matches));
    this.getAllUsers();

    
  }

  openDialog() {
    this.dialog.open(FormComponent, {
      width: '40%'
    })
    .afterClosed()
    .subscribe(
      val => {
        if(val === 'save') {
          this.getAllUsers();
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers() {
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
      },
      error:()=>{
        alert('Error while fetching the User!')
      }
    })
  }
    
  editData(user: any) {
    this.dialog.open(FormComponent, {
      width: '40%',
      data: user,
    })
    .afterClosed()
    .subscribe(val => {
      if (val === 'update') {
        this.getAllUsers();
      }
    })
    
  }

  deleteData(id: number) {
    this.api.deleteData(id)
    .subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: () => {
        alert('Product cannot be deleted!');
      }
    })
  }

}
