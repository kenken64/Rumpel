/*
 * Copyright (C) 2016 HAT Data Exchange Ltd - All Rights Reserved
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2016
 */

export class Node {
  key: string;
  value: string;
  subTree: any;
  expanded: boolean;

  constructor(key, value, subTree) {
    this.key = key;
    this.value = value;
    this.subTree = subTree;
    this.expanded = true;
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
