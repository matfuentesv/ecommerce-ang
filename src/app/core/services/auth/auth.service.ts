import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../../shared/models/user";
import {DataService} from "../data/data.service";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isLoggedIn.asObservable();
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor(private router: Router, private dataService: DataService) {
    this.loadUsers();
  }

  private loadUsers() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedIn.next(true);
      this.userNameSubject.next(user.firstName);
      this.userRoleSubject.next(user.roles.includes('admin') ? 'admin' : 'customer');
      this.currentUser = user;
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.isLoggedIn.next(false);
    this.userNameSubject.next(null);
    this.userRoleSubject.next(null);
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  getUser(): User | null {
    return this.currentUser;
  }
  setUser(user:User){
    this.users.push(user);
  }}
