import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpUserEvent } from '@angular/common/http';
import { Trip } from '../models/Trip';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private httpClient: HttpClient, @Inject(BROWSER_STORAGE) private storage:Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]> {
      console.log('[In TripDataService.getTrips]');
      return this.httpClient 
             .get(`${this.apiBaseUrl}trips`)
             .toPromise()
             .then((response:any)=> response as Trip[])
             .catch(this.handleError);
  };

  public addTrip(formData: Trip): Promise<Trip>{
    console.log('[In TripDataService.addTrip]');
    const token = this.storage.getItem('travlr-token');
    const headers = {'Authorization' : `Bearer ${token}`};
    //console.log(formData);
    return this.httpClient.post(`${this.apiBaseUrl}trips/addTrip`, formData, {'headers': headers})
                    .toPromise()
                    .then((response:any) => response as Trip[])
                    .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip>{
    console.log('[In TripDataService.getTrip]');
    return this.httpClient.get(this.tripUrl + tripCode)
               .toPromise()
               .then(response => response as Trip)
               .catch(this.handleError);
  }

  public updateTrip(formData: Trip):Promise<Trip>{
    console.log('[In TripDataService.updateTrip]');
    const token = this.storage.getItem('travlr-token');
    const headers = {'Authorization' : `Bearer ${token}`};
    //console.log(formData);
    return this.httpClient.put(this.tripUrl + formData.code, formData, {'headers': headers})
                    .toPromise()
                    .then((response:any) => response as Trip[])
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user:User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.httpClient
                .post(url, user)
                .toPromise()
                .then(response => response as AuthResponse)
                .catch(this.handleError);
  }

}
