import { Component, OnInit, Input } from '@angular/core';

declare let $: any;

@Component({
  selector: 'rump-tile-header',
  templateUrl: 'tile-header.component.html',
  styleUrls: ['tile-header.component.scss']
})
export class TileHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() iconName: string;
  @Input() backColor: string;
  @Input() info: string;

  constructor() {}

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover();
    });
  }

}
