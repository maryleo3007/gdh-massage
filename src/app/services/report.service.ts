import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ReportsModel } from '../models/reports';

@Injectable()
export class ReportService {
  reportList: AngularFireList<any>;
  newReport: ReportsModel = new ReportsModel();
  constructor(private firebase: AngularFireDatabase) { }

  getReports() {
    this.reportList = this.firebase.list('reports');
    return this.reportList;
  }

  insertReport(report: ReportsModel) {
    this.reportList.push({
      date: report.date,
      hourStart: report.hourStart,
      hourEnd: report.hourEnd,
      userName: report.userName,
      userAssist: report.userAssist,
      boolMatch: report.boolMatch,
      assistance: report.assistance,
      boolAny: report.boolAny
    })
  }
}
