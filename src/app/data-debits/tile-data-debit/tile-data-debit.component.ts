/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org>
 */

import { Component, OnInit } from '@angular/core';
import { DataDebitService } from '../data-debits.service';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/interfaces/user.interface";

@Component({
  selector: 'rump-tile-data-debit',
  templateUrl: 'tile-data-debit.component.html',
  styleUrls: ['tile-data-debit.component.scss']
})
export class TileDataDebitComponent implements OnInit {
  public debits: Array<any>;

  constructor(private ddSvc: DataDebitService, private userSvc: UserService) {}

  ngOnInit() {
    this.debits = [];

    this.userSvc.user$.subscribe((user: User) => {
      if (user.authenticated === true) {
        this.ddSvc.loadAllDataDebits().subscribe(dataDebits => {
          this.debits = dataDebits;
        });
      }
    })
  }

}
