import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  declare userEmail: String;
  declare userPassword: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.validate(this.userEmail,this.userPassword)
    .then((response: any) => {
      this.authService.setUserInfo({'user': response['user']});
      this.router.navigate(['/dashboard'])
    })
  }

}
