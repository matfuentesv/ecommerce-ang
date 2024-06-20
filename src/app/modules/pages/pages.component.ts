import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}
