import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { PositionsDataSource } from './position.datasource';

const actions: ServiceActionsSchema = {
  createPositions: {
    params: {
      title: { type: 'string', min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.PositionCreateInput>) {
      const positionDs = new PositionsDataSource(ctx.prisma);
      return positionDs.createPositions(ctx.params);
    },
  },
  updatePositions: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.PositionCreateInput & { id: string }>) {
      const positionDs = new PositionsDataSource(ctx.prisma);
      return positionDs.updatePositions(ctx.params);
    },
  },
  getAllPositions: {
    async handler(ctx: AppContext) {
      const positionDs = new PositionsDataSource(ctx.prisma);
      return positionDs.getAllPositions();
    },
  },
  deletePositions: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const positionDs = new PositionsDataSource(ctx.prisma);
      return positionDs.deletePositions(ctx.params.id);
    },
  },
  // Số lượng nhân viên theo vị trí
  getUserCountByPositions: {
    async handler(ctx: AppContext<{ id: string }>) {
      const positionDs = new PositionsDataSource(ctx.prisma);
      return positionDs.getUserCountByPositions();
    },
  },
};

const events = {};

export default {
  name: 'positions',
  actions,
  events,
  mixins: [PrismaMixin()],
};
