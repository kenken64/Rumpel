/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UiStateService } from '../../services';
import {DataTable} from "../../shared/interfaces/data-table.interface";
import {Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'rump-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy, AfterViewInit {
  public state: any;
  public showTile = { locations: false, events: false, posts: false };
  public tileHeights: { notables: number; profile: number };
  private sub: Subscription;

  constructor(private uiState: UiStateService) { }

  ngOnInit() {
    this.state = { dataSources: [], dataTypes: [] };

    this.tileHeights = { notables: 2, profile: 1 };

    this.sub = this.uiState.tables$.subscribe((tables: DataTable[]) => {
      if (tables.findIndex(this.searchHandler('locations')) > -1) this.showTile.locations = true;
      if (tables.findIndex(this.searchHandler('posts tweets music_listens')) > -1) this.showTile.posts = true;
      if (tables.findIndex(this.searchHandler('events')) > -1) this.showTile.events = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    $('.grid').packery({
      // options
      itemSelector: '.grid-item',
      percentPosition: true
    });
  }

  private searchHandler(names: string) {
    return (table: DataTable) => names.includes(table.name);
  }
}
