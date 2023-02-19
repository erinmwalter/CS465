import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/Trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  //trips: Array<any> = trips;
  trips: Trip[] =[];
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router, private authService: AuthenticationService) {}

  private getTrips(): void {
    console.log('[In TripListingComponent.getTrips');
    this.tripDataService.getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        });
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  public addTrip(): void{
    this.router.navigate(['add-trip']);
  }

  ngOnInit(): void{
    this.getTrips();
  }
}
