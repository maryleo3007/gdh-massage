/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { HttpService } from './shared/http.service';
import { AuthService } from './auth/auth.service';
import { HomeService } from './home/home.service';
import { ViewLoginComponent } from './view-login/view-login.component';

const routes: Routes = [
  { path: '', component: ViewLoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViewLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpService,
    AuthService,
    HomeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
