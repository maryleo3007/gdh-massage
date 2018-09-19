import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';
import { InscriptionService } from '../services/inscription.service';


@Component({
  selector: 'app-view-dev',
  templateUrl: './view-dev.component.html',
  styleUrls: ['./view-dev.component.css']
})
export class ViewDevComponent implements OnInit {
  public isLogin: boolean;
  public emailUser: string;
  public show: boolean;
  inscriptionList: any[];


  constructor(
    private authFirebaseService: AuthFirebaseService,
    private inscriptionService: InscriptionService,
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.authFirebaseService.getAuth().subscribe(auth => {
      if (auth) {
        this.emailUser = auth.email;
        this.isLogin = true;
        if (auth.email === 'mllamocca@inteligogroup.com' || auth.email === 'acabrera@inteligogroup.com') {
          this.show = true;
        } else if (auth.email == undefined || auth.email == null) {
          this.show = false;
        }
      }
    });

    // get inscriptions
    this.inscriptionService.getInscriptions()
    .snapshotChanges()
    .subscribe(item => {
      this.inscriptionList = [];
      item.forEach( elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        this.inscriptionList.push(x)
      })
      // console.log(this.inscriptionList);
      
    })
  }

  logoutUser() {
    this.authFirebaseService.logout();
  }

  deleteListInscription() {
    this.inscriptionList.forEach(element => {
      this.inscriptionService.deleteInscription(element['$key'])
      
    });
  }

}
