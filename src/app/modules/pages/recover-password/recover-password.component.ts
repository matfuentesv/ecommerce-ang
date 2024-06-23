import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {NgClass, NgIf} from "@angular/common";

/**
 * @description
 * Este componente maneja el formulario de recuperación de contraseña.
 *
 * @usageNotes
 * Este componente debe ser utilizado en la página de recuperación de contraseñas. Asegúrate de que los servicios `MatSnackBar` estén configurados correctamente en tu aplicación para que el componente funcione como se espera.
 *
 * @example
 * <app-recover-password></app-recover-password>
 */
@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent implements OnInit {

  /**
   * Formulario de recuperación de contraseña.
   */
  recover!: FormGroup;

  /**
   * Posición horizontal del snack bar.
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  /**
   * Posición vertical del snack bar.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
   * Constructor del componente RecoverPasswordComponent.
   *
   * @param fb FormBuilder para construir el formulario de recuperación de contraseña.
   * @param snackBar MatSnackBar para mostrar mensajes.
   */
  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar) {}

  /**
   * Inicializa el componente y configura el formulario de recuperación de contraseña.
   */
  ngOnInit(): void {
    this.recover = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Verifica si el campo email es válido y ha sido tocado.
   */
  get validEmail(){
    return this.recover.get('email')?.invalid && this.recover.get('email')?.touched;
  }

  /**
   * Maneja el envío del formulario de recuperación de contraseña.
   */
  onSubmit(): void {
    if (this.recover.valid) {
      this.snackBar.open('Contraseña enviada con exito!', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    } else {
      Object.values(this.recover.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
