import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Products} from "../../../shared/models/products";
import {DataService} from "../../../core/services/data/data.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe
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




}
