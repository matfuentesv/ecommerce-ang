import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../../core/services/data/data.service";
import { GridComponent } from "../../../../shared/components/grid/grid.component";

/**
 * @description
 * Este componente maneja la visualización de la lista de teléfonos celulares y los muestra en una cuadrícula.
 *
 * @usageNotes
 * Este componente debe ser utilizado para mostrar una lista de teléfonos celulares en una vista de cuadrícula.
 *
 *
 * @example
 * <app-cell-phones></app-cell-phones>
 */
@Component({
  selector: 'app-cell-phones',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './cell-phones.component.html',
  styleUrl: './cell-phones.component.css'
})
export class CellPhonesComponent implements OnInit {

  /**
   * Lista de productos de teléfonos celulares.
   */
  products: any[] = [];

  /**
   * Lista de productos dividida en chunks para mostrar en la cuadrícula.
   */
  chunkedProducts: any[][] = [];

  /**
   * Constructor del componente CellPhonesComponent.
   *
   * @param productService Servicio para obtener los datos de los productos.
   */
  constructor(private productService: DataService) {}

  /**
   * Inicializa el componente y carga los productos de teléfonos celulares.
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product.cellPhones;
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
