import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

@Component({
  template: `
    <div>
        <h1>Upcoming Events</h1>
        <hr>
        <div class="col-md-6" *ngFor="let item of events">
            <event-thumbnail [event]="item"></event-thumbnail>
        </div>
    </div>
    `
})

export class EventListComponent implements OnInit {
  events: IEvent[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }
}
