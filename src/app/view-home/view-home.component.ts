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
import { LoginComponent } from '../login/login.component';
import { log } from 'util';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {

  private _success = new Subject<string>();
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
  displayName: string;
  countConfirm: number = 0;
  modalSelectTurn: NgbModalRef;
  modalConfirm: NgbModalRef;
  modalOnMessage: NgbModalRef;
  modalUser: any;
  therapistIds: Array<string> = ['terapeuta1', 'terapeuta2', 'terapeuta3'];
  returnThis:boolean = false;
  mail:string;
  ticks:number;  
  staticAlertClosed = false;
  successMessage: string;
  
  primero: InscripcionModel = {
    $key:'',
    dateInscription: '',
    hourStart: '',
    hourEnd: '',
    userName: '',
    userAssist: '',
    therapist: 0,
    boolAny: false,
    stringVal:'',
    type: 'text',
    displayName: '',
    mail:'dfs'
  };

  // segundo: ReportsModel = {
  //   date: 'la fecha',
  //   hourStart: 'la hora',
  //   hourEnd: 'hora de termino',
  //   userName: 'nombre usuario',
  //   userAssist: 'nombre asistencia',
  //   boolMatch: false,
  //   assistance: false,
  //   boolAny: false,
  //   therapist: 1,
  //   userAssistRight: ''
  // };

  user: UserModel = {
    $key: '',
    mail: '',
    reserved: false,
    countReserved: 0,
    // countAgendas: 0
  }

  turno: TurnModel = {
    $key:'',
    available : true,
    confirm: false,
    hourStart: '',
    hourEnd: '',
    therapistId : 0,
    userName:'',
    count:0
  }

  send: MicrosoftGraph.Event;
  subsSendCalendar: Subscription;
  subsCounter: Subscription;

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

    this.subsGetMe = this.homeService.getMe().subscribe(objectMe => {
      this.me = objectMe; 
      let cutName = objectMe.mail.indexOf('@');
      let cutUserName = objectMe.displayName.indexOf(' ');
      this.name = objectMe.mail.substring(0,cutName);
      this.userName = objectMe.displayName.substring(cutUserName+1);
      this.displayName = objectMe.displayName;
      this.mail = objectMe.mail
      console.log(this.me );

      if (this.mail == 'undefined') {
        alert("cargando");
        setTimeout(() =>{
          this.userService.getUser()
          .snapshotChanges()
          .subscribe(item => {
            this.userList = [];
            item.forEach(elem => {
              let x = elem.payload.toJSON();
              x['$key'] = elem.key;
              this.userList.push(x);
            });  
            this.userList.forEach((elem)=>{
              if( elem.mail === this.me.mail ){
                 this.returnThis =  true;
              }
            });
          });
        }, 3000);
      }
      else{
        this.userService.getUser()
        .snapshotChanges()
        .subscribe(item => {
          this.userList = [];
          item.forEach(elem => {
            let x = elem.payload.toJSON();
            x['$key'] = elem.key;
            this.userList.push(x);
          });  
          console.log(this.me);
          this.userList.forEach((elem)=>{
  
            if( elem.mail === this.me.mail ){
               this.returnThis =  true;
            }
          });
        });
      }
      
      
    });
    

    // send name and nameUser to local storage
    localStorage.setItem('name', this.name);
    localStorage.setItem('userName', this.userName);
      
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
     
      //alert messages
      // setTimeout(() => this.staticAlertClosed = true, 20000);
      
      //     this._success.subscribe((message) => this.successMessage = message);
      //     this._success.pipe(
      //       debounceTime(5000)
      // ).subscribe(() => this.successMessage = null);
  }

  ngOnDestroy() {
    this.subsGetUsers.unsubscribe();
  }

  onSendCalendar(user: UserModel){

    console.log(user);
    user.countReserved++;
    this.updateUser(user.$key, user);

    this.date = new Date();
    console.log(this.date);
    
    let send;
    send = {
      subject: "Masajes antiestrés",
      start: {
        dateTime: this.date,
        timeZone: "GMT-0500"
      },
      end: {
        dateTime: this.date,
        timeZone: "GMT-0500"
      }
  }

    this.send = send;
    this.subsSendCalendar = this.homeService.sendCalendar(this.send).subscribe();
    
    
  }

  onSelectTurn1(user: UserModel, turn:TurnModel, modal): void{

      let userExist  = false;
      this.user.mail = this.me.mail;

      this.userList.forEach((elem)=>{
        if( elem.mail === this.me.mail ){
          userExist = true;
        }
      });

      if (userExist == false) {
        this.insertUser(this.user);
      }

      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
      
      let timer;
      this.ticks = 60;
      timer = Observable.timer(1000,1000);
      this.subsCounter  = timer.subscribe(t=>{
        this.ticks--;
      });
      
      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {    
        this.selectedTurn.available = true;
        this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
        this.closeResult = `Closed with: ${result}`;
        this.subsCounter.unsubscribe();
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
        this.subsCounter.unsubscribe();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      setTimeout(()=>{  
        this.modalSelectTurn.close();       
      }, 60000);
  }

  onSelectTurn2(user: UserModel, turn:TurnModel, modal): void{

      let userExist  = false;
      this.user.mail = this.me.mail;

      this.userList.forEach((elem)=>{
        if( elem.mail === this.me.mail ){
          userExist = true;
        }
      });

      if (userExist == false) {
        this.insertUser(this.user);
      }
    
      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);

      let timer;
      this.ticks = 60;
      timer = Observable.timer(1000,1000);
      this.subsCounter  = timer.subscribe(t=>{
        this.ticks--;
      });

      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {    
        this.selectedTurn.available = true;
        this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
        this.closeResult = `Closed with: ${result}`;
        this.subsCounter.unsubscribe();
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
        this.subsCounter.unsubscribe();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }); 
      setTimeout(()=>{   
        this.modalSelectTurn.close();
      }, 60000);
  }


  onSelectTurn3(user: UserModel, turn:TurnModel, modal): void{

      let userExist  = false;
      this.user.mail = this.me.mail;

      this.userList.forEach((elem)=>{
        if( elem.mail === this.me.mail ){
          userExist = true;
        }
      });

      if (userExist == false) {
        this.insertUser(this.user);
      }
    
      this.selectedTurn = turn;
      this.selectedTurn.available = false;
      
      this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);

      let timer;
      this.ticks = 60;
      timer = Observable.timer(1000,1000);
      this.subsCounter  = timer.subscribe(t=>{
        this.ticks--;
      });

      this.modalSelectTurn  = this.modalService.open(modal, { centered: true });
      this.modalSelectTurn.result.then((result) => {  
        this.selectedTurn.available = true;
        this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);  
        this.closeResult = `Closed with: ${result}`;
        this.subsCounter.unsubscribe();
      }, (reason) => {
        this.selectedTurn.available = true;
        this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);  
        this.subsCounter.unsubscribe();
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      setTimeout(()=>{   
        this.modalSelectTurn.close();
      }, 10000);
  }

  onConfirmTurn1 (user: UserModel, x, modal){
    this.selectedUser = user;
    this.selectedUser.reserved = true;

    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;
    this.primero.displayName = this.displayName;
    this.primero.mail = this.mail;

    this.insertInscription(x);
    this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
    this.updateUser(user.$key,this.selectedUser);

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

  onConfirmTurn2 (user: UserModel, x, modal){

    this.selectedUser = user;
    this.selectedUser.reserved = true;

    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;
    this.primero.displayName = this.displayName;
    this.primero.mail = this.mail;

    this.insertInscription(x);
    this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
    this.updateUser(user.$key,this.selectedUser);

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

  onConfirmTurn3 (user: UserModel, x, modal){

    this.selectedUser = user;
    this.selectedUser.reserved = true;

    this.selectedTurn.confirm = true;
    this.selectedTurn.userName =  this.name;
    this.selectedTurn.count++

    this.primero.dateInscription = this.getDateFull();
    this.primero.hourStart = this.selectedTurn.hourStart;
    this.primero.hourEnd = this.selectedTurn.hourEnd;
    this.primero.therapist = this.selectedTurn.therapistId;
    this.primero.userAssist = this.userName;
    this.primero.userName = this.name;
    this.primero.displayName = this.displayName;
    this.primero.mail = this.mail;

    this.insertInscription(x);
    this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
    this.updateUser(user.$key,this.selectedUser);
    
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
  
    onMessageSelect(modal){
      this.modalOnMessage =  this.modalService.open(modal,{centered: true});
      this.modalOnMessage.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    cancelTurn1(user: UserModel, inscription: InscripcionModel){     
      
      this.selectedTurn.available = true;
      this.selectedTurn.confirm = false;
      this.selectedTurn.userName = '';
      user.reserved = false;
      this.selectedTurn.count--;
      this.updateTurn1(this.selectedTurn.$key, this.selectedTurn);
      this.updateUser(user.$key,user);
      this.onDelete(inscription.$key);   
      this.modalSelectTurn.close();
      
      if(this.modalConfirm){
        this.modalConfirm.close();
      }
    }
  
    cancelTurn2(user: UserModel, inscription: InscripcionModel){
      this.selectedTurn.available = true;
      this.selectedTurn.confirm = false;
      this.selectedTurn.userName = '';
      user.reserved = false;
      this.selectedTurn.count--;
      this.updateTurn2(this.selectedTurn.$key, this.selectedTurn);
      this.updateUser(user.$key,user);
      this.onDelete(inscription.$key);

      this.modalSelectTurn.close();

      if(this.modalConfirm){
        this.modalConfirm.close();
      }
    }
  
    cancelTurn3(user: UserModel, inscription: InscripcionModel){
      this.selectedTurn.available = true;
      this.selectedTurn.confirm = false;
      this.selectedTurn.userName = '';
      user.reserved = false;
      this.selectedTurn.count--;
      this.updateTurn3(this.selectedTurn.$key, this.selectedTurn);
      this.updateUser(user.$key,user);
      this.onDelete(inscription.$key);

      this.modalSelectTurn.close();
      if(this.modalConfirm){
        this.modalConfirm.close();
      }
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

  insertTurn2(x){
    if (TurnModel) {
      this.turnoService.inserTurn2(x);
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

  updateUser(key, x){
    this.userService.updateUser(key,x);
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
