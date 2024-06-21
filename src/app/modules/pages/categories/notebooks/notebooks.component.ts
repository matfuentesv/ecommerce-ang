import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../core/services/data/data.service";
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {GridComponent} from "../../../../shared/components/grid/grid.component";

@Component({
  selector: 'app-notebooks',
  standalone: true,
  imports: [
    GridComponent
  ],
  templateUrl: './notebooks.component.html',
  styleUrl: './notebooks.component.css'
})
export class NotebooksComponent implements OnInit{

  products: any[] = [];
  chunkedProducts: any[][] = [];

  constructor(private productService: DataService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product.notebooks;
      this.chunkedProducts = this.chunkArray(this.products, 3);
    });
  }

  chunkArray(myArray: any[], chunk_size: number): any[][] {
    let results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }
}
