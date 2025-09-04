import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { SkillDataSource } from './skill.datasource';

const actions: ServiceActionsSchema = {
  createSkill: {
    params: {
      title: { type: 'string', min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.SkillCreateInput>) {
      const skillDs = new SkillDataSource(ctx.prisma);
      return skillDs.createSkill(ctx.params);
    },
  },
  updateSkill: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      description: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.SkillCreateInput & { id: string }>) {
      const skillDs = new SkillDataSource(ctx.prisma);
      return skillDs.updateSkill(ctx.params);
    },
  },
  getAllSkill: {
    async handler(ctx: AppContext) {
      const skillDs = new SkillDataSource(ctx.prisma);
      return skillDs.getAllSkill();
    },
  },
  deleteSkill: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const skillDs = new SkillDataSource(ctx.prisma);
      return skillDs.deleteSkill(ctx.params.id);
    },
  },
  // Báo cáo số lượng nhân viên theo kỹ năng
  getUserCountBySkill: {
    async handler(ctx: AppContext) {
      const skillDs = new SkillDataSource(ctx.prisma);
      return skillDs.getUserCountBySkill();
    },
  },
};

const events = {};

export default {
  name: 'skills',
  actions,
  events,
  mixins: [PrismaMixin()],
};
