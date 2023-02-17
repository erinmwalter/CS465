import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private tripDataService: TripDataService
 ) { }

 public getToken(): string | null {
    return this.storage.getItem('travlr-token');
 }

 public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
 }
 public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
          .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
 }

 public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
          .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
 }

 public logout(): void {
    this.storage.removeItem('travlr-token');
 }

 public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } 
    else {
      return false;
    }
 }

 public getCurrentUser(): User | undefined {
  if (this.isLoggedIn()) {
    const token = this.getToken();
    if(token != null){
      const { email, name } = JSON.parse((token.split('.')[1]));
      return { email, name } as User;
    }
  }
  return undefined;
 }
 }
 
