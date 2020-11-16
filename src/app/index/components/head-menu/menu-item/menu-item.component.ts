import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-head-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, AfterViewInit {

  selectedDom: any;
  // @ViewChild('menuContainer') container: ElementRef<any>;

  constructor(
    private common: CommonService,
    // private elementRef: ElementRef
  ) { }

  @Input() menus: Array<object>;

  ngOnInit() {
    // console.log(this.menus);
  }

  ngAfterViewInit(): void {
    // this.elementRef.nativeElement.replaceWith(this.container.nativeElement);
  }

  navigateTo(url) {
    this.common.sendAction(url);
  }


}
