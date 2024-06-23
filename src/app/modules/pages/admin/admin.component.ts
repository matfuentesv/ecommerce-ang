import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {DataService} from "../../../core/services/data/data.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../shared/models/user";

import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {MatSpinner} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {UserModalComponent} from "../../../shared/components/user-modal/user-modal.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatRowDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatPaginator,
    MatSpinner,
    NgClass
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit,AfterViewChecked  {

  currentSection: string = 'products';
  productForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'roles'];
  dataSource = new MatTableDataSource<User>();
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,
              private userService: DataService,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['']
    });
  }


  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePaginator();
    });
  }

  ngAfterViewChecked() {
    this.initializePaginator();
  }

  private initializePaginator() {
    if (this.paginator && !this.dataSource.paginator) {
      this.ngZone.runOutsideAngular(() => {
        this.dataSource.paginator = this.paginator;

        merge(this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.userService.getUsers().pipe(
                catchError(() => of([]))
              );
            }),
            map(data => {
              this.isLoadingResults = false;
              this.resultsLength = data.length;
              return data;
            })
          )
          .subscribe(data => {
            this.ngZone.run(() => {
              this.dataSource.data = data;
              this.cdr.detectChanges();
            });
          });
      });
    }
  }

  private loadData() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.resultsLength = users.length;
      this.isLoadingResults = false;
      this.cdr.detectChanges();
    });
  }

  showSection(event: Event, section: string): void {
    event.preventDefault();
    this.currentSection = section;
  }

  onSubmitProduct(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.snackBar.open('Producto agregado con exito!', '', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  get validProductName(){
    return this.productForm.get('productName')?.invalid && this.productForm.get('productName')?.touched;
  }

  get validProductDescription(){
    return this.productForm.get('description')?.invalid && this.productForm.get('description')?.touched;
  }

  get validProductPrice(){
    return this.productForm.get('price')?.invalid && this.productForm.get('price')?.touched;
  }

  get validProductCategory(){
    return this.productForm.get('category')?.invalid && this.productForm.get('category')?.touched;
  }


  openModal(){
    this.dialog.open(UserModalComponent);
  }

}

