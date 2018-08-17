import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TurnosService {
  turnosList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  // getTurnos() {
  //   return (this.turnosList = this.firebase.list('gdh-masajes/terapeuta1'));
  // }

  getTurnos() {
    this.turnosList = this.firebase.list('gdh-masajes/terapeuta1');
    return this.turnosList;
  }
}
