/*
 * @Descripttion:
 * @version:
 * @Author: Husiyuan
 * @Date: 2020-07-16 12:29:51
 * @LastEditors: Husiyuan
 * @LastEditTime: 2020-07-20 15:57:45
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from './../../../../services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpPService } from 'src/services/http-p.service';
import { API } from 'src/apis';

@Component({
  selector: 'app-head-tools',
  styleUrls: ['./../../../../assets/styles/theme.scss', './head-tools.component.scss'],
  templateUrl: './head-tools.component.html'
})
export class HeadToolsComponent implements OnInit, OnChanges {

  constructor(
    private common: CommonService,
    private http: HttpPService
  ) { }
  username = localStorage.getItem('username'); // 用户名

  // 退出登录
  async logout() {
    await this.http.request(`${environment.garnetApiUrl}${API.logout}`, 'Post', { responseType: 'json' });
    localStorage.clear();
    this.common.setCookie('token', '', -1);
    window.location.href = environment.garnetOthersLoginUrl + '?logout=true';
  }

  setCookie(cookieName, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cookieName + '=' + escape(value) + ';  expires = ' + exdate.toUTCString() + ';path = /';
  }

  ngOnChanges() {
  }


  ngOnInit() {
  }
}
