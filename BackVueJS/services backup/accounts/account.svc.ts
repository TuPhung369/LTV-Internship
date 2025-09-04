import { AppContext, ServiceActionsSchema } from '@shared/context';
import { PrismaMixin } from '@shared/mixins/prisma.mixin';
import Moleculer from 'moleculer';
import { resolveToken } from '@/shared/utils/jwt';
import admin from '../../shared/utils/firebase-admin-init';
import { AccountsDataSource } from './account.datasource';
import { Prisma } from '@prisma/client';
import { Action, canPerformAction } from '@/shared/utils/permissions';
import { Role } from '../../shared/utils/permissions'
import { UserSearchInput } from './account.sql';

const E = Moleculer.Errors;
const actions: ServiceActionsSchema = {
  loginApp: {
    params: {
      accessToken: 'string',
    },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      // Khởi tạo admin firebase nếu chưa có
      if (!admin.apps.length) {
        admin.initializeApp();
      }

      // kiểm tra tính hợp lệ của accessToken nếu có thì tiếp tục truy vấn dữ liệu
      try {
        const { payload, isValid } = await resolveToken(ctx.params.accessToken);
        if (!isValid) {
          throw new E.MoleculerError('Invalid or expired token', 401);
        }
        const data = {
          user_id: String(payload?.user_id),
          email: String(payload?.email),
          fullName: String(payload?.name),
        };
        return userDs.login(data);
      } catch (error) {
        throw new E.MoleculerError('Error verifying token', 500);
      }
    },
  },
  updateProfile: {
    params: {
      email: {
        optional: true,
        type: 'string',
      },
      fullName: {
        optional: true,
        type: 'string',
      },
      phoneNumber: {
        optional: true,
        type: 'string',
      },
      positionId: {
        optional: true,
        type: 'string',
      },
      departmentId: {
        optional: true,
        type: 'string',
      },
      skillIds: {
        optional: true,
        type: 'array',
        itemType: 'string',
      },
      statusId: {
        optional: true,
        type: 'string',
      },
    },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      const { email, fullName, phoneNumber, positionId, departmentId, skillIds, qualifications } =
        ctx.params;

      // Kiểm tra xem có ít nhất một tham số hợp lệ được cung cấp hay không
      if (
        !email &&
        !fullName &&
        !phoneNumber &&
        !positionId &&
        !departmentId &&
        !skillIds.length &&
        !qualifications.length
      ) {
        throw new Error('At least one field must be provided for updating the profile.');
      }

      return userDs.updateProfile({ ...ctx.params, id: ctx.meta.user.id });
    },
  },
  getMe: {
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      // truyền tham số id vào để lấy ra thông tin user đó
      return userDs.getMe(ctx.meta.user.id);
    },
  },
  getProfileById: {
    params: {
      id: {
        type: 'string',
      }
    },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      // truyền tham số id vào để lấy ra thông tin user đó
      return userDs.getProfileById(ctx.params.id);
    },
  },
  getAllUser: {
    params: {
      pageSize: { type: 'number', optional: true, convert: true },
      cursor: { type: 'number', optional: true, convert: true },
    },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      const pageSize = ctx.params.pageSize ? Number(ctx.params.pageSize) : 10;
      const cursor = ctx.params.cursor ? Number(ctx.params.cursor) : 1;
      if (pageSize && cursor) {
        return userDs.getAllUsersWithPagination(pageSize, cursor);
      } else {
        return userDs.getAllUsers();
      }
    },
  },
  // admin
  createUser: {
    params: {
        $$strict: 'remove',
        email: {
          type: 'string',
        },
        fullName: {
          type: 'string',
        },
        phoneNumber: {
          optional: true,
          type: 'string',
        },
        positionId: {
          optional: true,
          type: 'string',
        },
        departmentId: {
          optional: true,
          type: 'string',
        },
        skillIds: {
          optional: true,
          type: 'array',
          itemType: 'string',
        },
        statusId: {
          optional: true,
          type: 'string',
        },
        role:{
            type: "string",
            optional: true,
        }
      },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.CREATE)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.createUser(ctx.params);
    },
  },
  getUserById: {
    params: {
      id: {
        type: 'string',
      }
    },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.READ)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.getUserById(ctx.params.id);
    },
  },
  changeUserActivationStatus: {
    params: {
        $$strict: 'remove',
        id: {
          type: 'string',
          empty: false,
          length: 24,
        },
        isActive:{
          type: 'boolean',
          empty: false,
        }
      },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.UPDATE)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.changeUserActivationStatus(ctx.params.id, ctx.params.isActive);
    },
  },
  updateUser: {
    params: {
      id: {
        type: 'string',
      },
      email: {
        optional: true,
        type: 'string',
      },
      fullName: {
        optional: true,
        type: 'string',
      },
      phoneNumber: {
        optional: true,
        type: 'string',
      },
      positionId: {
        optional: true,
        type: 'string',
      },
      departmentId: {
        optional: true,
        type: 'string',
      },
      skillIds: {
        optional: true,
        type: 'array',
        itemType: 'string',
      },
      statusId: {
        optional: true,
        type: 'string',
      },
      role:{
        type: "string",
        optional: true,
      }
    },
    async handler(ctx: AppContext<Prisma.UserUncheckedCreateInput>) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.UPDATE)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      // chỉ có admin mới được thay đổi trường role
      if (ctx.params.role && ctx.meta.user.role === "MANAGER"){
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.updateUser({...ctx.params, idUser:ctx.params.id});
    },
  },
  deleteUser: {
    params: {
        id: {
          type: 'string',
        }
      },
    async handler(ctx: AppContext) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.DELETE)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.deleteUser(ctx.params.id);
    },
  },
  searchUser:{
    params: {
      email: {
        optional: true,
        type: 'string',
      },
      fullName: {
        optional: true,
        type: 'string',
      },
      phoneNumber: {
        optional: true,
        type: 'string',
      },
      positionId: {
        optional: true,
        type: 'string',
      },
      departmentId: {
        optional: true,
        type: 'string',
      },
      skillIds: {
        optional: true,
        type: 'array',
        itemType: 'string',
      },
      statusId: {
        optional: true,
        type: 'string',
      },
      qualificationTitle:{
        type: "string",
        optional: true,
      },
      role:{
        type: "string",
        optional: true,
      },
      isActive:{
        'type':'boolean',
        optional: true,
      },
      delFlg: {
        'type':'boolean',
        optional: true,
      }
    },
    async handler(ctx: AppContext<UserSearchInput>) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.READ)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.searchUser(ctx.params);
    },
  },
  // báo cáo số lượng nhân viên
  getUserCount:{
    async handler(ctx: AppContext<UserSearchInput>) {
      const userDs = new AccountsDataSource(ctx.prisma);
      if (!canPerformAction(ctx.meta.user.role as Role, Action.READ)) {
        throw new E.MoleculerError("Unauthorized access: You must have permission to update roles and permissions", 403)
      }
      return userDs.getUserCount();
    },
  }

};

const events = {};

export default {
  name: 'accounts',
  actions,
  events,
  mixins: [PrismaMixin()],
};
