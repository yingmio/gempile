export default {
  menuData :[
    {
      mainTitle: '丰石内部系统',
      subTitle: '',
      icon: 'icon_m_sel.png',
      routerLink: '',
      pic: '',
      describe: '',
      isLeaf: false,
      children: [
        {
          mainTitle: '网络质量',
          subTitle: '',
          icon: 'icon_m_sel.png',
          routerLink: '',
          pic: '',
          describe: '网络质量',
          isLeaf: false,
          children: [
            {
              mainTitle: '移动网络',
              subTitle: '性能分析平台',
              icon: 'icon_g_sel.png',
              routerLink: 'http://192.168.108.24:31019/mintaka/portal/#/index',
              pic: '',
              describe: '移动网络性能分析',
              isLeaf: true,
            }
          ]
        },
        {
          mainTitle: '客流',
          subTitle: '',
          icon: 'icon_a_sel.png',
          routerLink: '',
          pic: '',
          describe: '客流',
          isLeaf: false,
          children: [
            {
              mainTitle: 'Nile',
              subTitle: '客流热力图',
              icon: 'icon_a_sel.png',
              routerLink: 'http://192.168.16.100:30777/nile-heatmap-fe/#/login',
              pic: '',
              describe: 'Nile客流热力图',
              isLeaf: true
            },
          ]
        },
        {
          mainTitle: '营销',
          subTitle: '',
          icon: 'icon_a_sel.png',
          routerLink: '',
          pic: '',
          describe: '营销',
          isLeaf: true
        },
        {
          mainTitle: '基础运维',
          subTitle: '',
          icon: 'icon_m_sel.png',
          routerLink: '',
          pic: '',
          describe: '基础运维',
          isLeaf: false,
          children: [
            {
              mainTitle: 'Mintaka',
              subTitle: '大数据Hadoop平台V2.0',
              icon: 'icon_m_sel.png',
              routerLink: 'http://192.168.108.24:31896/mintaka/portal/#/home',
              pic: '',
              describe: 'Mintaka大数据Hadoop平台V2.0',
              isLeaf: true,
            },
            {
              mainTitle: 'Mintaka',
              subTitle: '大数据Hadoop平台V3.0',
              icon: 'icon_m_sel.png',
              routerLink: 'http://192.168.108.24:31019/mintaka/portal/#/home',
              pic: '',
              describe: 'Mintaka大数据Hadoop平台V3.0',
              isLeaf: true,
            }
          ]
        }
      ]
    }
  ]
}

