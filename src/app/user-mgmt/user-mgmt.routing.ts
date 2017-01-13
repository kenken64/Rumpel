/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

import { Routes, RouterModule } from '@angular/router';
import { AuthComponent, LoginComponent } from './index';

export const userMgmtRoutes: Routes = [
  { path: 'users/login', component: LoginComponent },
  { path: 'users/authenticate', component: AuthComponent },
  { path: 'users/authenticate/:jwt', component: AuthComponent }
];

// export const userMgmtRouting = RouterModule.forChild(userMgmtRoutes);
