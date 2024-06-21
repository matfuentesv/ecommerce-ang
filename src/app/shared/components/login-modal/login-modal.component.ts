import { Component } from '@angular/core';
import {DataService} from "../../../core/services/data/data.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {

  constructor(public dialog: MatDialog) { }


  close(){
    this.dialog.closeAll();
  }

}
