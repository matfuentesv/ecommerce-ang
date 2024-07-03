import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { DataService } from "../../../core/services/data/data.service";
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource,
} from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { User } from "../../../shared/models/user";
import { catchError, map, merge, of, startWith, switchMap } from "rxjs";
import { MatSpinner } from "@angular/material/progress-spinner";
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from "../../../shared/components/user-modal/user-modal.component";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import {Ng2Rut2} from "../../../shared/directives/ng2-rut/ng2-rut.module";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import Swal from 'sweetalert2';
/**
 * @description
 * Este componente maneja la administración de productos y usuarios en la aplicación.
 * Permite agregar nuevos productos, listar usuarios y gestionar sus roles.
 *
 * @usageNotes
 * Este componente debe ser utilizado dentro del módulo de administración de la aplicación.
 *
 *
 * @example
 * <app-admin></app-admin>
 */
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
    NgClass,
    Ng2Rut2,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit, AfterViewChecked {

  /**
   * Sección actual que se muestra en la interfaz de administración.
   */
  currentSection: string = 'products';

  /**
   * Formulario para agregar un nuevo producto.
   */
  productForm: FormGroup;

  /**
   * Posición horizontal de las notificaciones.
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  /**
   * Posición vertical de las notificaciones.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /**
   * Columnas que se muestran en la tabla de usuarios.
   */
  displayedColumns: string[] = ['firstName', 'lastName','rut', 'email', 'phone', 'address', 'roles','edit','delete'];

  /**
   * Fuente de datos para la tabla de usuarios.
   */
  dataSource = new MatTableDataSource<User>();

  /**
   * Número total de resultados en la tabla.
   */
  resultsLength = 0;

  /**
   * Indicador de carga de resultados.
   */
  isLoadingResults = true;

  /**
   * varibale que contiene un arreglo de usuarios.
   */
  user : User[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Constructor del componente AdminComponent.
   *
   * @param fb FormBuilder para crear formularios.
   * @param userService Servicio de datos para usuarios.
   * @param cdr ChangeDetectorRef para detectar cambios.
   * @param ngZone NgZone para manejar cambios de zona.
   * @param dialog MatDialog para manejar modales.
   * @param snackBar MatSnackBar para notificaciones.
   */
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

  /**
   * Inicializa el componente y carga los datos iniciales.
   */
  ngOnInit() {
    this.loadData();
  }

  /**
   * Método llamado después de que la vista se ha inicializado.
   * Configura el paginador para la tabla de usuarios.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePaginator();
    });
  }

  /**
   * Método llamado después de que la vista se ha verificado.
   * Configura el paginador para la tabla de usuarios.
   */
  ngAfterViewChecked() {
    this.initializePaginator();
  }

  /**
   * Inicializa el paginador para la tabla de usuarios.
   */
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

  /**
   * Carga los datos de usuarios.
   */
  private loadData() {
    this.userService.getUsers().subscribe(users => {
      this.user = users;
      this.dataSource.data = this.user;
      this.resultsLength = this.user.length;
      this.isLoadingResults = false;
      this.cdr.detectChanges();
    });
  }

  /**
   * Muestra una sección específica en la interfaz de administración.
   *
   * @param event Evento del click.
   * @param section Sección a mostrar.
   */
  showSection(event: Event, section: string): void {
    event.preventDefault();
    this.currentSection = section;
  }

  /**
   * Maneja el envío del formulario de producto.
   */
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

  /**
   * Verifica si el nombre del producto es válido.
   */
  get validProductName() {
    return this.productForm.get('productName')?.invalid && this.productForm.get('productName')?.touched;
  }

  /**
   * Verifica si la descripción del producto es válida.
   */
  get validProductDescription() {
    return this.productForm.get('description')?.invalid && this.productForm.get('description')?.touched;
  }

  /**
   * Verifica si el precio del producto es válido.
   */
  get validProductPrice() {
    return this.productForm.get('price')?.invalid && this.productForm.get('price')?.touched;
  }

  /**
   * Verifica si la categoría del producto es válida.
   */
  get validProductCategory() {
    return this.productForm.get('category')?.invalid && this.productForm.get('category')?.touched;
  }

  /**
   * Abre el modal de usuario.
   */
  openModal() {
    const dialogRef = this.dialog.open(UserModalComponent, { data: { users: this.user } });
    dialogRef.afterClosed().subscribe(result => {
        this.ngZone.run(() => {
          this.loadData();
        });
    });
  }

  editElement(user:User){}
  deleteElement(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.user.findIndex((x: any) => x.id === user.id);

        if (index !== -1) {
          this.user.splice(index, 1);
          this.userService.addUser(this.user).subscribe((rsp) => {
            this.snackBar.open('¡Usuario eliminado correctamente!', '', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['custom-snackbar']
            });
            this.loadData();
          });
        }
      }
    });
  }

}
