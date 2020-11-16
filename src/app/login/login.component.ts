/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-09 18:27:39
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-10-28 10:56:54
 */
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ACLService } from '@delon/acl';
import { CommonService } from '../../services/common.service';
import {API} from './../../apis';
import { HttpPService } from '../../services/http-p.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              public aclService: ACLService,
              private http: HttpPService,
              private authService: AuthService,
              private common: CommonService) { }

  ngOnInit() {
    this.getRole();
    if (!this.authService.checkIsLoggedIn()) {
      window.location.href = environment.garnetOthersLoginUrl;
    }
  }

  getRole() {
    let addr = window.location.href.toString();
    if (addr.indexOf('?') > 0) {
      localStorage.clear();
      addr = addr.substring(addr.indexOf('?') + 1, addr.length);
      addr.split('&').forEach((val) => {
        const message = val.split('=');
        localStorage.setItem(message[0], message[1]);
      });
      localStorage.setItem('loginTime', new Date().getTime().toString());
      localStorage.setItem('gempileToken', localStorage.getItem('token'));

      this.getPermissionsList();
    } else {
      // this.router.navigateByUrl('/index', { replaceUrl: true });
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
    // console.log(localStorage);
  }
  async getPermissionsList() {
    this.aclService.setFull(false); // 重置权限控制
    const result: any = await this.http.request(
      `${environment.garnetApiUrl}${API.getResourcData}/${localStorage.getItem('userId')}/1/2147483647`,
      'Get',
      { responseType: 'json'}
    );
    if (result.code === 200) {
      localStorage.setItem('menuListMap', JSON.stringify(result.data.list));
      // this.router.navigateByUrl('/index', { replaceUrl: true });
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }
}
