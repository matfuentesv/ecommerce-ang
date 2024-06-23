import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { LoginModalComponent } from "../../shared/components/login-modal/login-modal.component";
import { AuthService } from "../../core/services/auth/auth.service";
import { CartService } from "../../core/services/cart/cart.service";
import { filter } from "rxjs";

/**
 * @description
 * Este componente maneja la vista principal de las páginas, incluyendo la visualización de la información del usuario autenticado y el número de elementos en el carrito.
 *
 * @usageNotes
 * Este componente debe ser utilizado como contenedor principal para las diferentes páginas de la aplicación.
 *
 * @example
 * <app-pages></app-pages>
 */
@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

  /**
   * Nombre del usuario autenticado.
   */
  userName: string | null = null;

  /**
   * Rol del usuario autenticado.
   */
  userRole: string | null = null;

  /**
   * Número de items en el carrito.
   */
  cartItemCount: number = 0;

  /**
   * Constructor del componente PagesComponent.
   *
   * @param authService Servicio de autenticación.
   * @param cdr ChangeDetectorRef para detectar cambios.
   * @param router Router para navegación.
   * @param cartService Servicio de carrito.
   * @param dialog MatDialog para modales.
   */
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  /**
   * Inicializa el componente y configura suscripciones a servicios.
   */
  ngOnInit(): void {
    this.authService.userName$.subscribe(userName => {
      this.userName = userName;
      this.cdr.detectChanges();
    });

    this.authService.userRole$.subscribe(userRole => {
      this.userRole = userRole;
      this.cdr.detectChanges();
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userName = this.authService.getUserName();
        this.userRole = this.authService.getUserRole();
        this.cdr.detectChanges();
      });

    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  /**
   * Abre el modal de login.
   */
  openModal() {
    this.dialog.open(LoginModalComponent, {});
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    this.authService.logout();
    this.userName = null;
    this.userRole = null;
    this.cdr.detectChanges();
  }
}
