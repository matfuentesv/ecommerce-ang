import { Component } from '@angular/core';
import {DataService} from "../../../core/services/data/data.service";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {

  constructor(public dialog: MatDialog,
              private router: Router) { }


  close(){
    this.dialog.closeAll();
  }

  recoverPassword(){
    this.close();
    this.router.navigate(["/recover-password"]);
  }

  register(){
    this.close();
    this.router.navigate(["/register"]);
  }

}
