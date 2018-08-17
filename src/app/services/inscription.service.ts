import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { InscripcionModel } from './../models/inscriptions';

@Injectable()
export class InscriptionService {
  inscriptionList: AngularFireList<any>;
  newInscription = { inscriptionModel: new InscripcionModel};

  constructor(private firebase: AngularFireDatabase) { }

  getInscriptions() {
    this.inscriptionList = this.firebase.list('inscriptions');
    return this.inscriptionList;
  }

  insertInscription(inscription: InscripcionModel){
    this.inscriptionList.push({
      date: inscription.date,
      hourStart: inscription.hourStart,
      hourEnd: inscription.hourEnd,
      userName: inscription.userName,
      boolAny: inscription.boolAny
    })
  }

}
