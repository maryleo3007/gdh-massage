/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { AuthFirebaseService } from './services/auth-firebase.service';

// import angular firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// enviroment - config firebase
import { environment } from '../environments/environment';
import { ViewHomeComponent } from './view-home/view-home.component';
import { LoginFbComponent } from './login-fb/login-fb.component';
import { ViewCoorComponent } from './view-coor/view-coor.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

// guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: ViewLoginComponent },
  { path: 'home', component: ViewHomeComponent },
  { path: 'login', component: LoginFbComponent },
  { path: 'coordi', component: ViewCoorComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: ViewAdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViewLoginComponent,
    ViewHomeComponent,
    LoginFbComponent,
    ViewCoorComponent,
    ViewAdminComponent
  ],
  imports: [
AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuard,
    HomeService,
    TurnosService,
    ReportService,
    InscriptionService,
    AuthFirebaseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
