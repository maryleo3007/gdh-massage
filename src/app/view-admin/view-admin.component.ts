import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';
import { element } from 'protractor';

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
  public show:boolean;
  public months: any[];
  public years: any[];
  public selectedValue:any;
  public selectedValueYear:any;
  public currentMonth: number;
  public currentYear: number;

  constructor(
    private authFirebaseService: AuthFirebaseService
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.authFirebaseService.getAuth().subscribe(auth => {
      if(auth){
        this.emailUser = auth.email;
        this.isLogin = true;
        if(auth.email === 'aponcedeleon@inteligogroup.com' || auth.email === 'valvarez@inteligogroup.com') {
          this.show = true;
        } else if (auth.email == undefined || auth.email == null){
          this.show  = false;
        }
      }     
    });

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
];

    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();

    this.months = [
      {id: 0, month: monthNames[this.currentMonth], number: this.currentMonth},
      {id: 1, month: monthNames[0], number: 0},
      {id: 2, month: monthNames[1], number: 1},
      {id: 3, month: monthNames[2], number: 2},
      {id: 4, month: monthNames[3], number: 3},
      {id: 5, month: monthNames[4], number: 4},
      {id: 6, month: monthNames[5], number: 5},
      {id: 7, month: monthNames[6], number: 6},
      {id: 8, month: monthNames[7], number: 7},
      {id: 9, month: monthNames[8], number: 8},
      {id: 10, month: monthNames[9], number: 9},
      {id: 11, month: monthNames[10], number: 10},
      {id: 12, month: monthNames[11], number: 11}
    ];

    

// document.write("The current month is " + monthNames[d.getMonth()]);

    this.years = [
      {id: 14, year:this.currentYear},
      {id: 15, year: 2018},
      {id: 16, year: 2019},
      {id: 17, year: 2020},
      {id: 18, year: 2021}
    ]

    this.selectedValue = this.months[0];
    this.selectedValueYear = this.years[0];

    this.years.forEach(element => {
      if(element.year === this.currentYear) {
        var index = element.indexOf([1]);
        console.log(index);
        // console.log(element)
        // console.log();

        // this.selectedValueYear = element.year;
      }
    });
  }
  
  logoutUser() {
    this.authFirebaseService.logout();
  }

  setNewUser(x) {
    console.log(x)
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  // // July
  // daysInMonth(7,2009); // 31
  // // February
  // daysInMonth(2,2009); // 28
  // daysInMonth(2,2008); // 29
  
}
