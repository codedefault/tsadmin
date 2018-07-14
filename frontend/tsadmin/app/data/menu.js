export default [{
    title: '系统设置',
    name: '1_system_settings',
    expand: true,
    uniqueNo: '1_system_settings',
    children: [{
        title: '首页',
        name: '首页',
        path: '/homepage',
        allowClose: false,
        uniqueNo: 'homepage',
        children: []
    }, {
        title: '仪表盘',
        name: '仪表盘',
        path: '/dashboard',
        uniqueNo: 'dashboard',
        allowClose: true,
        children: []
    },{
        title: '用户管理',
        name: '用户管理',
        path: '/user_management',
        allowClose: true,
        uniqueNo: '10001_user_management',
        children: []
    }, {
        title: '角色管理[未实现]',
        name: '10002_role_management',
        uniqueNo: '10002_role_management',
        children: []
    }, {
        title: '权限管理[未实现]',
        name: '10003_permission_management',
        uniqueNo: '10003_permission_management',
        children: []
    }]
}]
