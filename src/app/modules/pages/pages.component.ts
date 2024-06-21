import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../core/services/data/data.service";
import {LoginModalComponent} from "../../shared/components/login-modal/login-modal.component";

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

  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  openModal(){
    this.dialog.open(LoginModalComponent, {});
  }

}
