import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthService} from "../../../core/services/auth/auth.service";
import {DataService} from "../../../core/services/data/data.service";


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AccountComponent // Importar el componente autónomo en lugar de declararlo
      ],
      providers: [AuthService, DataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.accountForm).toBeDefined();
  });

  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    const form = component.accountForm;
    form.controls['firstName'].setValue('');
    form.controls['lastName'].setValue('');
    form.controls['rut'].setValue('');
    form.controls['email'].setValue('');
    form.controls['phone'].setValue('');
    form.controls['address'].setValue('');
    form.controls['password'].setValue('');
    expect(form.valid).toBeFalse();
  });

  it('debería marcar el formulario como válido si los campos están completos y válidos', () => {
    const form = component.accountForm;
    form.controls['firstName'].setValue('John');
    form.controls['lastName'].setValue('Doe');
    form.controls['rut'].setValue('19033434-1');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['phone'].setValue('1234567890');
    form.controls['address'].setValue('123 Main St');
    form.controls['password'].setValue('Password1');
    expect(form.valid).toBeTrue();
  });

  it('debería llamar al método de envío al enviar el formulario', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const form = component.accountForm;
    form.controls['firstName'].setValue('John');
    form.controls['lastName'].setValue('Doe');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['rut'].setValue('19033434-1');
    form.controls['phone'].setValue('1234567890');
    form.controls['address'].setValue('123 Main St');
    form.controls['password'].setValue('Password1');
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
