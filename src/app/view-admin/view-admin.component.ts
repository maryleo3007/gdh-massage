import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  public emailUser: string;
  public isLogin: boolean;
  public name: string;
  public correctUser: boolean;
  public lastName: string;
  public area: string;
  public img: string;
  public show = true;
  constructor(
    private authFirebaseService: AuthFirebaseService
  ) { }

  ngOnInit() {
  }
  
  logoutUser() {
    this.authFirebaseService.logout();
  }
}
