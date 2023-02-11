import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/Trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private httpClient: HttpClient) { }

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
    //console.log(formData);
    return this.httpClient.post(`${this.apiBaseUrl}trips/addTrip`, formData)
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
    //console.log(formData);
    return this.httpClient.put(this.tripUrl + formData.code, formData)
                    .toPromise()
                    .then((response:any) => response as Trip[])
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
