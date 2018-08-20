import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';


@Component({
  selector: 'app-view-coor',
  templateUrl: './view-coor.component.html',
  styleUrls: ['./view-coor.component.css']
})
export class ViewCoorComponent implements OnInit {

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
        console.log(this.emailUser)
        if(auth.email === 'aponcedeleon@inteligogroup.com' || auth.email === 'valvarez@inteligogroup.com' ||
          auth.email === 'mllamocca@inteligogroup.com' || auth.email === 'acabrera@inteligogroup.com' ||
          auth.email === 'linga@inteligogroup.com' || auth.email === 'coordinadora@inteligogroup.com'
      ) {
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
