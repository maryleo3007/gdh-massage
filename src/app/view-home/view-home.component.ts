import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// services
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { TurnosService } from './../services/turnos.service';
import { InscriptionService } from './../services/inscription.service';
import { ReportService } from './../services/report.service';
import { UserService } from './../services/user.service';

// models
import { InscripcionModel } from './../models/inscriptions';
import { ReportsModel } from './../models/reports';
import { TurnModel } from './../models/turns';
import { UserModel } from './../models/users';

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
  userList: any[];
  selectedTurn: TurnModel;
  selectedUser: UserModel;
  closeResult: string;
  today:any;
  dd:any;
  mm:any;
  yyyy:any;
  name: string;
  userName:string;
  countConfirm: number = 0;
  modalSelectTurn: NgbModalRef;
  modalConfirm: NgbModalRef;
  userReserved: string = "false";
  therapistIds: Array<string> = ['terapeuta1', 'terapeuta2', 'terapeuta3'];
  usersList: any[] = [];
  
  primero: InscripcionModel = {
    $key:'',
    dateInscription: '',
    hourStart: '',
    hourEnd: '',
    userName: '',
    userAssist: '',
    therapist: 0,
    boolAny: false,
    stringVal:''
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

  user: UserModel = {
    $key: '',
    mail: '',
    reserved: false,
    countReserved: -1
  }

  send: MicrosoftGraph.Event;
  subsSendCalendar: Subscription;

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private turnoService: TurnosService,
    private inscriptionService: InscriptionService,
    private reportService: ReportService,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
      
    this.subsGetMe = this.homeService.getMe().subscribe(me => {
      this.me = me; 
      let cutName = me.mail.indexOf('@');
      let cutUserName = me.displayName.indexOf(' ');
      this.name = me.mail.substring(0,cutName);
      this.userName = me.displayName.substring(cutUserName+1);
    });
    
    // send name and nameUser to local storage
    localStorage.setItem('name', this.name);
    localStorage.setItem('userName', this.userName);
    console.log(localStorage.getItem('userReserved'));
    // this.userReserved = localStorage.getItem('userReserved');
    this.userReserved = 'false';
      
    // get turnos

      // this.therapistIds.forEach((elemento,index)=>{
      //   console.log(elemento,index);
      //   // this.terapeuta1[index] = elemento;
        
      //   this.turnoService.getTurnos(elemento)
      //   .snapshotChanges()
      //   .subscribe(item => {   
      //     // this.terapeuta1 = [];
      //     this.terapeuta1[index]= [];
          
      //     console.log(this.terapeuta1[index]);
          
      //     item.forEach(elem => {
      //       let x = elem.payload.toJSON();
      //       x["$key"] = elem.key;
      //       // this.terapeuta1.push(x);
      //       this.terapeuta1[index].push(x);
      //     });
      //     console.log(this.terapeuta1[index]);
      //   });
      // });

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
        });
      });

      //get users
      this.userService.getUser()
      .snapshotChanges()
      .subscribe(item => {
        this.userList = [];
        item.forEach(elem => {
          let x = elem.payload.toJSON();
          x['$key'] = elem.key;
          this.userList.push(x);
        });
        this.usersList = this.userList;
      });
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

  onSelectTurn1(user: UserModel, turn:TurnModel, modal): void{

      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);

      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {    
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  onSelectTurn2(user: UserModel, turn:TurnModel, modal): void{
    
      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);

      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {    
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }); 
  }

  onSelectTurn3(user: UserModel, turn:TurnModel, modal): void{
    
      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);

      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {    
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  onConfirmTurn1 (x, modal){
    let userExist  = false;
    this.user.mail = this.me.mail;

    this.userList.forEach((elem)=>{
      if( elem.mail === this.me.mail ){
        userExist = true;
      }
    });

    if (userExist == false) {
      this.user.reserved = true;
      this.insertUser(this.user);
    }

    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;

    this.insertInscription(x);
    this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
    this.userReserved = "true";
    
    localStorage.setItem('userReserved', this.userReserved);

    this.modalSelectTurn.close();
    this.modalConfirm =  this.modalService.open(modal, { centered: true });
    this.modalConfirm.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.selectedTurn.available = true;
      this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
    });

  }

  onConfirmTurn2 (x, modal){
    
    let userExist  = false;
    this.user.mail = this.me.mail;

    this.userList.forEach((elem)=>{
      if( elem.mail === this.me.mail ){
        userExist = true;
      }
    });

    if (userExist == false) {
      this.user.reserved = true;
      this.insertUser(this.user);
    }

    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;

    this.insertInscription(x);
    this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
    this.userReserved = "true";

    localStorage.setItem('userReserved', this.userReserved);
    
    this.modalSelectTurn.close();
    this.modalConfirm =  this.modalService.open(modal, { centered: true });
    this.modalConfirm.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.selectedTurn.available = true;
      this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  onConfirmTurn3 (x, modal){
    
    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;

    this.insertInscription(x);
    this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
    this.userReserved = "true";
    
    this.modalSelectTurn.close();
    this.modalConfirm =  this.modalService.open(modal, { centered: true });
    this.modalConfirm.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.selectedTurn.available = true;
      this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
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

  insertUser(x){
    if (UserModel){
      this.userService.insertUser(x);
    }
  }

  updateTurn1(key, x){
    this.turnoService.updateTurn1(key,x);
  }

  updateTurn2(key, x){
    this.turnoService.updateTurn2(key,x);
  }

  updateTurn3(key, x){
    this.turnoService.updateTurn3(key,x);
  }

  cancelTurn1(inscription: InscripcionModel){
    this.selectedTurn.available = true;
    this.selectedTurn.confirm = false;
    this.selectedTurn.userName = '';
    this.userReserved = "false";
    this.selectedTurn.count--
    this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
    this.onDelete(inscription.$key);

    localStorage.setItem('userReserved', this.userReserved);
    this.modalConfirm.close();
    this.modalSelectTurn.close();
  }

  cancelTurn2(x){
    this.selectedTurn.available = true;
    this.selectedTurn.confirm = false;
    this.selectedTurn.userName = '';
    this.userReserved = "false";
    this.selectedTurn.count--
    this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
    // this.onDelete(x.$key);
    this.modalConfirm.close();
    this.modalSelectTurn.close();
  }

  cancelTurn3(x){
    this.selectedTurn.available = true;
    this.selectedTurn.confirm = false;
    this.selectedTurn.userName = '';
    this.userReserved = "false";
    this.selectedTurn.count--
    this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
    // this.onDelete(x.$key);
    this.modalConfirm.close();
    this.modalSelectTurn.close();
  }

  onDelete($key: string) {
    this.inscriptionService.deleteInscription($key);
  }

  onLogout() {
    this.authService.logout();
  }

  private getDismissReason(reason: any): string {
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
