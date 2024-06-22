import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {NgClass, NgIf} from "@angular/common";

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

  accountForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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

  get validFirstName(){
    return this.accountForm.get('firstName')?.invalid && this.accountForm.get('firstName')?.touched;
  }

  get validLastName(){
    return this.accountForm.get('lastName')?.invalid && this.accountForm.get('lastName')?.touched;
  }

  get validEmail(){
    return this.accountForm.get('email')?.invalid && this.accountForm.get('email')?.touched;
  }

  get validPhone(){
    return this.accountForm.get('phone')?.invalid && this.accountForm.get('phone')?.touched;
  }

  get validAddress(){
    return this.accountForm.get('address')?.invalid && this.accountForm.get('address')?.touched;
  }



  get validPassword(){
    return this.accountForm.get('password')?.invalid && this.accountForm.get('password')?.touched;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

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
