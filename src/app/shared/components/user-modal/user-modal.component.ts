import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatGridList,
    MatGridTile,
    MatDatepickerToggle,
    MatDatepicker,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerInput,
    MatIcon
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent implements OnInit{

  userForm!: FormGroup;

  constructor(private dialog:MatDialog,private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }


  close(){
    this.dialog.closeAll();
  }


  onSubmit() {
    if (this.userForm.valid) {
      this.dialog.closeAll();
    }
  }
}
