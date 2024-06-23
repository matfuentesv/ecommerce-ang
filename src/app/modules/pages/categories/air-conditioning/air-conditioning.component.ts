import { Component, OnInit } from '@angular/core';
import { GridComponent } from "../../../../shared/components/grid/grid.component";
import { DataService } from "../../../../core/services/data/data.service";

/**
 * @description
 * Este componente maneja la visualización de la lista de productos de aire acondicionado y los muestra en una cuadrícula.
 *
 * @usageNotes
 * Este componente debe ser utilizado para mostrar una lista de productos de aire acondicionado en una vista de cuadrícula.
 *
 * @example
 * <app-air-conditioning></app-air-conditioning>
 */
@Component({
  selector: 'app-air-conditioning',
  standalone: true,
  imports: [
    GridComponent
  ],
  templateUrl: './air-conditioning.component.html',
  styleUrl: './air-conditioning.component.css'
})
export class AirConditioningComponent implements OnInit {

  /**
   * Lista de productos de aire acondicionado.
   */
  products: any[] = [];

  /**
   * Lista de productos dividida en chunks para mostrar en la cuadrícula.
   */
  chunkedProducts: any[][] = [];

  /**
   * Constructor del componente AirConditioningComponent.
   *
   * @param productService Servicio para obtener los datos de los productos.
   */
  constructor(private productService: DataService) {}

  /**
   * Inicializa el componente y carga los productos de aire acondicionado.
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product.airConditioning;
      this.chunkedProducts = this.chunkArray(this.products, 3);
    });
  }

  /**
   * Divide una lista de elementos en chunks de un tamaño específico.
   *
   * @param myArray Lista de elementos a dividir.
   * @param chunk_size Tamaño de cada chunk.
   * @returns Lista de chunks.
   */
  chunkArray(myArray: any[], chunk_size: number): any[][] {
    let results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }
}
