import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject, Subscription } from 'rxjs';
import {environment} from './../environments/environment';
import { ACLService } from '@delon/acl';
declare let echarts: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private http: HttpService,
    private router: Router,
    public aclService: ACLService
  ) {}
  // tslint:disable-next-line:max-line-length
  siderbarMenuIcon = '<i nz-icon="" nzType="menu" class="anticon anticon-menu" ng-reflect-type="menu"><svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" data-icon="menu" aria-hidden="true"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg></i>';

  // 定义消息源 ——  Subject 对象，string 为消息数据类型
  actionSubject = new Subject<object>();
  // 定义监听的数据流 —— observable 的可被观察的数据流
  actionSubscription = new Subscription();
  // 定义侧边栏消息源 ——  Subject 对象，string 为消息数据类型
  siderActionSubject = new Subject<object>();
  // 定义侧边栏监听的数据流 —— observable 的可被观察的数据流
  siderActionSubscription = new Subscription();


  // 发送指令函数
  sendAction(url: string, changeOrigin = true) {
    const data = {
      url,
      changeOrigin
    };
    this.actionSubject.next(data);
  }

  // 发送侧边栏指令
  sendSiderAction(headTitle: string, url) {
    const data = {
      headTitle,
      url
    };
    this.siderActionSubject.next(data);
  }

  // 年月日小时分秒时间戳函数
  format(timestamp) {
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return (
      y +
      '-' +
      this.add0(m) +
      '-' +
      this.add0(d) +
      ' ' +
      this.add0(h) +
      ':' +
      this.add0(mm) +
      ':' +
      this.add0(s)
    );
  }
  // 年月日时间戳函数
  formatDate(timestamp) {
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    return y + '-' + this.add0(m) + '-' + this.add0(d);
  }
  // 年月日时间戳函数
  formatAllTime(timestamp) {
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
  // 年月日时间戳函数
  formatTime(timestamp) {
    const time = new Date(timestamp);
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
  // 小于0补齐0函数
  add0(m) {
    const num = String(m);
    if (num[0] !== '0' || (num[0] === '0' && num[1] === undefined)) {
      return m < 10 ? '0' + String(m) : String(m);
    } else {
      return m;
    }
  }
  // 判断指标是否存在函数
  isNull(num) {
    if (num === '' || num === null || num === undefined) {
      return true;
    } else {
      return false;
    }
  }
  // 保留两位小数
  fixedPoint2(num) {
    return Number(num).toFixed(2);
  }
  // 获取元素CSS属性
  getElementAttr(ele, attr) {
    const style = window.getComputedStyle ? window.getComputedStyle(ele, null) : null || ele.currentStyle;
    return parseFloat(style[attr] || ele[attr]);
  }
  // 设置Cookie
  setCookie(cookieName, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + '=' + escape(value) + ';  expires = ' + exdate.toUTCString() + ';path = /';
  }

  /**
   * @desc: 递归遍历树型结构数组
   * @param arr 树型结构的数组
   * @return: array
   */
  treeFilter(arr) {
    arr.map(item => {
      console.log(item.title + ':' + item.url);
      if (item.subMenu) {
        this.treeFilter(item.subMenu);
      }
    });
  }

  // 遍历侧边栏菜单，筛选出元素的url是否等于当前url
  treeSidebarFilter(arr, currentUrl) {
    const data = {
      isHaveUrl: false,
      title: ''
    };
    arr.forEach(item => {
      if (item.url === currentUrl) {
        data.isHaveUrl = true;
      }
      if (item.subMenu) {
        item.subMenu.forEach(subItem => {
          if (subItem.url === currentUrl) {
            data.isHaveUrl = true;
            data.title = item.title;
          }
        });
      }
    });
    return data;
  }
}
