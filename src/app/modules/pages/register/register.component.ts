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

  registerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog:MatDialog,
              private snackBar: MatSnackBar) {}

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
      promo:[false,[this.requiredCheckbox]]
    });
  }


  get validFirstName(){
    return this.registerForm.get('firstName')?.invalid && this.registerForm.get('firstName')?.touched;
  }

  get validLastName(){
    return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
  }

  get validRut(){
    return this.registerForm.get('rut')?.invalid && this.registerForm.get('rut')?.touched;
  }

  get validEmail(){
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }

  get validPhone(){
    return this.registerForm.get('phone')?.invalid && this.registerForm.get('phone')?.touched;
  }

  get validAddress(){
    return this.registerForm.get('address')?.invalid && this.registerForm.get('address')?.touched;
  }



  get validPassword(){
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }



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
    }else {
      return Object.values(this.registerForm.controls)
        .forEach(control => {
          control.markAsTouched();
        });
    }
  }


  openModal(){
    this.dialog.open(LoginModalComponent, {});
  }

  requiredCheckbox(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

}
