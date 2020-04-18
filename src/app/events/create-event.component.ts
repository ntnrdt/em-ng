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

    ngOnInit(){
        this.event = {
            id: 999,
            name: 'ng-conf 2037',
            date: new Date('5/4/2037'),
            time: '9:00 am',
            price: 759.00,
            imageUrl: '/assets/images/ng-conf.png',
            location: {
                address: 'The Palatial America Hotel',
                city: 'Salt Lake City',
                country: 'USA'
            },
            sessions: [ ]
        };
    }

    saveEvent(formValues){
        this.eventService.saveEvent(formValues);
        this.isDirty = false;
        this.router.navigate(['/events']);
    }

    cancel() {
        this.router.navigate(['/events']);
    }
}