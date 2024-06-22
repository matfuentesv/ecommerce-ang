import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  productForm: FormGroup;
  userForm: FormGroup;
  currentSection: string = 'products';
  pdfSrc: string | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: ['']
    });

    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userRole: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  showSection(event: Event, section: string): void {
    event.preventDefault();
    this.currentSection = section;
  }

  onSubmitProduct(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onSubmitUser(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }


}
