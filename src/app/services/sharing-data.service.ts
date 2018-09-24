import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class SharingDataService {

  currentBool: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getCuurentBool() {
    this.currentBool = this.firebase.list('sharingData');   
    return this.currentBool;
  }

  updateCurentBool($key:string, bool: boolean){
    this.currentBool.update($key, {
      boolVal: bool
    });
  }

}
