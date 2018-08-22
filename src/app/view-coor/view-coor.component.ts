import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';

// services
import { InscriptionService } from '../services/inscription.service';
import { ReportService } from '../services/report.service';

// models 
// models
import { InscripcionModel } from '../models/inscriptions';
import { ReportsModel } from '../models/reports';
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
  public actualDate: string;
  inscriptionList: any[];
  therapist1List: any[];
  therapist2List: any[];
  therapist3List: any[];
  orderArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  turnsHours = ['12:00', '12:20', '12:40', '1:00', '1:20', '1:40', '2:00', '2:20', '2:40', '3:00', '3:20', '3:40']
  reportList: any[];

  constructor(
    private authFirebaseService: AuthFirebaseService,
    private inscriptionService: InscriptionService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.authFirebaseService.getAuth().subscribe(auth => {
      if(auth){
        this.emailUser = auth.email;
        this.isLogin = true;
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

    // current date
    const today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    const yyyy: any = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.actualDate = dd + '/' + mm + '/' + yyyy;

    // get inscriptions
    this.inscriptionService.getInscriptions()
    .snapshotChanges()
    .subscribe(item => {
      this.inscriptionList = [];
      this.therapist1List = [];
      this.therapist2List = [];
      this.therapist3List = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        if(x['therapist'] === 1) {
          this.orderArr.forEach(elem => {
            if(x['hourStart'] === this.turnsHours[0]) {

            }
          })
          // if(x['hourStart'] === '12:00'){
          //   x["order"] = this.orderArr[0];
          //   // console.log(x['hourStart'])
          //   this.therapist1List.push(x);
          //   // console.log(this.therapist1List)
          // } else if (x['hourStart'] === '12:20') {
          //   x["order"] = this.orderArr[1];
          //   // console.log(x['hourStart'])
          //   this.therapist1List.push(x);
          //   console.log(this.therapist1List)
          // }
          // console.log(x['hourStart'])
          // console.log(this.orderArr[0])
          // this.therapist1List.push(x);
        } else if (x['therapist'] === 2) {
          this.therapist2List.push(x);
        } else if (x['therapist'] === 3) {
          this.therapist3List.push(x);
        }
        this.inscriptionList.push(x);
      });
    });    

    // get reports
    this.reportService.getReports()
    .snapshotChanges()
    .subscribe(item => {
      this.reportList = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.reportList.push(x)
      })
    })

    
  }

  logoutUser() {
    this.authFirebaseService.logout();
  }
}
