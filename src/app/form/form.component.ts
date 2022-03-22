import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

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

  submitted = false;

  userList: [];

  constructor(private fb: FormBuilder) {}

  form = this.fb.group( {
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
    let userData = JSON.stringify(this.form.value);
    this.submitted = true;
    console.log(this.userList);
    
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a super hero!');
      return false;
    } else {
      return console.log(userData);
    }
  }

  //ngOnInit(): void {}
}
