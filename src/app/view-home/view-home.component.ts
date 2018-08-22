import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// services
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { TurnosService } from './../services/turnos.service';
import { InscriptionService } from './../services/inscription.service';
import { ReportService } from './../services/report.service';

// models
import { InscripcionModel } from './../models/inscriptions';
import { ReportsModel } from './../models/reports';
import { TurnModel } from './../models/turns';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {

  events: MicrosoftGraph.Event[];
  me: MicrosoftGraph.User;
  message: MicrosoftGraph.Message;
  emailSent: Boolean;
  calendarSent: Boolean;
  subsGetUsers: Subscription;
  subsGetMe: Subscription;
  subsSendMail: Subscription;
  date: any;
  terapeuta1: any[];
  terapeuta2: any[];
  terapeuta3: any[];
  inscriptionList: any[];
  reportList: any[];
  selectedTurn: TurnModel;
  closeResult: string;
  today:any;
  dd:any;
  mm:any;
  yyyy:any;
  name: string;
  userName:string;

  primero: InscripcionModel = {
    dateInscription: '',
    hourStart: '',
    hourEnd: '',
    userName: 'acabrera32',
    userAssist: 'alejandra',
    therapist: 3,
    boolAny: false
  };

  segundo: ReportsModel = {
    date: 'la fecha',
    hourStart: 'la hora',
    hourEnd: 'hora de termino',
    userName: 'nombre usuario',
    userAssist: 'nombre asistencia',
    boolMatch: false,
    assistance: false,
    boolAny: false
  };

  send: MicrosoftGraph.Event;
  subsSendCalendar: Subscription;
  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private turnoService: TurnosService,
    private inscriptionService: InscriptionService,
    private reportService: ReportService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
      this.subsGetMe = this.homeService.getMe().subscribe(me => {
      this.me = me; 
      let cutName = me.mail.indexOf('@');
      let cutUserName = me.displayName.indexOf(' ');
      this.name = me.mail.substring(0,cutName);
      this.userName = me.displayName.substring(cutUserName+1);
      
      // send name and nameUser to local storage
      localStorage.setItem('name', this.name);
      localStorage.setItem('userName', this.userName);

    });

   
    // get turnos
    this.turnoService.getTurnosT1()
    .snapshotChanges()
    .subscribe(item => {
      this.terapeuta1 = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        this.terapeuta1.push(x);
      });
      
    });

    this.turnoService.getTurnosT2()
    .snapshotChanges()
    .subscribe(item => {
      this.terapeuta2 = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        this.terapeuta2.push(x);
      });
      
    });

    this.turnoService.getTurnosT3()
    .snapshotChanges()
    .subscribe(item => {
      this.terapeuta3 = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        this.terapeuta3.push(x);
      });
      
    });

    // get inscriptions
    this.inscriptionService.getInscriptions()
    .snapshotChanges()
    .subscribe(item => {
      this.inscriptionList = [];
      item.forEach(elem => {
        let x = elem.payload.toJSON();
        x["$key"] = elem.key;
        this.inscriptionList.push(x);
      });
      console.log(this.inscriptionList);
      
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

  ngOnDestroy() {
    this.subsGetUsers.unsubscribe();
  }

  onSendCalendar(){

    this.date = new Date();

    // this.send = {
    //     subject: "soy mariiii",
    //     start: {
    //       dateTime: this.date,
    //       timeZone: "GMT-0500"
    //     },
    //     end: {
    //       dateTime: this.date,
    //       timeZone: "GMT-0500"
    //     }
    // }
    this.subsSendCalendar = this.homeService.sendCalendar(this.send).subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.authService.login();
  }

  onSelectTurn(turn:TurnModel, modal): void{
    if (InscripcionModel){
      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      this.primero.dateInscription = this.getDateFull();
      this.primero.hourStart = this.selectedTurn.hourStart;
      this.primero.hourEnd = this.selectedTurn.hourEnd;
      this.primero.therapist = this.selectedTurn.therapistId;
      this.primero.userAssist = this.name;
      this.primero.userName = this.userName;
      
      this.modalService.open(modal, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } 
  }

  onConfirmTurn (x, modal){
    this.insertInscription(x);
    this.modalService.open(modal, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  insertInscription(x){
    if (InscripcionModel){
          this.inscriptionService.insertInscription(x);
    }
  }

  insertReport(x){
    if (ReportsModel){
          this.reportService.insertReport(x);
    }
  }

  private getDismissReason(reason: any): string {
    this.selectedTurn.available = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private getDateFull(): string{
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth()+1;
    this.yyyy = this.today.getFullYear();

    if(this.dd<10){
      this.dd='0'+this.dd;
    } 
    if(this.mm<10){
      this.mm='0'+this.mm;
    } 
    this.today = this.dd+'/'+this.mm+'/'+this.yyyy;

    return this.today;
  }

}
