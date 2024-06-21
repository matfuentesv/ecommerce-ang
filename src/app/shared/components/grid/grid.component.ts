import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {Products} from "../../models/products";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgClass
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

  @Input()
  chunkedProducts: Products[][] = [];

  @Input()
  title: string = '';

  getStars(rating: number): string[] {
    return Array.from({length: 5}, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }

}
