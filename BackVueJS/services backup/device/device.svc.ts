import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { DeviceDataSource } from './device.datasource';
import { DeviceCreateInput } from './device.sql';

const actions: ServiceActionsSchema = {
    createDevice: {
      params: {
          dvcId: { type: 'string' },
          regToken: { type: 'string' },
      },
      async handler(ctx: AppContext<DeviceCreateInput>) {
        const userHistoriesDs = new DeviceDataSource(ctx.prisma);
        return userHistoriesDs.createDevice({...ctx.params, userId:ctx.meta.user.id});
      },
    },
    getAllDevice: {
      async handler(ctx: AppContext) {
        const userHistoriesDs = new DeviceDataSource(ctx.prisma);
        return userHistoriesDs.getAllDevice(ctx.meta.user.id);
      },
    },
    deleteDevice: {
      params: {
        id: { type: 'string' }
      },
      async handler(ctx: AppContext) {
        const userHistoriesDs = new DeviceDataSource(ctx.prisma);
        return userHistoriesDs.deleteDevice(ctx.params.id, ctx.meta.user.id);
      },
    },
};

const events = {};

export default {
  name: 'devices',
  actions,
  events,
  mixins: [PrismaMixin()],
};
