/*
 * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 1, 2017
 */

export interface CurrentNotableMeta {
  phata: string;
  expires: number;
  reportLocation: boolean;
  initialState?: InitialNotableState;
}

interface InitialNotableState {
  message: string;
  isShared: boolean;
}
