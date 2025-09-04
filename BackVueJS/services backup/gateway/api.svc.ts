/* eslint-disable @typescript-eslint/no-misused-promises */
import { FirebaseAuthMixin } from '@/shared/mixins/firebase.mixin';
import env from '@ltv/env';
import * as MoleculerWeb from 'moleculer-web';

const port = env.int('PORT', 4000);
const origin = env.array('ALLOWED_ORIGINS', ['*']);
const allowedHeaders = env.array('ALLOWED_HEADERS', ['*']);

const settings: MoleculerWeb.ApiSettingsSchema = {
  port,
  cors: {
    origin,
    allowedHeaders,
  },
  routes: [
    {
      path: '/api',
      autoAliases: true,
      use: [],
      authorization: false,
    },

    // categories
    {
      path: '/api/categories',
      aliases: {
        'POST /': 'categories.createCategory',
        'GET /': 'categories.getListCategories',
        'PATCH /:id': 'categories.updateCategory',
        'DELETE /:id': 'categories.deleteCategory',
        'GET /:id': 'categories.getCategoryById',
      },
      authorization: false,
    },

    // accounts
    {
      path: '/api/accounts',
      aliases: {
        'POST /login': 'accounts.loginApp',
      },
      authorization: false,
    },
    {
      path: '/api/accounts/users', // CHANGED: from user
      aliases: {
        'GET /': 'accounts.getAllUsers', // CHANGED: from getAllUser
        'GET /:id': 'accounts.getProfileById',
        'GET /me': 'accounts.getMe',
        'PATCH /': 'accounts.updateProfile',
      },
      authorization: true,
    },
    {
      path: '/api/accounts/admin/users', // CHANGED: from user
      aliases: {
        'GET /': 'accounts.searchUsers', // CHANGED: from User
        'GET /reports': 'accounts.getUserCount',
        'GET /:id': 'accounts.getUserById',
        'POST /': 'accounts.createUser',
        'PATCH /:id': 'accounts.updateUser',
        'PATCH /change-activation-status': 'accounts.changeUserActivationStatus',
        'DELETE /:id': 'accounts.deleteUser',
      },
      authorization: true,
    },
    // position
    {
      path: '/api/positions', // CHANGED: from position
      aliases: {
        'GET /': 'positions.getAllPositions',
        'GET /reports': 'positions.getUserCountByPosition', // CHANGED: from getUserCountByPositions
        'POST /': 'positions.createPosition', // CHANGED: from createPositions
        'PATCH /:id': 'positions.updatePosition', // CHANGED: from updatePositions
        'DELETE /:id': 'positions.deletePosition', // CHANGED: from deletePositions
      },
      authorization: true,
    },
    // department
    {
      path: '/api/departments', // CHANGED: from department
      aliases: {
        'GET /': 'departments.getAllDepartments', // CHANGED: from getAllDepartment
        'GET /reports': 'departments.getUserCountByDepartment',
        'POST /': 'departments.createDepartment',
        'PATCH /:id': 'departments.updateDepartment',
        'DELETE /:id': 'departments.deleteDepartment',
      },
      authorization: true,
    },
    // skill
    {
      path: '/api/skills', // CHANGED: from skill
      aliases: {
        'GET /': 'skills.getAllSkills', // CHANGED: from getAllSkill
        'GET /reports': 'skills.getUserCountBySkill',
        'POST /': 'skills.createSkill',
        'PATCH /:id': 'skills.updateSkill',
        'DELETE /:id': 'skills.deleteSkill',
      },
      authorization: true,
    },
    // qualification
    {
      path: '/api/qualifications', // CHANGED: from qualification
      aliases: {
        'GET /': 'qualifications.getAllQualifications', // CHANGED: from getAllQualification
        'POST /': 'qualifications.createQualification',
        'PATCH /:id': 'qualifications.updateQualification',
        'DELETE /:id': 'qualifications.deleteQualification',
      },
      authorization: true,
    },
    {
      path: '/api/qualifications/admin', // CHANGED: from qualification
      aliases: {
        'GET /': 'qualifications.getAllUserQualification',
        'GET /:id': 'qualifications.getUserQualificationById',
        'PATCH /:id': 'qualifications.updateUserQualification',
      },
      authorization: true,
    },
    
    // status
    {
      path: '/api/statuses', // CHANGED: from status
      aliases: {
        'GET /': 'status.getAllStatuses', // CHANGED: from getAllStatus
        'POST /': 'status.createStatus',
        'PATCH /:id': 'status.updateStatus',
        'DELETE /:id': 'status.deleteStatus',
      },
      authorization: false,
    },
    // histories
    {
      path: '/api/histories',
      aliases: {
        'GET /': 'histories.getAllHistories', // CHANGED: from getAllHistory
        'GET /reports': 'histories.getAllUserPromotions',
        'GET /me': 'histories.getHistoryCurrent',
        'POST /': 'histories.createHistory',
        'PATCH /:id': 'histories.updateHistory',
        'DELETE /:id': 'histories.deleteHistory',
      },
      authorization: true,
    },
    {
      path: '/api/histories/admin',
      aliases: {
        'GET /': 'histories.getAllUserHistories', // CHANGED: from getAllUserHistory
        'GET /:id': 'histories.getUserHistoryById',
        'PATCH /:id': 'histories.updateUserHistory',
      },
      authorization: true,
    },
    // vCards
    {
      path: '/api/vcards',
      aliases: {
        'GET /': 'vcards.getVcard', // CHANGED: from getCreateVcards
        'GET /:id': 'vcards.getVcardById',
      },
      authorization: true,
    },
    // device
    {
      path: '/api/devices',
      aliases: {
        'GET /': 'devices.getAllDevices', // CHANGED: from getAllDevice
        'POST /': 'devices.createDevice',
        'DELETE /': 'devices.deleteDevice',
      },
      authorization: true,
    },
    // notifications
    {
      path: '/api/notifications',
      aliases: {
        'GET /': 'notifications.getAllNotifications', // CHANGED: from getAllNotification
        'GET /:id': 'notifications.getNotificationById',
        'POST /': 'notifications.sendNotificationToAll', // CHANGED: from sendNotificationToAll
        'POST /group':'notifications.sendNotificationToGroup', // CHANGED: from sendToGroupfication
        'PATCH /:id': 'notifications.updateNotification',
        'DELETE /:id': 'notifications.deleteNotification',
      },
      authorization: true,
    },
  ],
};

// mixins
const mixins = [MoleculerWeb, FirebaseAuthMixin()];

// actions
const actions = {};

const methods = {};

export default {
  name: 'api',
  settings,
  mixins,
  actions,
  methods,
};
