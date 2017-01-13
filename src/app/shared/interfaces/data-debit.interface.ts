

/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export interface DataDebit {
  dateCreated: any;
  lastUpdated: any;
  startDate: any;
  endDate: any;
  enabled: boolean;
  name: string;
  price: number;
  rolling: boolean;
  sell: boolean;
  key: string;
  dataToShare: any;
}
