import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ApiService } from './../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form !: FormGroup;
  telCount: number = 1;
  actionBtn : string = 'Save';

  constructor(
    private fb: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FormComponent>
    ) {}

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
      telephoneNumbers: this.fb.array([this.fb.control('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[0-9+]+$'),
      ])])
    }  );

    console.log(this.telephoneNumbers);
    

    for( let i = 1; i < this.telCount; i++ ) {
      this.onAddBtnClick();
    }

    if(this.editData) {
      this.telCount = this.editData.telephoneNumbers.length;
      this.actionBtn = 'Edit';     
      
      this.form.controls['firstName'].setValue(this.editData.firstName);
      this.form.controls['lastName'].setValue(this.editData.lastName);

      for ( let i = 1; i < this.telCount; i++ ) {
        this.onAddBtnClick();
      }

      for ( let i = 0; i < this.telCount; i++ ) {
        (<FormArray>this.form.get('telephoneNumbers')).controls[i].setValue(this.editData.telephoneNumbers[i]);
      }
    }; 
  }

  get telephoneNumbers() {
    return this.form.controls['telephoneNumbers'] as FormArray;
  }

  updateData() {
    this.api.editData(this.form.value, this.editData.id)
    .subscribe({
      next: (res) => {
        this.form.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating Data!')
      }
    })
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
    if (!this.editData) {
      if(this.form.valid) {
        this.api.postUser(this.form.value)
        .subscribe({
          next:(res)=>{
            this.form.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert('Error while adding user!')
          }
        })
      }
    } else {
      this.updateData();
    }
}
}
