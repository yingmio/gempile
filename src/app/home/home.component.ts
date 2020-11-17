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


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, AfterViewInit {
  isChooseHadoopVisible = false;
  @ViewChild('myCarousel',  { static: true }) myCarousel;
  constructor(
    private http: HttpPService,
    private common: CommonService,
    private authService: AuthService
  ) {}
  slidesData = [
    './assets/images/index/home-banner.png',
  ]; // 轮播图数据
  username = localStorage.getItem('username');

  ngOnInit() {
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

  linkTo(type) {
    switch (type) {
      case 'hadoop':
        window.open('http://192.168.16.64:7180/cmf/home');
        break;
      case 'Nile':
        window.open('http://192.168.16.100:30777/nile-heatmap-fe/#/workspace');
        break;
      case 'Alnitak':
        window.open('http://192.168.108.45:3000');
        break;
      case 'Mintaka':
        window.open('http://192.168.108.45:18081/esendatagovernace/');
        break;
      case 'SuperSet':
        window.open('http://192.168.108.54:8088/');
        break;
    }
  }

}

