import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';
import { element } from 'protractor';
import { ReportService } from '../services/report.service';

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
  public selectedValue: any;
  public selectedValueYear: any;
  public currentMonth: any;
  public currentYear: number;
  reportList: any[];
  datesArray: any[];
  id1: any = 0;
  id2: any = 0;
  id3: any = 0;
  id4: any = 0;
  id5: any = 0;
  // public valAsist: string;


  constructor(
    private authFirebaseService: AuthFirebaseService,
    private reportService: ReportService
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

    this.currentMonth = new Date().getMonth() + 1;
    if (this.currentMonth < 10) {
      this.currentMonth = '0' + this.currentMonth;
    }
    this.currentYear = new Date().getFullYear();
    console.log(this.currentMonth);
    

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

    this.years.forEach(element => {
      if (element.year === this.currentYear) {
      }
    });

    this.reportService.getReports()
      .snapshotChanges()
      .subscribe(item => {
        this.reportList = [];
        this.datesArray = [];
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
          this.reportList.push(x);
          } 
        })
      })

      console.log(this.selectedValueYear);
      
  }

  logoutUser() {
    this.authFirebaseService.logout();
  }

  selectYear(x) {
    // var year = x.year.toString()
    x = this.selectedValueYear;
    // x = x.year.toString();
    // this.selectedValueYear = x;
    // console.log(this.selectedValueYear)
    console.log(x.year.toString());
    
  }

  selectMonth(x) {
    x = this.selectedValue;
    // this.selectedValue = x.number
    console.log(this.selectedValue.number);  
      
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  // // July
  // daysInMonth(7,2009); // 31
  // // February
  // daysInMonth(2,2009); // 28
  // daysInMonth(2,2008); // 29

}
