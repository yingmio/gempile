import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  constructor(
    private common: CommonService
  ) { }

  @Input() menus: Array<object>;
  @Input() firstUrl: string;

  ngOnInit() {
  }

  navigateTo(url) {
    this.firstUrl = url;
    this.common.sendAction(url, false);
  }

}
