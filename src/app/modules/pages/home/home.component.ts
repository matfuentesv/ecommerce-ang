import {AfterViewInit, Component, OnInit} from '@angular/core';
import { DataService } from "../../../core/services/data/data.service";
import { Products } from "../../../shared/models/products";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../../core/services/cart/cart.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {CustomCurrencyPipe} from "../../../shared/pipes/customCurrency";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

declare var $: any;

/**
 * @description
 * Este componente maneja la visualización de los productos destacados en la página de inicio y permite a los usuarios agregar productos al carrito.
 *
 * @usageNotes
 * Este componente debe ser utilizado en la página de inicio para mostrar una lista de productos destacados. Requiere la biblioteca jQuery para manejar el carrusel de productos destacados.
 *
 * @example
 * <app-home></app-home>
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    NgForOf,
    MatButton,
    CustomCurrencyPipe,
    MatProgressSpinnerModule,
    NgIf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  /**
   * Lista de productos destacados.
   */
  products: Products[] = [];

  /**
   * Lista de productos dividida en chunks para mostrar en el carrusel.
   */
  chunkedProducts: Products[][] = [];

  /**
   * Posición horizontal del snack bar.
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  /**
   * Posición vertical del snack bar.
   */
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  /**
   * Variable para mostrar/ocular spinner.
   */
  loading: boolean = true;

  /**
   * Constructor del componente HomeComponent.
   *
   * @param dataService Servicio para obtener los datos de los productos.
   * @param cartService Servicio para manejar el carrito de compras.
   * @param snackBar MatSnackBar para mostrar mensajes.
   */
  constructor(private dataService: DataService,
              private cartService: CartService,
              private snackBar: MatSnackBar) { }

  /**
   * Inicializa el componente y carga los productos destacados.
   */
  ngOnInit(): void {
    this.loading = true;
    this.dataService.getProducts().subscribe(x => {
      this.products = x.outstanding;
      this.chunkedProducts = this.chunk(this.products, 3);
      this.loading = false;
    },error => {
      console.error(error);
      this.loading = false;
    });
  }

  /**
   * Divide una lista de elementos en chunks de un tamaño específico.
   *
   * @param arr Lista de elementos a dividir.
   * @param chunkSize Tamaño de cada chunk.
   * @returns Lista de chunks.
   */
  chunk(arr: any[], chunkSize: number): any[] {
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  /**
   * Genera una lista de clases de estrellas para mostrar la calificación de un producto.
   *
   * @param rating Calificación del producto.
   * @returns Lista de clases de estrellas.
   */
  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }

  /**
   * Inicializa el carrusel de productos destacados utilizando jQuery.
   */
  ngAfterViewInit(): void {
    $('#featuredProductsCarousel').carousel({
      interval: 2000
    });
  }

  /**
   * Agrega un producto al carrito y muestra un mensaje de confirmación.
   *
   * @param product Producto a agregar al carrito.
   */
  addToCart(product: Products): void {
    this.cartService.addToCart(product);
    this.snackBar.open('Producto agregado al carrito!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }
}
