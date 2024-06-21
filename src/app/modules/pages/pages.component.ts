import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
