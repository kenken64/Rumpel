/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MyDayComponent } from './my-day/my-day.component';
import { MashupsComponent } from "./mashups/mashups.component";

@NgModule({
    imports: [
      RouterModule.forChild([
        { path: 'mashups', component: MashupsComponent, canActivate: [AuthGuard],
          children: [
            { path: 'myday', component: MyDayComponent }
          ]}
      ])
    ],
    exports: [
      RouterModule
    ]
})
export class MashupsRoutingModule {}
