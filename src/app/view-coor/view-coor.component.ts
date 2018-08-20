import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from './../services/auth-firebase.service';


@Component({
  selector: 'app-view-coor',
  templateUrl: './view-coor.component.html',
  styleUrls: ['./view-coor.component.css']
})
export class ViewCoorComponent implements OnInit {

  constructor(
    private authFirebaseService: AuthFirebaseService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authFirebaseService.logout();
  }
}
