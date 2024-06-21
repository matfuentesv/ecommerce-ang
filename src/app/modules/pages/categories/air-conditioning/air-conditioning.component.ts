import {Component, OnInit} from '@angular/core';
import {GridComponent} from "../../../../shared/components/grid/grid.component";
import {DataService} from "../../../../core/services/data/data.service";

@Component({
  selector: 'app-air-conditioning',
  standalone: true,
    imports: [
        GridComponent
    ],
  templateUrl: './air-conditioning.component.html',
  styleUrl: './air-conditioning.component.css'
})
export class AirConditioningComponent implements OnInit{

  products: any[] = [];
  chunkedProducts: any[][] = [];

  constructor(private productService: DataService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product.airConditioning;
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
