import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  products = [
    {
      img: 'path/to/image1.jpg',
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100
    },
    {
      img: 'path/to/image2.jpg',
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200
    },
    {
      img: 'path/to/image1.jpg',
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100
    },
    {
      img: 'path/to/image2.jpg',
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200
    },
    {
      img: 'path/to/image1.jpg',
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100
    },
    {
      img: 'path/to/image2.jpg',
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200
    },
    {
      img: 'path/to/image1.jpg',
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100
    },
    {
      img: 'path/to/image2.jpg',
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200
    },
    {
      img: 'path/to/image1.jpg',
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100
    },
    {
      img: 'path/to/image2.jpg',
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200
    }
    // Agrega más productos según sea necesario
  ];

  removeFromCart(index: number) {
    this.products.splice(index, 1);
  }
}
