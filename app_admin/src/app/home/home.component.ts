import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthenticationService]
})
export class HomeComponent {
  constructor(
    private authenticationService: AuthenticationService
   ) { }
   
  ngOnInit(){}
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
   }
}
