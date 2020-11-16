import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { CommonService } from './../../../../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-siderbar-menu',
  styleUrls: ['./siderbar-menu.component.scss'],
  templateUrl: './siderbar-menu.component.html'
})
export class SiderbarMenuComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy{
  constructor(
    private common: CommonService,
    public domSanitizer: DomSanitizer
  ) {}
  @Input() menuList;  // 侧边栏菜单列表
  @Output() itemNavigateClick = new EventEmitter();
  isCollapsed = false; // 侧边栏是否收起状态
  isHiddenSiderbar = false; // 侧边栏是否隐藏
  isFirstUrl = ''; // 是否为第一个菜单，用于默认跳转
  // firstUrl = ''; // 是否为第一个菜单，用于默认跳转
  currentUrl = localStorage.getItem('currentUrl');
  submenuTitle = '';

  navigateTo(parentTitle, code, type, url) { // 侧边栏点击跳转页面
    const data = {
      parentTitle,
      code,
      type,
      url
    };
    this.common.sendSiderAction(parentTitle, url);
    this.itemNavigateClick.emit(data);
  }

  ngOnDestroy() {
    this.common.siderActionSubject.unsubscribe();
  }

  ngOnChanges() {
    // 菜单列表为空时，则隐藏侧边栏
    if (this.menuList.length === 0) {
      this.isHiddenSiderbar = true;
    } else {
      this.isHiddenSiderbar = false;
      // 判断第一个菜单是否为一级或者二级
      const preUrl = localStorage.getItem('currentUrl');
      const filterData = this.common.treeSidebarFilter(this.menuList, preUrl);
      this.submenuTitle = filterData.title; // 展开的子菜单的父级菜单名
      let url = '';
      // 判断是否是第一次进入侧边栏菜单，如果不是，就直接跳转到上一次选择的侧边栏路径
      if (!filterData.isHaveUrl) {
        if (this.menuList[0].url === '') {
          this.isFirstUrl = this.menuList[0].subMenu[0].url;
        } else {
          this.isFirstUrl = this.menuList[0].url;
        }
        url = this.isFirstUrl;
      } else {
        url = preUrl;
      }
      const data = {
        parentTitle: this.menuList['parentTitle'],
        code: this.menuList['code'],
        type: this.menuList['type'],
        url
      };
      // 发送指令到头部菜单，实现样式改变
      this.common.sendSiderAction(data.parentTitle, data.url);
      this.itemNavigateClick.emit(data); // 实现默认跳转
    }
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    // 设置侧边栏收缩的icon
    const triggerItem = document.getElementsByClassName('ant-layout-sider-trigger')[0];
    if (triggerItem) {
      triggerItem.innerHTML = '';
      triggerItem.innerHTML = this.common.siderbarMenuIcon;
    }
  }
}
