import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../core/services/data/data.service";
import { Products } from "../../../shared/models/products";
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";

// Declarar jQuery como una variable global
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    NgForOf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Products[] = [];
  chunkedProducts: Products[][] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(x => {
      this.products = x.outstanding;
      this.chunkedProducts = this.chunk(this.products, 3);
    });

    // Línea de prueba para verificar que jQuery está cargado
    console.log('jQuery version:', $.fn.jquery);
  }

  chunk(arr: any[], chunkSize: number): any[] {
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }

  prevSlide(): void {
    $('#featuredProductsCarousel').carousel('prev');
  }

  nextSlide(): void {
    $('#featuredProductsCarousel').carousel('next');
  }
}
