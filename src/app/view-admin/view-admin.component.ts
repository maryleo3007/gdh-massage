import { Component, OnInit} from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';
import { ReportService } from '../services/report.service';
import { UserService } from './../services/user.service';
import { Report2Service } from './../services/report2.service';

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
  public show: boolean;
  public months: any[];
  public years: any[];
  public days: any[];
  public selectedValue: any;
  public selectedValueYear: any;
  public currentMonth: any;
  public currentYear: number;
  public dayOfMonthArr:any[];
  report2List: any[];
  reporListDate: any[];
  reportList: any[];
  datesArray: any[];
  cloneReport: any[];
  reportList2: any[];
  arrayArray: any[];
  monthArray: any[];
  id1: any = 0;
  

  // public valAsist: string;


  constructor(
    private authFirebaseService: AuthFirebaseService,
    private reportService: ReportService,
    private report2Service: Report2Service,
    // private titlecasePipe:TitleCasePipe
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.authFirebaseService.getAuth().subscribe(auth => {
      if (auth) {
        this.emailUser = auth.email;
        this.isLogin = true;
        if (auth.email === 'aponcedeleon@inteligogroup.com' || auth.email === 'valvarez@inteligogroup.com') {
          this.show = true;
        } else if (auth.email == undefined || auth.email == null) {
          this.show = false;
        }
      }
    });

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    this.currentMonth = new Date().getMonth() + 1;
    if (this.currentMonth < 10) {
      this.currentMonth = '0' + this.currentMonth;
    }
    this.currentYear = new Date().getFullYear();
  
    this.months = [
      { id: 0, month: monthNames[parseInt(this.currentMonth)-1], number: this.currentMonth },
      { id: 1, month: monthNames[0], number: '01' },
      { id: 2, month: monthNames[1], number: '02' },
      { id: 3, month: monthNames[2], number: '03' },
      { id: 4, month: monthNames[3], number: '04' },
      { id: 5, month: monthNames[4], number: '05' },
      { id: 6, month: monthNames[5], number: '06' },
      { id: 7, month: monthNames[6], number: '07' },
      { id: 8, month: monthNames[7], number: '08' },
      { id: 9, month: monthNames[8], number: '09' },
      { id: 10, month: monthNames[9], number: '10' },
      { id: 11, month: monthNames[10], number: '11' },
      { id: 12, month: monthNames[11], number: '12' }
    ];

    this.years = [
      { id: 14, year: this.currentYear },
      { id: 15, year: 2018 },
      { id: 16, year: 2019 },
      { id: 17, year: 2020 },
      { id: 18, year: 2021 }
    ]



    this.selectedValue = this.months[0];
    this.selectedValueYear = this.years[0];
    var currentDate = '/'+this.currentMonth+'/'+ this.currentYear
    
    
    this.years.forEach(element => {
      if (element.year === this.currentYear) {
      }
    });

    this.reportService.getReports()
      .snapshotChanges()
      .subscribe(item => {
        this.reportList = [];
        this.datesArray = [];
        this.cloneReport = [];
        this.monthArray = [];
        item.forEach(elem => {
          let x = elem.payload.toJSON();
          x['$key'] = elem.key;
          if(x['date'].substring(3) === `${this.selectedValue.number}/${this.selectedValueYear.year.toString()}`) {
            if(!(this.datesArray.includes(x['mail']))) {  
              this.datesArray.push(x['mail']);         
          } else {
            this.id1 = this.id1 + 1; 
          }
          x['numbersDates'] = this.datesArray.length;
          x['userAssistRight'] = x['userAssistRight'].replace(/\b\w/g, l => l.toUpperCase());
          this.reportList.push(x);     
              
          } 
        })
        for (let index = 0; index < this.reportList.length; index++) {
          var x = 0;
          const element = this.reportList[index];
          this.cloneReport.push(element);
          if(element === this.cloneReport[index]) {
            x = x + 1;
          }         
        } 
      })  
      
      //get reports2
      this.report2Service.getReports2()
      .snapshotChanges()
      .subscribe(item =>{
        this.report2List = [];
        this.arrayArray = [];
        item.forEach(elem => {
          let x = elem.payload.toJSON();
          x['$key'] = elem.key;  
          this.report2Service.getReportsDate(elem.key)
          .snapshotChanges()
          .subscribe(item1 => {
            this.reporListDate = [];
            item1.forEach(e => {
              let y = e.payload.toJSON();
              y['$key'] = e.key;
              this.reporListDate.push(y);
            });       
            this.reporListDate.forEach(element => {
              console.log(element.dates);
              
              if(element['dates'].substring(3) === `${this.selectedValue.number}/${this.selectedValueYear.year.toString()}`) {
                this.arrayArray.push(element);
                
                if(!this.report2List.includes(x)) {
                  Object.keys(x['dates']).length;
                  this.report2List.push(x)   
                }
              }
              this.arrayArray.forEach(elem => {
                if(!this.monthArray.includes(elem['dates'])) {
                  this.monthArray.push(elem['dates']);
                }
                
            });
            // console.log(this.monthArray);

              
            })         
          });
        }); 
               
      });
      
  }

  getDates(x) {
    this.report2Service.getReportsDate(x);
  }

  logoutUser() {
    this.authFirebaseService.logout();
  }

  selectYear(x) {
  }

  selectMonth(x) {
  }

  getRepostRequest(month,year) {
    this.selectMonth(month);
    this.selectYear(year);
    let currentMonth = month.number;
    let currentYear = year.year.toString();
    this.report2Service.getReports2()
      .snapshotChanges()
      .subscribe(item =>{
        this.report2List = [];
        this.arrayArray = [];
        item.forEach(elem => {
          let x = elem.payload.toJSON();
          x['$key'] = elem.key;  
          this.report2Service.getReportsDate(elem.key)
          .snapshotChanges()
          .subscribe(item1 => {
            this.reporListDate = [];
            item1.forEach(e => {
              let y = e.payload.toJSON();
              y['$key'] = e.key;
              this.reporListDate.push(y);
            });       
            this.reporListDate.forEach(element => {
              if(element['dates'].substring(3) === `${currentMonth}/${currentYear}`) {
                this.arrayArray.push(element);
                if(!this.report2List.includes(x)) {
                  this.report2List.push(x)   
                }
              }
            });
            this.monthArray = []
            this.arrayArray.forEach(elem => {

              if(!this.monthArray.includes(elem['dates'])) {
                
                this.monthArray.push(elem['dates']);
              }
              
          });
          });
        });        
      });
  }
}
