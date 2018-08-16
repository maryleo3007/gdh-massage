import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TurnosService {
  turnosList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getTurnos() {
    return (this.turnosList = this.firebase.list('gdh-masajes/terapeuta1'));
  }
}
