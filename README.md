# TsAdmin后台管理系统模板

### 前言

很高兴今天在这里跟大家分享一款全新的后台管理系统UI模板--TsAdmin.

* * *

**TsAdmin**是一款基于ASP.NET Web Api 2 + Vue.js + Element UI 的单页无刷新(无iframe)多选项卡的后台管理系统模板，截图如下 ：

![基于Vue.js+Element UI的单页无刷新(无iframe)多选项卡的后台管理系统模板--TsAdmin](https://statics.codedefault.com/uploads/2017/03/tsadmin-vue-element-ui-demo.png)

动图功能展示：

![基于Vue.js+Element UI的单页无刷新(无iframe)多选项卡的后台管理系统模板--TsAdmin](https://statics.codedefault.com/uploads/2018/01/tmp/vuejs-element-ui-single-page-application-spa-web-desktop-appliction-admin-template-demo-preview-001.gif)

TsAdmin中主要集成了以下的优秀功能：

### 一、 无限递归的左侧菜单


支持无限级递归的菜单树，你只需要提供格式规范的JSON数组对象即可，如：

```
[
  {
    "title": "系统设置",
    "name": "1*system*settings",
    "expand": true,
    "uniqueNo": "1*systemsettings",
    "children": [
      {
        "title": "首页",
        "name": "首页",
        "path": "/homepage",
        "allowClose": false,
        "uniqueNo": "homepage",
        "children": []
      },
      {
        "title": "仪表盘",
        "name": "仪表盘",
        "path": "/dashboard",
        "uniqueNo": "dashboard",
        "allowClose": true,
        "children": []
      },
      {
        "title": "用户管理[未实现]",
        "name": "10001user*management",
        "uniqueNo": "10001*user*management",
        "children": []
      },
      {
        "title": "角色管理[未实现]",
        "name": "10002*rolemanagement",
        "uniqueNo": "10002rolemanagement",
        "children": []
      },
      {
        "title": "权限管理[未实现]",
        "name": "10003permissionmanagement",
        "uniqueNo": "10003permissionmanagement",
        "children": []
      }
    ]
  },
  {
    "title": "报表设置",
    "name": "2report*settings",
    "uniqueNo": "2*report*settings",
    "expand": false,
    "children": [
      {
        "title": "表格报表管理[未实现]",
        "name": "20001*gridreportmanagement",
        "uniqueNo": "20001*grid*report*management",
        "children": []
      },
      {
        "title": "图形报表管理[未实现]",
        "name": "20002*graphyreportmanagement",
        "uniqueNo": "20002*graphy*report*management",
        "children": []
      }
    ]
  }
]
```

### 二、可展开/收缩的左侧菜单


TsAdmin实现了点击头部导航的"菜单开关"来切换菜单的展开/收缩状态，并带炫酷的动画效果

### 三、整个页面无刷新(且以无iframe实现)

这也是TsAdmin后台模板系统框架比目前流行的其他框架更舒服的地方吧，这也是作者一直在追求和努力实现的后台管理系统的一种方式。

在TsAdmin模板中，你将可以体验中SPA的流畅操作以及更好的交互体验，因为TsAdmin是页面无刷新的，也无iframe嵌套的。

### 四、以选项卡方式打开各个菜单对应的窗体

在TsAdmin中，你将体验到类似桌面应用的选项卡操作体验，每个菜单选项都可以以选项卡的方式在右侧的选项卡显示区域呈现。

更高级的是，TsAdmin还支持将当前打开的选项卡添加到头部的工作台，当把选项卡成功添加到工作台后，便可以从工作台中重新打开或者激活对应的窗体。

### 五、数据双向绑定及前后端分离

数据双向绑定这是肯定的，因为TsAdmin是基于Vue.js的，至于前后端分离，目前预览版的数据还是纯文本的，所以项目中也提供了一个基于ASP.NET Web Api 2的示例项目(项目中backend目录中)，你可以将文本数据替换成API请求。

欢迎大家对TsAdmin踊跃吐槽。同时也欢迎加入码友网的QQ群：483350228。

> **注：**此模板适合于有一定VUE基础的童鞋

### 六、安装及预览

#### 安装

1. 将项目使用git命令行工具克隆到本地：
> git clone https://github.com/codedefault/tsadmin.git

2. 在命令行工具中，进入目录：/frontend/tsadmin/ ,运行如下命令以还原前端项目所依赖的各种js包：
> npm install

3. 完成步骤2后，在命令行中运行如下命令以启动前端项目的服务：
> npm run dev

4. 在Visual Studio 2015 或者以上版本中打开后端解决方案 **TsAdm.Backend.sln** (位于目录：/backend/TsAdm.Backend.sln)，运行项目：TsAdm.Dashboard；

5. 完成步骤4后，确保后端项目和前端调用地址一致后，在浏览器中打开如下地址即可预览**TsAdmin**后台管理系统模板：

> http://localhost:8860/dashboard.html


#### 在线预览地址

> http://demo.codedefault.com/demo/vue/tsadm/dashboard.html
