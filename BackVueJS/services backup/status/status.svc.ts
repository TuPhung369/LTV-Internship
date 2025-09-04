import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { StatusDataSource } from './status.datasource';

const actions: ServiceActionsSchema = {
  createStatus: {
    params: {
      title: { type: 'string', min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.StatusCreateInput>) {
      const statusDb = new StatusDataSource(ctx.prisma);
      return statusDb.createStatus(ctx.params);
    },
  },
  updateStatus: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.StatusCreateInput & { id: string }>) {
      const statusDb = new StatusDataSource(ctx.prisma);
      return statusDb.updateStatus(ctx.params);
    },
  },
  getAllStatus: {
    async handler(ctx: AppContext) {
      const statusDb = new StatusDataSource(ctx.prisma);
      return statusDb.getAllStatus();
    },
  },
  deleteStatus: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const statusDb = new StatusDataSource(ctx.prisma);
      return statusDb.deleteStatus(ctx.params.id);
    },
  },
};

const events = {};

export default {
  name: 'status',
  actions,
  events,
  mixins: [PrismaMixin()],
};
