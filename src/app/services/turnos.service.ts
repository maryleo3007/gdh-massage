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

  inserTurn2(turn2: TurnModel){
    this.terapeuta2.push({
      available: turn2.available,
      confirm: turn2.confirm,
      hourEnd: turn2.hourEnd,
      hourStart: turn2.hourStart,
      therapistId: turn2.therapistId,
      count: turn2.count,
      userName: turn2.userName
    });
  }

  updateTurn1(key:string, turn: TurnModel){
      this.terapeuta1.update(turn.$key, {
        available: turn.available,
        confirm: turn.confirm,
        userName: turn.userName,
        count:turn.count
      });
  }
  
  updateTurn2(key:string, turn: TurnModel){
    this.terapeuta2.update(turn.$key, {
      available: turn.available,
      confirm: turn.confirm,
      userName: turn.userName,
      count:turn.count
    });
  }

  updateTurn3(key:string, turn: TurnModel){
    this.terapeuta3.update(turn.$key, {
      available: turn.available,
      confirm: turn.confirm,
      userName: turn.userName,
      count:turn.count
    });
  }

  updatet1Turn1($key:string) {
    this.terapeuta1.update($key, {
      available: true,
      confirm: false,
      userName: '',
      count: 0
    })
  }

  updatet2Turn1($key:string) {
    this.terapeuta2.update($key, {
      available: true,
      confirm: false,
      userName: '',
      count: 0
    })
  }

  updatet3Turn1($key:string) {
    this.terapeuta3.update($key, {
      available: true,
      confirm: false,
      userName: '',
      count: 0
    })
  }
}
