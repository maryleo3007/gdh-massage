import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import {Reserv} from "../interfaces/reserv.interface";
import 'rxjs/Rx';

@Injectable()
export class ReservsService {

  reservFireUrl: string = "https://gdh-masajes.firebaseio.com/terapeuta3.json"

  constructor(private http:Http) { }

  newReserv( reserv: Reserv) {
    let body = JSON.stringify(reserv);
    let headers = new Headers({
      'Content-Type' : 'application/json'
    });

  return this.http.post(this.reservFireUrl, body, {headers})
         .map(
           res => {
             console.log(res.json());
             return res.json();
           }
         );

  }
}
