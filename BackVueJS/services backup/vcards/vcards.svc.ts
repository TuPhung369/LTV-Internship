import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { VcardDataSource } from './vcards.datasource';

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const actions: ServiceActionsSchema = {
  getVcard: {
    async handler(ctx: AppContext) {
      console.log('first');
      const vcardDb = new VcardDataSource(ctx.prisma);
      const { vCardData, headers, filename } = await vcardDb.getCreateVcard(ctx.meta.user.id);

      // Return an object containing both data and headers
      return {
        data: vCardData,
        headers,
        filename,
      };
    },
  },
  getVcardById: {
    params: {
      id: { type: 'string' },
    },

    async handler(ctx: AppContext) {
      console.log('Fetching vCard for userId:', ctx.params.id);
      const vcardDb = new VcardDataSource(ctx.prisma);
      try {
        const { vCardData, headers, filename } = await vcardDb.getCreateVcard(ctx.params.id);
        return {
          data: vCardData,
          headers,
          filename,
        };
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new Error(error.message);
        }
        console.error('An unexpected error occurred:', error);
        throw new Error('An unexpected error occurred');
      }
    },
  },
};

const events = {};

export default {
  name: 'vcards',
  actions,
  events,
  mixins: [PrismaMixin()],
};
