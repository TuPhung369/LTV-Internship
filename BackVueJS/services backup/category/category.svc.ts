import { Prisma } from '@prisma/client';
import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import Moleculer from 'moleculer';
import { CategoryDataSource } from './category.datasource';

const E = Moleculer.Errors;
const actions: ServiceActionsSchema = {
  createCategory: {
    params: {
      title: 'string',
      desc: 'string',
      order: 'number',
      delFlg: 'boolean',
    },
    async handler(ctx: AppContext<Prisma.CategoryCreateInput>) {
      const cateDSs = new CategoryDataSource(ctx.prisma);
      const result = await cateDSs.createCategory(ctx.params);
      return result;
    },
  },
  getCategoryById: {
    params: { id: 'string' },
    async handler(ctx: AppContext<{ id: string }>) {
      const { id } = ctx.params;
      const cateDSs = new CategoryDataSource(ctx.prisma);
      const result = await cateDSs.getCategoryById(id);
      if (!result) {
        return Promise.reject(new E.MoleculerError('Category not found', 404));
      }
      return result;
    },
  },
  getListCategories: {
    async handler(ctx: AppContext) {
      const cateDSs = new CategoryDataSource(ctx.prisma);
      const { results } = await cateDSs.getListCategories();
      return results;
    },
  },

  updateCategory: {
    params: {
      id: 'string',
      title: {
        optional: true,
        type: 'string',
      },
      order: {
        optional: true,
        type: 'number',
      },
      desc: {
        optional: true,
        type: 'string',
      },
    },
    async handler(ctx: AppContext<Prisma.CategoryUpdateInput & { id: string }>) {
      const cateDSs = new CategoryDataSource(ctx.prisma);
      const result = await cateDSs.updateCategory(ctx.params);
      return result;
    },
  },

  deleteCategory: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const cateDSs = new CategoryDataSource(ctx.prisma);
      const result = await cateDSs.deleteCategory(ctx.params.id);
      return result;
    },
  },
};

const events = {};

export default {
  name: 'categories',
  actions,
  events,
  mixins: [PrismaMixin()],
};
