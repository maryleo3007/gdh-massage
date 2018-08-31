import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TurnModel } from './../models/turns';
import { UserModel } from './../models/user';



@Injectable()
export class UserService {

  userList: AngularFireList<any>;
  newUser: UserModel = new UserModel();

  constructor(private firebase:AngularFireDatabase) { }

  getUser(){
    this.userList = this.firebase.list('users');
    return this.userList;
  }

  insertUser(user: UserModel){
    this.userList.push({
      mail: user.mail,
      reserved: user.reserved,
      countReserved: user.countReserved
    });
  }

}

