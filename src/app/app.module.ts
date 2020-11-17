/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-31 15:50:46
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-07-31 15:50:46
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';
import { LoginComponent } from './login/login.component';
import { HeadMenuComponent } from './index/components/head-menu/head-menu.component';
import { MenuItemComponent as HeadMenuItemComponent } from './index/components/head-menu/menu-item/menu-item.component';
import { SiderbarMenuComponent } from './index/components/siderbar-menu/siderbar-menu.component';
import { MenuItemComponent as SideMenuItemComponent } from './index/components/siderbar-menu/menu-item/menu-item.component';
import { HeadToolsComponent } from './index/components/head-tools/head-tools.component';
import { HomeComponent } from './home/home.component';
// modules
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// services
import { SimpleHttpInterceptor } from '../services/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { HttpPService } from '../services/http-p.service';
import { AuthService } from './../services/auth.service';
import { ACLService } from '@delon/acl';
import { TreeNodeService } from 'src/services/treeNode.service';
// mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../mock';
import { environment } from '../environments/environment';
import {IndexHadoopComponent} from "./index-hadoop/index-hadoop.component";
const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA, log: true }) ] : [];
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexHadoopComponent,
    ErrorHandlerComponent,
    LoginComponent,
    HeadMenuComponent,
    HeadMenuItemComponent,
    SiderbarMenuComponent,
    SideMenuItemComponent,
    HeadToolsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    ...MOCKMODULE
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: SimpleHttpInterceptor, multi: true},
    CommonService,
    HttpService,
    HttpPService,
    AuthService,
    ACLService,
    TreeNodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
