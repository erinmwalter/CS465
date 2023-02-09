import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input('trip') trip: any;

  constructor() {}

  ngOnInit(): void {}
}
