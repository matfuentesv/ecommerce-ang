import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {Products} from "../../../shared/models/products";
import {DataService} from "../../../core/services/data/data.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products: Products[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(x => {
      this.products = x.outstanding;
    });
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'fas fa-star text-warning' : 'far fa-star text-warning');
  }




}
