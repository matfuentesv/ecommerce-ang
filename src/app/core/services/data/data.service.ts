import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from "../../../shared/models/products";
import { User } from "../../../shared/models/user";

/**
 * @description
 * Servicio para gestionar las solicitudes de datos relacionadas con productos y usuarios.
 *
 * @usageNotes
 * Este servicio se utiliza para obtener datos de productos y usuarios desde archivos JSON.
 *
 * @example
 * ```typescript
 * constructor(private dataService: DataService) {}
 *
 * this.dataService.getProducts().subscribe(products => {
 *   this.products = products;
 * });
 *
 * this.dataService.getUsers().subscribe(users => {
 *   this.users = users;
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * URL del archivo JSON que contiene los datos de productos.
   */
  private jsonProducttUrl = 'assets/json/data.json';

  /**
   * URL del archivo JSON que contiene los datos de usuarios.
   */
  private jsonUsersUrl = 'assets/json/users.json';

  /**
   * Constructor del servicio DataService.
   *
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene los datos de productos desde el archivo JSON.
   *
   * @returns Observable que emite los datos de productos.
   */
  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.jsonProducttUrl);
  }

  /**
   * Obtiene los datos de usuarios desde el archivo JSON.
   *
   * @returns Observable que emite los datos de usuarios.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUsersUrl);
  }
}
