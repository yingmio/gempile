/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-31 15:50:14
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-07-31 15:51:21
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {IndexHadoopComponent} from "./index-hadoop/index-hadoop.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 根路径默认跳转至首页
  { path: 'login', component: LoginComponent }, // 登录页面
  { path: 'home', component: HomeComponent }, // home页面
  { path: 'index', component: IndexComponent, pathMatch: 'full'},
  { path: 'index-hadoop', component: IndexHadoopComponent, pathMatch: 'full'},
  { path: 'error', component: ErrorHandlerComponent }, // error页面
  { path: '**', component: ErrorHandlerComponent  } // 404找不到页面跳转error页面
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules // 预加载所有懒加载模块
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
