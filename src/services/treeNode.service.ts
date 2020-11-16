/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-08 19:15:05
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-07-08 19:42:30
 */
import { Injectable } from '@angular/core';
// tslint:disable: no-string-literal

@Injectable()
export class TreeNodeService {
    matchNameList = [];  // 已添加的节点数组
    barList = []; // 节点数据
    menu = [];

    // 数据格式化
   dataFormat(list, type) {
     this.barList = [];
        // 将所有数据合并成一个数组
        list.forEach(item => {
          console.log(item.name);
          console.log(type);
          if (item.url.indexOf('mintaka') > -1 && type === 'gempile') {
            item.name = this.dealMenuName(item.name);
            this.dealRemark(item); // 更新remark里的字符型，例如projectTitle等
            this.barList.push(item);
          }
          if (item.name.indexOf('Hadoop') > -1 && type === 'hadoop') {
            item.name = this.dealMenuName(item.name);
            this.dealRemark(item); // 更新remark里的字符型，例如projectTitle等
            this.barList.push(item);
          }
        });
    }

    // 生成第一层数据
   generateFirstLevel() {
        this.barList.forEach(data => {
            const treeItem = this.menu.find(item => {
                return item['title'] === data['projectTitle'] && item['type'] === data['menuType'];
            });
            // 如果项目名和类型都不一样，就添加到第一层数据
            if (!treeItem) {
                this.menu.push({
                    title: data['projectTitle'],
                    url: '',
                    code: data['projectTitle'],
                    type: data['menuType']
                });
            }
        });
    }

    // 循环读取所有数据
    loadNodeList(arr) {
        if (arr.length) {
            arr.forEach(data => {
                this.addNode(this.menu, data);
            });
            arr = arr.filter(item => this.matchNameList.indexOf(item['name']) < 0);
            this.loadNodeList(arr);
        }
    }

    // 插入节点
    // tslint:disable-next-line:variable-name
    addNode(_menu, node) {
     console.log(_menu);
        _menu.map(item => {
            if (item.title === node.parentTitle) {
                // 若不存在subMenu 则新增
                if (!item.subMenu) {
                    item.subMenu = [];
                }
                item.subMenu.push({
                    title: node['name'],
                    url: node['isLeaf'] === 'true' ? node['url'] : ''
                });
                this.matchNameList.push(node['name']);
            } else if (item.subMenu) {
                this.addNode(item.subMenu, node);
            }
        });
    }

    // 处理菜单名称
    dealMenuName(name) {
        const formatedName = name.indexOf('-') < 0 ? name : name.split('-')[1];
        return formatedName;
    }

    // 更新remark里的字符型，例如projectTitle等
    dealRemark(item) {
      const array = JSON.parse(item.remark);
      array.forEach(arr => {
        item[arr.label] = arr.value;
      });
    }
}
