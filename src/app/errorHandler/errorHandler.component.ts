/*
 * @Descripttion:
 * @version:
 * @Author: Husiyuan
 * @Date: 2020-07-28 12:15:02
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-08-24 15:55:39
 */
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { API } from 'src/apis';
import { CommonService } from 'src/services/common.service';

@Component({
    templateUrl: './errorHandler.component.html',
    styleUrls: ['./errorHandler.component.scss']
})
export class ErrorHandlerComponent  implements OnInit {
  constructor(
    private http: HttpService,
    public  activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private common: CommonService
  ) {}
  text = '该页面不存在';
  isShowButton = true;

  ngOnInit() {
    // 获取路由返回的参数
    this.activeRoute.queryParams.subscribe(params => {
      if (params.text !== undefined) {
        // localStorage.clear();
        this.text = params.text;
        // this.isShowButton = true;
      }
    });
    this.message.create('error', this.text);
  }

  return() {
    // 返回登录页
    window.location.href = '/';
  }

  // 退出登录
  async logout() {
    await this.http.request(`${environment.garnetApiUrl}${API.logout}`, 'Post', { responseType: 'json' });
    localStorage.clear();
    this.common.setCookie('token', '', -1);
    window.location.href = environment.garnetOthersLoginUrl + '?logout=true';
  }
}

