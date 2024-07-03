import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatIcon } from "@angular/material/icon";
import {DataService} from "../../../core/services/data/data.service";
import {User} from "../../models/user";

/**
 * @description
 * Este componente maneja el modal de usuario.
 * Permite a los usuarios introducir y actualizar información del usuario.
 *
 * @usageNotes
 * Utilice este componente para mostrar un modal de usuario en la aplicación.
 *
 * @example
 * <app-user-modal></app-user-modal>
 */
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
export class UserModalComponent implements OnInit {

  /**
   * Formulario del usuario.
   */
  userForm!: FormGroup;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private dataService: DataService) {}

  /**
   * Inicializa el componente y configura el formulario del usuario.
   */
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

  /**
   * Cierra el modal de usuario.
   */
  close() {
    this.dialog.closeAll();
  }

  /**
   * Maneja el envío del formulario del usuario.
   * Si el formulario es válido, el modal se cierra.
   */
  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        rut:'6006939-5',
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        address: this.userForm.get('address')?.value,
        password: this.userForm.get('password')?.value,
        roles: [this.userForm.get('roles')?.value]
      };
      this.dataService.addUser(user).subscribe(rsp =>{
        console.log('usuario creado');
      })
      this.dialog.closeAll();
    }
  }
}
