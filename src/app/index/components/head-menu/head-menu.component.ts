/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-08-28 17:24:45
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-08-28 17:24:46
 */
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-head-menu',
  templateUrl: './head-menu.component.html',
  styleUrls: ['./head-menu.component.scss']
})
export class HeadMenuComponent implements OnInit,  OnDestroy {

  constructor(
    private common: CommonService
  ) {
    // 监听侧边栏菜单传来的指令
    this.common.siderActionSubscription = this.common.siderActionSubject.subscribe
      ((action: any) => {
        this.siderParentTitle = action.headTitle; // 设置侧边栏的父级头部菜单名
        localStorage.setItem('currentUrl', action.url); // 设置当前页面的路径，设置头部菜单的样式
        this.currentUrl = localStorage.getItem('currentUrl'); // 当前访问的页面
        // console.log(action);
      });
  }

  @Input() menus: Array<object>;
  @Output() itemNavigateClick = new EventEmitter();
  @Output() openSideBarClick = new EventEmitter();
  currentUrl = localStorage.getItem('currentUrl') === null ? 'home-page' : localStorage.getItem('currentUrl'); // 当前访问的页面
  siderParentTitle = ''; // 侧边栏的父级头部菜单

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUrl = '';
  }

  itemNavigate(code, url, type) {
    this.siderParentTitle = ''; // 侧边栏已选的父级菜单变空
    this.currentUrl = url; // 当前访问的页面
    const data = {
      code,
      url,
      type
    };
    this.itemNavigateClick.emit(data);
  }

  /*
      打开侧边指定菜单
      code —— 项目编号
      title —— 菜单标题
  */
  openSideBar(code, title) {
    const data = {
      code,
      title
    };
    this.openSideBarClick.emit(data);
  }

}
