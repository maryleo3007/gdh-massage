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
  // public lastName: string;
  // public area: string;
  // public img: string;
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
        // console.log(this.emailUser)
        if(auth.email === 'aponcedeleon@inteligogroup.com' ||auth.email === 'valvarez@inteligogroup.com') {
          this.show = true;
          console.log('son ellas')
        } else {
          console.log('no es tu ruta');
          this.show  = false;
        }
        // if(this.name === undefined) {
        //   console.log('no es tu ruta');
        //   this.correctUser = false;
        // } else {
        //   this.correctUser = true;
          
        // }
      }     
    });
  }
  
  logoutUser() {
    this.authFirebaseService.logout();
  }
}
