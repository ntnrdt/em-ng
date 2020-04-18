import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, IEvent } from './shared';

@Component({
    templateUrl: './create-event.component.html',
    styles: [`
      em { float: right; color: #E05C65; padding-left: 10px; }
      .error input { background-color: #E3C3C5; }
      .error ::-webkit-input-placeholder { color: #999;}
      .error ::-moz-placeholder { color: #999;}
      .error :-moz-placeholder { color: #999;}
      .error :ms-input-placeholder { color: #999;}
    `]
})
export class CreateEventComponent implements OnInit {
    event: IEvent;
    isDirty: boolean = true;

    constructor(private router: Router,
        private eventService: EventService) { }

    ngOnInit() {
        this.event = {
            id: 0,
            name: '',
            date: new Date(),
            time: '',
            price: 0.00,
            imageUrl: '',
            location: {
                address: '',
                city: '',
                country: ''
            },
            sessions: []
        };
    }

    saveEvent(formValues) {
        debugger;
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isDirty = false;
            this.router.navigate(['/events']);
        });
    }

    cancel() {
        this.router.navigate(['/events']);
    }
}