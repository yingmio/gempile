export const USERS = {
  'GET /test': {
    users: 'Raj',
    words: '武汉加油，中国加油'
  },
  '/403': () => {
    throw new MockStatusError(403);
  }
};

export const MENUS = {
  'GET /menu': [{
      title: 'gempile',
      url: '',
      code: 'gempile_menu',
      type: 'headbar',
      subMenu: [{
          title: '首页',
          url: 'homePageMap'
        },
        {
          title: '网络质量',
          url: '',
          subMenu: [{
              title: '网络故障分析',
              url: 'networkFailure'
            },
            {
              title: '网络指标分析',
              url: 'networkIndicators'
            }
          ]
        },
        {
          title: '业务质量',
          url: '',
          subMenu: [{
              title: '业务指标分析',
              url: 'businessIndicators'
            },
            {
              title: '业务故障分析',
              url: 'businessFailure'
            }
          ]
        },
        {
          title: '监控告警',
          url: '',
          subMenu: [{
            title: '主动告警',
            url: 'autoAlert'
          }]
        },
        {
          title: '用户感知',
          url: '',
          subMenu: [{
              title: '用户话单回溯',
              url: 'subscriberTicketRetrieval'
            },
            {
              title: '话单回溯日志查询',
              url: 'subscriberLogRetrieval'
            }
          ]
        }
      ]
    },
    {
      title: '佛山无忧',
      url: '',
      code: 'wuyou_menu',
      type: 'headbar',
      subMenu: [{
          title: '首页',
          url: 'home-page'
        },
        {
          title: '实时监控',
          url: '',
          subMenu: [{
              title: '预警规则管理',
              url: 'rule-mange'
            },
            {
              title: '预警通知管理',
              url: 'inform-management'
            },
            {
              title: '历史预警查询',
              url: 'history-warning-query'
            },
            {
              title: '测试第四层',
              url: '',
              subMenu: [{
                title: '历史预警查询第四层',
                url: 'history-warning-query'
              }]
            }
          ]
        },
        {
          title: '数据管理',
          url: '',
          subMenu: [{
              title: '数据完整性管理',
              url: 'data-mange'
            },
            {
              title: '历史指标查询',
              url: 'history-page'
            },
            {
              title: '退服小区查询',
              url: 'retired-community'
            }
          ]
        },
        {
          title: '分析支撑',
          url: '',
          subMenu: [{
              title: '投诉辅助定位',
              url: 'complaint-cell-location'
            },
            {
              title: '高负荷分析',
              url: 'high-load'
            },
            {
              title: '预警可视化分析',
              url: 'cell-cluster-analysis'
            },
            {
              title: '投诉超三聚类',
              url: 'complaint-cluster-analysis'
            }
          ]
        },
        {
          title: '动态资源',
          url: '',
          subMenu: [{
              title: '基础数据管理',
              url: 'basic-data-management'
            },
            {
              title: '小区生命周期管控',
              url: 'lte-lifecycle-management'
            }
          ]
        }
      ]
    },
    {
      title: '佛山测试',
      url: '',
      code: 'liuliu_menu',
      type: 'sidebar',
      subMenu: [{
          title: '首页',
          url: 'home-page'
        },
        {
          title: '实时监控',
          url: '',
          subMenu: [{
              title: '预警规则管理',
              url: 'rule-mange'
            },
            {
              title: '预警通知管理',
              url: 'inform-management'
            },
            {
              title: '历史预警查询',
              url: 'history-warning-query'
            },
            {
              title: '测试第四层',
              url: '',
              subMenu: [{
                  title: '数据完整性管理',
                  url: 'data-mange'
                },
                {
                  title: '历史指标查询',
                  url: 'history-page'
                }
              ]
            },
          ]
        },
        {
          title: '数据管理',
          url: '',
          subMenu: [{
              title: '数据完整性管理',
              url: 'data-mange'
            },
            {
              title: '历史指标查询',
              url: 'history-page'
            },
            {
              title: '退服小区查询',
              url: 'retired-community'
            }
          ]
        }
      ]
    }
  ]
};
