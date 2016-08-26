import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { HatTable, Note } from '../shared/interfaces';
import { NotesHatModel } from '../shared/hat-models';
import { HatApiService } from './hat-api.service';
import { MarketSquareService } from './market-square.service';

import * as moment from 'moment';

@Injectable()
export class RumpelService {
  private state: { isAuthenticated: boolean; dataTables: Array<HatTable> };
  private store: { notes: Array<Note> };
  private loaded: boolean;

  private _state$: Subject<any>;
  private state$: Observable<any>;

  private _store$: Subject<any>;
  private store$: Observable<any>;

  constructor(private hat: HatApiService,
              private market: MarketSquareService) {
    this.state = { isAuthenticated: false, dataTables: [] };
    this.store = { notes: [] };
    this.loaded = false;

    this._state$ = <Subject<any>>new Subject();
    this.state$ = this._state$.asObservable();

    this._store$ = <Subject<any>>new Subject();
    this.store$ = this._store$.asObservable();
  }

  loadTableList(): Observable<any> {
    if (this.loaded) {
      this._state$.next(this.state);
      return this.state$;
    }

    this.hat.getDataSources()
      .flatMap(rawTables => {
        const newTables = rawTables.map(this.mapRawTable);

        this.state.dataTables = this.state.dataTables.concat(newTables);

        return this.setupRumpel();
      })
      .subscribe(
        idMappings => {
          this.loaded = true;
          return this._state$.next(this.state);
        },
        err => console.log('Error setting up Rumpel data tables')
      );

    return this.state$;
  }

  loadAll(name: string) {
    this.hat.getAllValuesOf(name, 'rumpel')
      .map(notes => notes.map(this.mapNotes))
      .subscribe(data => {
        const timeSortedData = data.sort((a, b) => a.updated_time.isAfter(b.updated_time) ? -1 : 1);
        this.store[name] = timeSortedData;

        this._store$.next(this.store);
      });

    return this.store$;
  }

  postNote(data: Note) {
    this.hat.postRecord(data, this.isTable('notes', 'rumpel').idMapping, 'notes').subscribe(record => {
      this.store.notes.unshift(data);
      this._store$.next(this.store);
    });
  }

  setupRumpel(): Observable<any> {
    return Observable.forkJoin(
      this.setupTable('notes')
    );
  }

  isTable(name: string, source: string): HatTable {
    return this.state.dataTables.find(table => table.name === name && table.source === source);
  }

  isDataType(dt: string): HatTable {
    return this.state.dataTables.find(table => table.name === dt);
  }

  isDataSource(ds: string): HatTable {
    return this.state.dataTables.find(table => table.source === ds);
  }

  private mapNotes(note: any): Note {
    let newNote = {
      message: note.message,
      created_time: moment(note.created_time),
      updated_time: moment(note.updated_time),
      private: note.private === 'true'
    };

    if (note.location) {
      newNote['location'] = {
        latitude: note.location.latitude,
        longitude: note.location.longitude,
        accuracy: note.location.accuracy
      }
    }

    return newNote;
  }

  private setupTable(name: string) {
    let foundTable = this.isTable(name, 'rumpel');

    if (foundTable) {
      return this.hat.getModelMapping(foundTable.id)
        .map(idMapping => foundTable.idMapping = idMapping);;
    } else {
      return this.hat.postModel(NotesHatModel)
        .map(idMapping => foundTable.idMapping = idMapping);
    }
  }

  // private registerWithMS() {
  //   return this.market.connect();
  // }

  private mapRawTable(table: any): HatTable {
    return { id: table.id,
             name: table.name,
             source: table.source,
             lastUpdated: moment(table.lastUpdated),
             dataLoaded: false };
  }

}
