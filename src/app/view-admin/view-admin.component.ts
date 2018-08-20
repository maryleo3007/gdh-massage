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
  public show:boolean;
  constructor(
    private authFirebaseService: AuthFirebaseService
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.authFirebaseService.getAuth().subscribe(auth => {
      if(auth){
        this.emailUser = auth.email;
        this.isLogin = true;
        if(auth.email === 'aponcedeleon@inteligogroup.com' ||auth.email === 'valvarez@inteligogroup.com') {
          this.show = true;
        } else if (auth.email == undefined || auth.email == null){
          this.show  = false;
        }
      }     
    });
  }
  
  logoutUser() {
    this.authFirebaseService.logout();
  }
}