import { Component, OnInit, OnDestroy, ChangeDetectorRef , AfterViewInit} from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IndexModel } from './index.model';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { environment } from '../../environments/environment';
import { TreeNodeService } from '../../services/treeNode.service';
import { HttpPService } from 'src/services/http-p.service';
// import { type } from 'os';

@Component({
  selector: 'app-index',
  styleUrls: ['./../../assets/styles/theme.scss', './index.component.scss'],
  templateUrl: './index.component.html',
  providers: [IndexModel]
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    public domSanitizer: DomSanitizer,
    private common: CommonService,
    private indexModel: IndexModel,
    private treeNode: TreeNodeService,
    private cd: ChangeDetectorRef,
    public http: HttpPService
  ) {
    // 监听组件传来的跳转命令
    this.common.actionSubscription = this.common.actionSubject.subscribe
      ((action: any) => {
        // console.log(action);
        this.navigateTo(action.url, action.changeOrigin);
      });
  }

  menus; // 菜单数组
  sidebarMenus = []; // 侧边栏菜单列表
  iframeUrl; // 当前访问页面
  userPhoto = ''; // 用户头像
  showLoading = false;
  currenData = {
    code: '',
    type: '',
    url: ''
  };

  ngOnInit(): void {
    this.getMenuData();
    let typeIsHeadbar = true;
    if (localStorage.getItem('currentType') === 'sidebar') {
      this.openSideBar({code: localStorage.getItem('currentCode'), title: localStorage.getItem('parentTitle')});
      typeIsHeadbar = false;
    }
    this.navigateTo(this.currenData, typeIsHeadbar);
  }

  ngAfterViewInit() {
    this.cd.detectChanges(); // 检测变化
  }

  // 在组件销毁时取消对命令的监听
  ngOnDestroy() {
    this.common.actionSubject.unsubscribe();
  }

  // 导航至
  navigateTo(event, changeOrigin) {
    this.showLoading = true;
    if (event.parentTitle) {
      localStorage.setItem('parentTitle', event.parentTitle);
    }
    localStorage.setItem('currentUrl', event.url);
    localStorage.setItem('currentCode', event.code);
    localStorage.setItem('currentType', event.type);
    let HOST = 'http://' + location.host;
    if (HOST.indexOf('localhost') > -1) {
      HOST = 'http://192.168.16.97:9090';
    }
    const nextUrl = HOST + event.url;
    this.setIframe(nextUrl);
    // this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(nextUrl);
    if (changeOrigin) {
      this.sidebarMenus = [];
    }
  }

  // 展示侧边栏的制定3,4级菜单
  openSideBar(data) {
    this.menus.map(project => {
      if (project.code === data.code) {
        project.subMenu.map(menu => {
          if (menu.title === data.title) {
            menu.subMenu['parentTitle'] = menu.title;
            menu.subMenu['type'] = project.type;
            menu.subMenu['code'] = project.code;
            this.sidebarMenus = menu.subMenu;
          }
        });
      }
    });

  }

  getMenuData() {
    if (localStorage.getItem('menuListMap') !== null) { // 获取缓存里的菜单
      const menuListMap = JSON.parse(localStorage.getItem('menuListMap'));
      this.treeNode.dataFormat(menuListMap, 'gempile'); // 先格式化数据
      this.treeNode.generateFirstLevel(); // 获取第一层菜单
      this.treeNode.loadNodeList(this.treeNode.barList); // 获取更多层菜单
      this.menus = this.treeNode.menu;
      this.currenData.code = localStorage.getItem('currentCode') ? localStorage.getItem('currentCode') : this.menus[0].code;
      this.currenData.type = localStorage.getItem('currentType') ? localStorage.getItem('currentType') : this.menus[0].type;
      this.setInitUrl(this.menus[0]); // 设置初始化页面时访问的页面
    } else { // 获取不到则跳转登录页
      localStorage.clear();
      window.location.href = environment.garnetOthersLoginUrl;
    }
  }

  // 设置初始化页面时访问的页面
  setInitUrl(data) {
    this.currenData.url = '';
    data.subMenu.forEach(item => {
      if (item.url !== '' && this.currenData.url === '') {
        this.currenData.url = localStorage.getItem('currentUrl')  ? localStorage.getItem('currentUrl') : item.url;
      }
      if (this.currenData.url === '' && item.url === '') {
        this.setInitUrl(item);
      }
    });
  }

  setIframe(url) {
    const contant = document.getElementById('iframeContent');
    const iframeDiv = contant.getElementsByTagName('iframe');
    if (iframeDiv.length !== 0) {
      contant.removeChild(iframeDiv[0]);
    }
    const iframe: any = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'r-iframe';
    iframe.style.display = 'none';
    contant.appendChild(iframe);
    if (!/*@cc_on!@*/0) { // if not IE
      const that = this;
      iframe.onload = () => {
        that.showLoading = false;
        iframe.style.display = 'block';
      };
    } else {
      const that = this;
      iframe.onreadystatechange = () => {
        if (iframe.readyState === 'complete') {
          that.showLoading = false;
          iframe.style.display = 'block';
        }
      };
    }
  }
}
