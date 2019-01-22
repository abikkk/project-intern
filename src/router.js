import Vue from 'vue';
import Router from 'vue-router';
import main from './components/container/main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'MC',
      component: main,
      redirect: '/Home',
      children: [
        {
          path: '/Home',
          name: '',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "index" */ './components/container/Home.vue'),
        children:[
          {
            path: '/Home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "index" */ './views/Index.vue'),
          },
          {
            path: '/About',
            name: 'About',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
          },
          {
            path:'/Leave-Requests',
            name:'Leave-Requests',
            component:()=>import('./views/LeaveRequests.vue'),
          },
          {
            path: '/Try',
            name: 'Try',
            component: ()=>import('./views/Try.vue'),
          },
          {
            path: '/Leave-Reports',
            name: 'Leave-Reports',
            component: ()=>import('./views/LeaveReports.vue'),
          },
          {
            path: '/Request-Leave',
            name: 'Request-Leave',
            component: ()=>import('./views/RequestLeave.vue'),
          },
          {
            path: '/Attendance-View',
            name: 'Attendance-View',
            component: ()=>import('./views/AttendanceView.vue'),
          },
          {
            path: '/Attendance-Report',
            name: 'Attendance-Report',
            component: ()=>import('./views/AttendanceReport.vue'),
          },
          {
            path:'/New-User',
            name:'New-User',
            component:()=>import ('./views/NewUser.vue'),
          },
          {
            path: '/Account-Update',
            name: 'Account-Update',
            component: ()=>import('./views/AccountUpdate.vue'),
          },
          {
            path: '/Users-Delete',
            name: 'Users-Delete',
            component: ()=>import('./views/DeleteUsers.vue'),
          },
          {
            path: '/Group-Branch',
            name: 'Group-Branch',
            component: ()=>import('./views/GroupBranch.vue'),
          },
          {
            path: '/Leave-Types',
            name: 'Leave-Types',
            component: ()=>import('./views/LeaveTypes.vue'),
          }
        ],
      },
      ],
    },
    {
      path: '/',
      name: 'SC',
      component: () => import(/* webpackChunkName: "secondary-component" */ './components/container/secondary.vue'),
      redirect:'/Login',
      children:[
        {
          path:'/Login',
          name:'Login',
          component:()=>import ('./views/Login.vue'),
        }
      ]
    },
    {
      path:'/*',
      component:()=>import('./components/404.vue')
    }
  ],
});
