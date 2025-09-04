import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import { Prisma } from '@prisma/client';
import { QualificationsDataSource } from './qualifications.datasource';
import Moleculer from 'moleculer';

const E = Moleculer.Errors;
const actions: ServiceActionsSchema = {
  createQualification: {
    params: {
      title: { type: 'string', min: 3 },
      field: { type: 'string', min: 3 },
      institute: { type: 'string', min: 3 },
      dateObtained: { type: 'string' },
    },
    async handler(ctx: AppContext<Prisma.QualificationCreateInput>) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      return qualificationDs.createQualification({ ...ctx.params }, ctx.meta.user.id);
    },
  },
  updateQualification: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      field: { type: 'string', optional: true, min: 3 },
      institute: { type: 'string', optional: true, min: 3 },
      dateObtained: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.QualificationCreateInput & { id: string }>) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      return qualificationDs.updateQualification(ctx.params, ctx.meta.user.id);
    },
  },
  getAllQualification: {
    async handler(ctx: AppContext) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      return qualificationDs.getAllQualification(ctx.meta.user.id);
    },
  },
  deleteQualification: {
    params: {
      id: 'string',
    },
    async handler(ctx: AppContext<{ id: string }>) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      return qualificationDs.deleteQualification(ctx.params.id, ctx.meta.user.id);
    },
  },
  // admin
  updateUserQualification: {
    params: {
      title: { type: 'string', optional: true, min: 3 },
      field: { type: 'string', optional: true, min: 3 },
      institute: { type: 'string', optional: true, min: 3 },
      dateObtained: { type: 'string', optional: true },
    },
    async handler(ctx: AppContext<Prisma.QualificationCreateInput & { id: string }>) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return qualificationDs.updateUserQualification(ctx.params);
    },
  },
  getAllUserQualification: {
    async handler(ctx: AppContext) {
      const qualificationDs = new QualificationsDataSource(ctx.prisma);
      if (ctx.meta.user.role !== "ADMIN"){
        throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
      }
      return qualificationDs.getAllUserQualification();
    },
  },
  getUserQualificationById: {
    params: { id: 'string' },
    async handler(ctx: AppContext) {
        const qualificationDs = new QualificationsDataSource(ctx.prisma);
        if (ctx.meta.user.role !== "ADMIN"){
            throw new E.MoleculerError("Unauthorized access: You must be an admin to perform this action", 403)
        }
        return qualificationDs.getUserQualificationById(ctx.params.id);
    },
  }
};

const events = {};

export default {
  name: 'qualifications',
  actions,
  events,
  mixins: [PrismaMixin()],
};
