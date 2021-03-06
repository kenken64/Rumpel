/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2, 2017
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rump-mashups',
  templateUrl: './mashups.component.html',
  styleUrls: ['./mashups.component.scss']
})
export class MashupsComponent implements OnInit {

  private activeTab: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(routerEvent => {
      this.activeTab = routerEvent.url;
    })
  }

}
