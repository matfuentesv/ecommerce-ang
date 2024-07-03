import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { AuthService } from "../../../core/services/auth/auth.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { NgClass, NgIf } from "@angular/common";
import {User} from "../../../shared/models/user";
import {DataService} from "../../../core/services/data/data.service";
import {RutValidatorDirective} from "../../../shared/directives/ng2-rut/rut-validator.directive";
import {Ng2Rut2} from "../../../shared/directives/ng2-rut/ng2-rut.module";
import Swal from 'sweetalert2';
/**
 * @description
 * Este componente maneja la actualización de la información de la cuenta del usuario.
 * Permite al usuario ver y editar sus datos personales, incluyendo el nombre, el correo electrónico, el teléfono, la dirección y la contraseña.
 *
 * @usageNotes
 * Este componente debe ser utilizado dentro del módulo de cuenta de usuario.
 *
 * @example
 * <app-account></app-account>
 */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    Ng2Rut2
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  /**
   * Formulario para actualizar la información de la cuenta.
   */
  accountForm: FormGroup;

  /**
   * Posición horizontal de las notificaciones.
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  /**
   * Posición vertical de las notificaciones.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
   * arreglo de usuarios.
   */
  users: User[]=[];

  /**
   * arreglo de usuarios.
   */
  objectUser: User | null | undefined;

  /**
   * Constructor del componente AccountComponent.
   *
   * @param fb FormBuilder para crear formularios.
   * @param authService Servicio de autenticación.
   * @param snackBar MatSnackBar para notificaciones.
   * @param dataService
   */
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private dataService: DataService) {

    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rut: ['', [Validators.required, RutValidatorDirective.validate]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,18}$'),
        Validators.minLength(6),
        Validators.maxLength(18)
      ]]
    });
  }

  /**
   * Inicializa el componente y carga la información del usuario en el formulario.
   */
  ngOnInit(): void {
    this.objectUser = this.authService.getUser();
    this.users = this.authService.loadUsers();

    if (this.objectUser) {
      this.accountForm.patchValue({
        firstName: this.objectUser.firstName,
        lastName: this.objectUser.lastName,
        rut: this.objectUser.rut,
        email: this.objectUser.email,
        phone: this.objectUser.phone,
        address: this.objectUser.address,
        password: this.objectUser.password
      });
    }
  }

  /**
   * Valida si el campo nombre es válido.
   */
  get validFirstName(){
    return this.accountForm.get('firstName')?.invalid && this.accountForm.get('firstName')?.touched;
  }

  /**
   * Valida si el campo apellido es válido.
   */
  get validLastName(){
    return this.accountForm.get('lastName')?.invalid && this.accountForm.get('lastName')?.touched;
  }

  /**
   * Valida si el campo apellido es válido.
   */
  get validRut(){
    return this.accountForm.get('rut')?.invalid && this.accountForm.get('rut')?.touched;
  }


  /**
   * Valida si el campo email es válido.
   */
  get validEmail(){
    return this.accountForm.get('email')?.invalid && this.accountForm.get('email')?.touched;
  }

  /**
   * Valida si el campo teléfono es válido.
   */
  get validPhone(){
    return this.accountForm.get('phone')?.invalid && this.accountForm.get('phone')?.touched;
  }

  /**
   * Valida si el campo dirección es válido.
   */
  get validAddress(){
    return this.accountForm.get('address')?.invalid && this.accountForm.get('address')?.touched;
  }

  /**
   * Valida si el campo contraseña es válido.
   */
  get validPassword(){
    return this.accountForm.get('password')?.invalid && this.accountForm.get('password')?.touched;
  }

  /**
   * Valida si las contraseñas coinciden.
   *
   * @param control AbstractControl para el grupo de formularios.
   * @returns ValidationErrors | null
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  /**
   * Maneja el envío del formulario de actualización de cuenta.
   */
  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.accountForm.valid) {

          const index = this.users.findIndex((elemento: any) => elemento.id === this.objectUser?.id);

          if (index !== -1) {
            this.users[index].firstName = this.accountForm.get('firstName')?.value;
            this.users[index].lastName = this.accountForm.get('lastName')?.value;
            this.users[index].rut = this.accountForm.get('rut')?.value;
            this.users[index].email = this.accountForm.get('email')?.value;
            this.users[index].phone = this.accountForm.get('phone')?.value;
            this.users[index].address = this.accountForm.get('address')?.value;
            this.users[index].password = this.accountForm.get('password')?.value;
            this.users[index].roles = this.objectUser?.roles ?? [];
            this.dataService.addUser(this.users).subscribe(rsp => {});
            if (this.authService.login(this.users[index].email, this.users[index].password)) {
              this.snackBar.open('Usuario actualizado correctamente!', '', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['custom-snackbar']
              });
            }
          }
        }
      }
    });
  }

  validateNumbers(event: { charCode: number; }){
    return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 107;
  }


}
