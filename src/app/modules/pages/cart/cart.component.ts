import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { CartService } from "../../../core/services/cart/cart.service";
import { Products } from "../../../shared/models/products";
import { FormsModule } from "@angular/forms";
import { CustomCurrencyPipe } from "../../../shared/pipes/customCurrency";

/**
 * @description
 * Este componente maneja la visualización y manipulación de los productos en el carrito de compras.
 *
 * @usageNotes
 * Este componente debe ser utilizado para mostrar y gestionar los productos en el carrito de compras.
 *
 *
 * @example
 * <app-cart></app-cart>
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    FormsModule,
    NgIf,
    CustomCurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  /**
   * Lista de productos en el carrito.
   */
  items: Products[] = [];

  /**
   * Total del precio de los productos en el carrito.
   */
  total: number = 0;

  /**
   * Total del descuento aplicado a los productos en el carrito.
   */
  discount: number = 0;

  /**
   * Constructor del componente CartComponent.
   *
   * @param cartService Servicio del carrito de compras.
   */
  constructor(private cartService: CartService) { }

  /**
   * Inicializa el componente y carga los productos del carrito.
   */
  ngOnInit(): void {
    this.items = this.cartService.getItems();
    console.log('Items en el carrito:', this.items);
    this.calculateTotal();
  }

  /**
   * Calcula el total y el descuento de los productos en el carrito.
   */
  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    this.discount = this.items.reduce((acc, item) => acc + ((item.price * (item.discount / 100)) * (item.quantity || 1)), 0);
  }

  /**
   * Actualiza la cantidad de un producto en el carrito.
   *
   * @param productName Nombre del producto.
   * @param quantity Nueva cantidad del producto.
   */
  updateQuantity(productName: string, quantity: number | undefined): void {
    if (quantity === undefined || quantity < 1) {
      quantity = 1;
    }
    this.cartService.updateQuantity(productName, quantity);
    this.calculateTotal();
  }

  /**
   * Elimina un producto del carrito.
   *
   * @param productName Nombre del producto.
   */
  removeItem(productName: string): void {
    this.cartService.removeItem(productName);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  /**
   * Vacía el carrito de compras.
   */
  clearCart(): void {
    this.items = this.cartService.clearCart();
    this.total = 0;
    this.discount = 0;
  }
}
