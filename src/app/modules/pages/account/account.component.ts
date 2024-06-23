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
    NgClass
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
   * Constructor del componente AccountComponent.
   *
   * @param fb FormBuilder para crear formularios.
   * @param authService Servicio de autenticación.
   * @param snackBar MatSnackBar para notificaciones.
   */
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,18}$'),
        Validators.minLength(6),
        Validators.maxLength(18)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Inicializa el componente y carga la información del usuario en el formulario.
   */
  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.accountForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address
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
    if (this.accountForm.valid) {

      this.snackBar.open('Información usuario actualizada con exito!', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['custom-snackbar']
      });

    }
  }

}
