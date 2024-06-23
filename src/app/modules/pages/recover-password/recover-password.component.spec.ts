import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPasswordComponent } from './recover-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RecoverPasswordComponent // Importar el componente autónomo en lugar de declararlo
      ],
      providers: [
        MatSnackBar,
        { provide: ActivatedRoute, useValue: { params: of({}) } } // Proveedor de ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    const form = component.recover;
    expect(form).toBeDefined();
    expect(form.contains('email')).toBeTrue();
  });

  it('debería marcar el formulario como inválido si el email está vacío o es incorrecto', () => {
    const form = component.recover;
    form.get('email')?.setValue('');
    expect(form.valid).toBeFalse();
    form.get('email')?.setValue('invalidEmail');
    expect(form.valid).toBeFalse();
  });

  it('debería mostrar un mensaje de éxito al enviar un email válido', () => {
    spyOn(snackBar, 'open');
    const form = component.recover;
    form.get('email')?.setValue('test@example.com');
    component.onSubmit();
    expect(snackBar.open).toHaveBeenCalledWith('Contraseña enviada con exito!', '', {
      horizontalPosition: component.horizontalPosition,
      verticalPosition: component.verticalPosition,
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    const form = component.recover;
    form.get('email')?.setValue('');
    component.onSubmit();
    expect(form.get('email')?.touched).toBeTrue();
  });
});
