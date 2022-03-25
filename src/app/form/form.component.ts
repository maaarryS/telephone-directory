import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ApiService } from './../services/api.service';

export interface Users {
  firstName: string
  lastName: string
  telephoneNumber: []
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  form !: FormGroup;


  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group( {
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
      ]),
      telephoneNumbers: this.fb.array([])
    }  );
  }

  get telephoneNumbers() {
    return this.form.controls["telephoneNumbers"] as FormArray;
  }
  
  onAddBtnClick() {
    this.telephoneNumbers.push(this.fb.control('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.pattern('^[0-9+]+$'),
    ]))
  }

  onRemoveBtnClick(telNumIndex: number) {
    this.telephoneNumbers.removeAt(telNumIndex);
  }

  onSubmit() {
    
    console.log(this.form.value);

    if(this.form.valid) {
      this.api.postUser(this.form.value)
      .subscribe({
        next:(res)=>{
          alert('User added successfully!');
          this.form.reset()
        },
        error:()=>{
          alert('Error while adding user!')
        }
      })
    }
    
  

  
}
}
