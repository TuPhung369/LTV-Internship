import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { NotificationDataSource } from './notification.datasource';
import { NotificationCreateInput, NotificationCreateUpdate } from './notification.sql';
import Moleculer from 'moleculer';

const E = Moleculer.Errors;
const actions: ServiceActionsSchema = {
  sendToAllNotification: {
    params: {
        title: { type: 'string' },
        content: { type: 'string' },
    },
    async handler(ctx: AppContext<NotificationCreateInput>) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.sendAllNotification(ctx.params, ctx.meta.user.id);
    },
  },
  sendToGroupfication: {
    params: {
        title: { type: 'string' },
        content: { type: 'string' },
        userIds: { type: 'array', itemType: 'string'}
    },
    async handler(ctx: AppContext<NotificationCreateInput>) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.sendGroupNotification(ctx.params, ctx.meta.user.id);
    },
  },
  getAllNotification: {
    async handler(ctx: AppContext) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.getAllNotification(ctx.meta.user.id);
    },
  }, 
  getNotificationById: {
    params: {
      id: { type: 'string'}
    },
    async handler(ctx: AppContext) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.getNotificationById(ctx.params.id);
    },
  }, 
  updateNotification: {
    params: {
      title: { type: 'string' , optional: true},
      content: { type: 'string' , optional: true},
      userIds: { type: 'array', itemType: 'string', optional: true}
    },
    async handler(ctx: AppContext<NotificationCreateUpdate & { id: string }>) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.updateNotification(ctx.params);
    },
  }, 
  deleteNotification: {
    params: {
      id: { type: 'string' },
    },
    async handler(ctx: AppContext) {
      const userHistoriesDs = new NotificationDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403);
      };
      return userHistoriesDs.deleteNotification(ctx.params.id);
    },
  }, 
};

const events = {};

export default {
  name: 'notifications',
  actions,
  events,
  mixins: [PrismaMixin()],
};
