import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

// services
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { TurnosService } from './../services/turnos.service';
import { InscriptionService } from './../services/inscription.service';
import { ReportService } from './../services/report.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  primero: InscripcionModel = {
    date: 'la fecha',
    hourStart: 'la hora',
    hourEnd: 'hora de termino',
    userName: 'nombre usuario',
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
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.subsGetMe = this.homeService.getMe().subscribe(me => {
      this.me = me; 
      let cutName = me.mail.indexOf('@');
      let cutUserName = me.displayName.indexOf(' ');
      let name = me.mail.substring(0,cutName);
      let userName = me.displayName.substring(cutUserName+1);
      
      // send name and nameUser to local storage
      localStorage.setItem('name', name);
      localStorage.setItem('userName', userName);
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
      console.log(this.terapeuta1);
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
      console.log(this.terapeuta2);
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
      console.log(this.terapeuta3);
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

  insertInscription(x){
    if (InscripcionModel){
          this.inscriptionService.insertInscription(x);
    }
  }

  insertReport(x){
    if (ReportsModel){
          this.reportService.insertReport(x);
          console.log(x)
    }
  }

  onSelectTurn(turn:TurnModel): void{
    this.selectedTurn = turn;
    console.log(this.selectedTurn);
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
