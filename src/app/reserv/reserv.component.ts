import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reserv } from '../interfaces/reserv.interface';
import { ReservsService } from '../services/reservs.service';

@Component({
  selector: 'app-reserv',
  templateUrl: './reserv.component.html',
  styleUrls: ['./reserv.component.css']
})

export class ReservComponent implements OnInit {
   
  reserv: Reserv = {
    hourStart: "3:40",
    hourEnd: "4:00",
    available: false,
    count: 0
  }

  constructor( private _reservsService: ReservsService ) { }

  ngOnInit() {
  }

  guardar(){
    console.log(this.reserv);
    // console.log(this.dataTurn);
    
    this._reservsService.newReserv(this.reserv)
        .subscribe(data =>{
            console.log(data);
            // this.routes.navigate(['/reserv',data.name]);
            
        }, error => console.log(error))
  }

}
