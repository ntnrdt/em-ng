import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IEvent } from './shared';

@Component({
  template: `
    <div>
        <h1>Upcoming Events</h1>
        <hr>
        <div class="col-md-6" *ngFor="let item of events">
            <event-thumbnail (click)="handleThumbnailClick(item.name)" [event]="item"></event-thumbnail>
        </div>
    </div>
    `
})

export class EventListComponent implements OnInit {
  events: IEvent[];
  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events']
  }

  handleThumbnailClick(eventName) {
    this.toastr.success(eventName);
  }
}
