/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpService } from './shared/http.service';
import { AuthService } from './auth/auth.service';
import { HomeService } from './home/home.service';
import { ViewLoginComponent } from './view-login/view-login.component';
import { TurnosService } from './services/turnos.service';
import { ReportService } from './services/report.service';
import { InscriptionService } from './services/inscription.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// import angular firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// enviroment - config firebase
import { environment } from '../environments/environment';
import { ViewHomeComponent } from './view-home/view-home.component';

const routes: Routes = [
  { path: '', component: ViewLoginComponent },
  { path: 'home', component: ViewHomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViewLoginComponent,
    ViewHomeComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    // BsModalService.forRoot()
  ],
  providers: [
    HttpService,
    AuthService,
    HomeService,
    TurnosService,
    ReportService,
    InscriptionService,
    BsModalService,
    BsModalRef
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
