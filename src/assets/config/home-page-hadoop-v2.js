export default {
  menuData: [
    {
      mainTitle: 'Mintaka',
      subTitle: '大数据Hadoop平台V2.0',
      icon: 'icon_m_sel.png',
      routerLink: '',
      pic: '',
      describe: 'Mintaka大数据Hadoop平台V2.0',
      isLeaf: false,
      children: [
        {
          mainTitle: '移动网络',
          subTitle: '性能分析平台',
          icon: 'icon_g_sel.png',
          routerLink: 'http://192.168.108.24:31896/mintaka/portal/#/index',
          pic: '',
          describe: '移动网络性能分析',
          isLeaf: true,
        },
        {
          mainTitle: 'Mintaka',
          subTitle: '大数据Hadoop平台',
          icon: 'icon_m_sel.png',
          routerLink: 'http://192.168.16.64:7180/cmf/home',
          pic: '',
          describe: 'Mintaka大数据Hadoop平台',
          isLeaf: true,
        },
        {
          mainTitle: 'Nile',
          subTitle: '客流热力图',
          icon: 'icon_a_sel.png',
          routerLink: 'http://192.168.16.100:30777/nile-heatmap-fe/#/login',
          pic: '',
          describe: 'Nile客流热力图',
          isLeaf: true,
        }
      ]
    },
  ]
}
