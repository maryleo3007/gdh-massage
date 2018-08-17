import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class ReportService {
  reports: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  getReports() {
    this.reports = this.firebase.list('reports');
    return this.reports;
  }
}
