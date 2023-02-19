import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  formError: string = '';
  user:User = {name: '', password: '', email:''};

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (this.user.email === '' || this.user.password === '') 
    {
      this.formError = 'All fields are required, please try again';
    } 
    else 
    {
      this.doLogin();
    }
  }

  private doLogin(): void {
    console.log("email" + this.user.email);
    console.log("password" + this.user.password);
    this.authenticationService.login(this.user)
            .then(() => this.router.navigateByUrl('#'))
            .catch((message) => this.formError = message);
  }
}
