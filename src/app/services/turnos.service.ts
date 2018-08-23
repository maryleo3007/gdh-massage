import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TurnModel } from './../models/turns';

@Injectable()
export class TurnosService {
  terapeuta1: AngularFireList<any>;
  terapeuta2: AngularFireList<any>;
  terapeuta3: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  // getTurnos() {
  //   return (this.turnosList = this.firebase.list('gdh-masajes/terapeuta1'));
  // }

  getTurnosT1() {
    this.terapeuta1 = this.firebase.list('terapeuta1');
    return this.terapeuta1;
  }

  getTurnosT2() {
    this.terapeuta2 = this.firebase.list('terapeuta2');
    return this.terapeuta2;
  }

  getTurnosT3() {
    this.terapeuta3 = this.firebase.list('terapeuta3');
    return this.terapeuta3;
  }

  updateTurn1(key:string, turn: TurnModel)
    {
      this.terapeuta1.update(turn.$key, {
        available: turn.available,
        confirm: turn.confirm,
        userName: turn.userName
      });
    }
  
    updateTurn2(key:string, turn: TurnModel)
    {
      this.terapeuta2.update(turn.$key, {
        available: turn.available,
        confirm: turn.confirm,
        userName: turn.userName
      });
    }
  
    updateTurn3(key:string, turn: TurnModel)
    {
      this.terapeuta3.update(turn.$key, {
        available: turn.available,
        confirm: turn.confirm,
        userName: turn.userName
      });
    }
}
