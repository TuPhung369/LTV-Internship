import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatusPage from '@/modules/status/view/StatusPage.vue'

import type { RouteRecordRaw } from 'vue-router'
const LoginPage = () => import('modules/auth/components/LoginPage.vue')
const UserProfile = () => import('modules/profiles/components/UserProfile.vue')

const PositionsPage = () => import('modules/position/view/PositionsPage.vue')
const UserListPage = () => import('modules/userList/view/UserList.vue')
//const UserListPage = () => import('modules/userList/view/UserList_New.vue')
const HistoriesPage = () => import('modules/histories/view/HistoriesPage.vue')
const DepartmentPage = () => import('modules/department/view/DepartmentPage.vue')
//const VcardPage = () => import('modules/vcard/view/VcardPage.vue')
const ActivitiesPage = () => import('modules/activities/view/ActivitiesPage.vue')
const QualificationPage = () => import('modules/qualification/view/QualificationPage.vue')
const SkillPage = () => import('modules/skill/view/SkillPage.vue')
const DetailUserPage = () => import('modules/detailUser/view/DetailUserPage.vue')
const AdminPage = () => import('modules/profiles/components/AdminFunctions.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'null',
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/info',
        name: 'UserProfile',
        component: UserProfile,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/user-list',
        name: 'UserListPage',
        component: UserListPage,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/histories',
        name: 'HistoriesPage',
        component: HistoriesPage,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/position',
        name: 'PositionsPage',
        component: PositionsPage,
        meta: {
          requiresAuth: false,
        },
      },

      {
        path: '/department',
        name: 'DepartmentPage',
        component: DepartmentPage,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/activities',
        name: 'ActivitiesPage',
        component: ActivitiesPage,
        meta: {
          requiresAuth: false,
        },
      },

      {
        path: '/skill',
        name: 'SkillPage',
        component: SkillPage,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/qualifications',
        name: 'QualificationPage',
        component: QualificationPage,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/detail/:id',
        name: 'DetailUserPage',
        component: DetailUserPage,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/status',
        name: 'StatusPage',
        component: StatusPage,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
]

export default routes
