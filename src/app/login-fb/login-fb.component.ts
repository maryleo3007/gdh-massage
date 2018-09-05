import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login-fb',
  templateUrl: './login-fb.component.html',
  styleUrls: ['./login-fb.component.css']
})
export class LoginFbComponent implements OnInit {
  public email: string;
  public password: string;
  public err: any;

  constructor(
    public authService: AuthFirebaseService,
    public router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.authService.getAuth().subscribe(auth => {
          if (
            auth.email === 'aponcedeleon@inteligogroup.com' ||
            auth.email === 'valvarez@inteligogroup.com'
          ) {
            this.router.navigate(['/admin']);
            // console.log('es vania o aurora')
          } else if (
            auth.email === 'coordinadora@inteligogroup.com' ||
            auth.email === 'acabrera@inteligogroup.com' ||
            auth.email === 'kalejo@inteligogroup.com' ||
            auth.email === 'mllamocca@inteligogroup.com' ||
            auth.email === 'linga@inteligogroup.com'
          ) {
            this.router.navigate(['/coordi']);
            // console.log('coordinadora')
          } 
        });
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
        this.err = err.code;
        if (this.err !== undefined) {
          this.err = 'Correo o contraseña inválida';
        }
      });
  }

}
