import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModalComponent} from "../../../shared/components/login-modal/login-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {User} from "../../../shared/models/user";
import {NgClass, NgIf} from "@angular/common";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

/**
 * @description
 * Este componente maneja el formulario de registro de nuevos usuarios.
 *
 * @usageNotes
 * Este componente debe ser utilizado en la página de registro de usuarios. Asegúrate de que los servicios `AuthService` y `MatDialog` estén configurados correctamente en tu aplicación para que el componente funcione como se espera.
 *
 * @example
 * <app-register></app-register>
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  /**
   * Formulario de registro.
   */
  registerForm!: FormGroup;

  /**
   * Posición horizontal del snack bar.
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  /**
   * Posición vertical del snack bar.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
   * Constructor del componente RegisterComponent.
   *
   * @param fb FormBuilder para construir el formulario de registro.
   * @param authService Servicio de autenticación.
   * @param router Router para navegación.
   * @param dialog MatDialog para modales.
   * @param snackBar MatSnackBar para mostrar mensajes.
   */
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  /**
   * Inicializa el componente y configura el formulario de registro.
   */
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rut: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{6,18}$'),
        Validators.minLength(6),
        Validators.maxLength(18)
      ]],
      promo: [false, [this.requiredCheckbox]]
    });
  }

  /**
   * Verifica si el campo firstName es válido y ha sido tocado.
   */
  get validFirstName(){
    return this.registerForm.get('firstName')?.invalid && this.registerForm.get('firstName')?.touched;
  }

  /**
   * Verifica si el campo lastName es válido y ha sido tocado.
   */
  get validLastName(){
    return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
  }

  /**
   * Verifica si el campo rut es válido y ha sido tocado.
   */
  get validRut(){
    return this.registerForm.get('rut')?.invalid && this.registerForm.get('rut')?.touched;
  }

  /**
   * Verifica si el campo email es válido y ha sido tocado.
   */
  get validEmail(){
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }

  /**
   * Verifica si el campo phone es válido y ha sido tocado.
   */
  get validPhone(){
    return this.registerForm.get('phone')?.invalid && this.registerForm.get('phone')?.touched;
  }

  /**
   * Verifica si el campo address es válido y ha sido tocado.
   */
  get validAddress(){
    return this.registerForm.get('address')?.invalid && this.registerForm.get('address')?.touched;
  }

  /**
   * Verifica si el campo password es válido y ha sido tocado.
   */
  get validPassword(){
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }

  /**
   * Maneja el envío del formulario de registro.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Lógica para manejar el registro
      console.log(this.registerForm.value);
      const user: User = {
        ...this.registerForm.value,
        roles: ['customer']
      };
      console.log(user);
      this.authService.setUser(user);
      if (this.authService.login(user.email, user.password)) {
        this.snackBar.open('Usuario creado con exito!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
        this.router.navigate(['/home']);
      }
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  /**
   * Abre el modal de login.
   */
  openModal() {
    this.dialog.open(LoginModalComponent, {});
  }

  /**
   * Validador personalizado para el checkbox de promociones.
   *
   * @param control AbstractControl del formulario.
   * @returns ValidationErrors | null
   */
  requiredCheckbox(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }
}
