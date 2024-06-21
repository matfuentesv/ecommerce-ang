
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse} from "../../../shared/models/products";
import {User} from "../../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jsonProducttUrl = 'assets/json/data.json';
  private jsonUsersUrl = 'assets/json/users.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.jsonProducttUrl);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.jsonUsersUrl);
  }
}
