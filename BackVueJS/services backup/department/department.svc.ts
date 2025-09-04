import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { DepartmentDataSource } from './department.datasource';

const actions: ServiceActionsSchema = {
  createDepartment: {
    params: {
      title: { type: 'string', min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.DepartmentCreateInput>) {
      const departmentDs = new DepartmentDataSource(ctx.prisma);
      return departmentDs.createDepartment(ctx.params);
    },
  },
  updateDepartment: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.DepartmentCreateInput & { id: string }>) {
      const departmentDs = new DepartmentDataSource(ctx.prisma);
      return departmentDs.updateDepartment(ctx.params);
    },
  },
  getAllDepartment: {
    async handler(ctx: AppContext) {
      const departmentDs = new DepartmentDataSource(ctx.prisma);
      return departmentDs.getAllDepartment();
    },
  },
  deleteDepartment: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const departmentDs = new DepartmentDataSource(ctx.prisma);
      return departmentDs.deleteDepartment(ctx.params.id);
    },
  },
  // Số lượng nhân viên theo phòng ban
  getUserCountByDepartment: {
    async handler(ctx: AppContext<{ id: string }>) {
      const departmentDs = new DepartmentDataSource(ctx.prisma);
      return departmentDs.getUserCountByDepartment();
    },
  },
};

const events = {};

export default {
  name: 'departments',
  actions,
  events,
  mixins: [PrismaMixin()],
};
