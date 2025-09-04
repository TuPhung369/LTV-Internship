import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { userHistoriesDataSource } from './history.datasource';
import { UserHistoryCreateInput } from './history.sql';
import Moleculer from 'moleculer';

const E = Moleculer.Errors;
const actions: ServiceActionsSchema = {
  createHistory: {
    params: {
      positionId: { type: 'string' },
      departmentId: { type: 'string' },
      startDate: { type: 'string' },
      endDate: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<UserHistoryCreateInput>) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      return userHistoriesDs.createHistory({ ...ctx.params, user_id: ctx.meta.user.id });
    },
  },
  updateHistory: {
    params: {
      positionId: { type: 'string', optional: true },
      departmentId: { type: 'string', optional: true },
      startDate: { type: 'string', optional: true },
      endDate: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.UserHistoryUncheckedCreateInput & { id: string }>) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      return userHistoriesDs.updateHistory(ctx.params, ctx.meta.user.id);
    },
  },
  getHistoryCurrent: {
    async handler(ctx: AppContext) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      return userHistoriesDs.getHistoryCurrent(ctx.meta.user.id);
    },
  },
  getAllHistory: {
    async handler(ctx: AppContext) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      return userHistoriesDs.getAllHistory();
    },
  },
  deleteHistory: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      return userHistoriesDs.deleteHistory(ctx.params.id, ctx.meta.user.id);
    },
  },
  // admin
  updateUserHistory: {
    params: {
      positionId: { type: 'string', optional: true },
      departmentId: { type: 'string', optional: true },
      startDate: { type: 'string', optional: true },
      endDate: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.UserHistoryUncheckedCreateInput & { id: string }>) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return userHistoriesDs.updateUserHistory(ctx.params);
    },
  },
  getAllUserHistory: {
    async handler(ctx: AppContext) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return userHistoriesDs.getAllUserHistory();
    },
  },
  getUserHistoryById: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return userHistoriesDs.getUserHistoryById(ctx.params.id);
    },
  },
  // Báo cáo thăng chức trong tuần, tháng và năm vừa qua
  getAllUserPromotions: {
    async handler(ctx: AppContext) {
      const userHistoriesDs = new userHistoriesDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return userHistoriesDs.getAllUserPromotions();
    },
  },
};

const events = {};

export default {
  name: 'histories',
  actions,
  events,
  mixins: [PrismaMixin()],
};
