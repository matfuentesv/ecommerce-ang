import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
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
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {MatSpinner} from "@angular/material/progress-spinner";

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
    MatSpinner
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit,AfterViewChecked  {

  currentSection: string = 'products';
  productForm: FormGroup;
  userForm: FormGroup;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'roles'];
  dataSource = new MatTableDataSource<User>();
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fb: FormBuilder, private userService: DataService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['']
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')
      ]],
      confirmPassword: ['', [Validators.required]],
      roles: ['', Validators.required]
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
              this.cdr.detectChanges(); // Ensure change detection after data fetch
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
      this.cdr.detectChanges(); // Ensure change detection after data fetch
    });
  }

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

