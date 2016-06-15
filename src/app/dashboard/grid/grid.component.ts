import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { TileProfileComponent } from '../tile-profile/tile-profile.component';
import { TileGenericComponent } from '../tile-generic/tile-generic.component';

@Component({
  moduleId: module.id,
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  directives: [TileProfileComponent, TileGenericComponent]
})
export class GridComponent implements OnInit, OnDestroy {
  private _eventsSub;
  public events: Array<any>;

  constructor(private _eventsSvc: EventsService) {
    this.events = [];
  }

  ngOnInit() {
    this._eventsSub = this._eventsSvc.events$.subscribe(updatedEvents => {
      const currentTime = new Date().getTime();
      this.events = updatedEvents.filter(event => {
        return event.startTime.getTime() >= currentTime;
      });
    });

    this._eventsSvc.loadAll();
  }

  ngOnDestroy() {
    this._eventsSub.unsubscribe();
  }

}