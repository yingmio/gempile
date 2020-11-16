/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-09 18:42:20
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-09-07 17:40:18
 */
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

/**
 * 认证Service，主要用于保存用户的认证信息，对外提供用户的登录状态
 */
@Injectable()
export class AuthService {
  /**
   * 认证有效时间timestamp
   */
  // private saveTime = 1000 * 60 * 60 * 8;
  /**
   * 初始url，用于登录后重定向
   */
  redirectUrl: string;

  /**
   * 登录，设置认证有效期
   */
  public login(): void {
    // this.setExpireTime(this.saveTime);
  }
  /**
   * 登出，修改认证有效期
   */
  public logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    this.toLogin();
  }
  /**
   * 设置认证有效期
   */
  // private setExpireTime(saveTime) {
  //   const currentTime = new Date().getTime();
  //   const expireTime = currentTime + saveTime;
  //   localStorage.setItem('expireTime', expireTime.toString());
  // }
  /**
   * 刷新认证有效期
   */
  public refreshExpireTime() {
    // this.setExpireTime(this.saveTime);
  }
  /**
   * 去登录
   */
  public toLogin() {
    window.location.href = environment.garnetOthersLoginUrl;
  }
  /**
   * 检查用户是否登录
   */
  public checkIsLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
      // if (this.checkIsTimeOut()) {
        return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  }
  /**
   * 检查用户登录是否超时
   */
  // public checkIsTimeOut(): boolean {
  //   const requestTime = localStorage.getItem('requestTime');
  //   const timeLength = new Date().getTime() - Number(requestTime);
  //   if (timeLength <= this.saveTime && requestTime !== null) {
  //     return true;
  //   } else {
  //     localStorage.clear();
  //     return false;
  //   }
  // }
}
