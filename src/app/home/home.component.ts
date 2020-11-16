/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-31 16:35:41
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-10-28 11:25:16
 */
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from './../../environments/environment';
import { API } from './../../apis/index';
import { CommonService } from '../../services/common.service';
import { HttpPService } from '../../services/http-p.service';
import { AuthService } from 'src/services/auth.service';
import data from '../../assets/config/home-page';


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, AfterViewInit {
  title;
  isChooseHadoopVisible = false;
  rows;
  menuData = data.menuData[0].children;
  describe;
  breadcrumbTitle = [];
  @ViewChild('myCarousel',  { static: true }) myCarousel;

  iconWidth;
  iconHeight;
  constructor(
    private http: HttpPService,
    private common: CommonService,
    private authService: AuthService
  ) {}
  slidesData = [
    './assets/images/index/home-banner.png',
    './assets/images/index/about.png',
  ]; // 轮播图数据
  username = localStorage.getItem('username');

  ngOnInit() {
    this.iconWidth = 100 + 'px';
    this.iconHeight = 52 + 'px';
    this.breadcrumbTitle.push(data.menuData[0].mainTitle + data.menuData[0].subTitle);
    this.rows = Math.ceil(data.menuData[0].children.length / 3);
    if (!localStorage.getItem('userId')) {
      window.location.href = environment.garnetOthersLoginUrl;
    }
  }

  ngAfterViewInit() {
  }

 // 退出登录
  async logout() {
    await this.http.request(`${environment.garnetApiUrl}${API.logout}`, 'Post', { responseType: 'json' });
    localStorage.clear();
    this.common.setCookie('token', '', -1);
    window.location.href = environment.garnetOthersLoginUrl + '?logout=true';
  }

  change(direction) {
    if (direction) { // 下一页
      this.myCarousel.next();
    } else { // 上一页
      this.myCarousel.pre();
    }
  }

  showChooseHadoop() {
    this.isChooseHadoopVisible = true;
  }

  handleChooseHadoopCancel() {
    this.isChooseHadoopVisible = false;
  }

  linkTo(menuItem) {
    if (menuItem.isLeaf) {
      window.open(menuItem.routerLink);
    } else {
      this.menuData = menuItem.children;
      this.rows = Math.ceil(this.menuData.length / 3);
      this.breadcrumbTitle.push(menuItem.mainTitle + menuItem.subTitle);
      console.log(this.menuData);
      console.log(this.breadcrumbTitle);
    }
    // switch (type) {
    //   case 'hadoop':
    //     window.open('http://192.168.16.64:7180/cmf/home');
    //     break;
    //   case 'Nile':
    //     window.open('http://192.168.16.100:30777/nile-heatmap-fe/#/workspace');
    //     break;
    //   case 'Alnitak':
    //     window.open('http://192.168.108.45:3000');
    //     break;
    //   case 'Mintaka':
    //     window.open('http://192.168.108.45:18081/esendatagovernace/');
    //     break;
    //   case 'SuperSet':
    //     window.open('http://192.168.108.54:8088/');
    //     break;
    // }
  }

  changePage(title, index) {
    this.breadcrumbTitle = this.breadcrumbTitle.slice(0, index + 1);
    console.log("this.breadcrumbTitle",this.breadcrumbTitle);
    this.searchMenu(data.menuData, title);
  }

  show(e, data) {
    e.path[0].children[0].style.width = '120px';
    this.iconWidth = 120 + 'px';
    this.describe = data.describe;
    console.log("data.describe",data.describe)
  }

  hide(e, data) {
    e.path[0].children[0].style.width = '100px';
    // e.relatedTarget.children[0].children[0].style.width = 100;
    this.iconWidth = 100 + 'px';
    // console.log(e);
  }

  searchMenu(tree, title) {
    console.log(tree);
    console.log(tree.length);
    console.log(title);
    for (let i = 0; i < tree.length; i++) {
      console.log(tree[i].mainTitle + tree[i].subTitle);
      if (tree[i].mainTitle + tree[i].subTitle === title) {
        this.menuData = tree[i].children;
        this.rows = Math.ceil(this.menuData.length / 3);
        break;
        return;
      } else {
        if (!tree[i].isLeaf) {
          this.searchMenu(tree[i].children, title);
        }
      }
    }
  }

}

