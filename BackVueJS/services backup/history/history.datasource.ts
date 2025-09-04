import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { HISTORIES_SELECTED_FIELDS, UserHistoryCreateInput } from './history.sql';

export class userHistoriesDataSource extends PrismaDataSource {
  private userHistoriesDb = this.prisma.userHistory;

  private userDb = this.prisma.user;

  private positionDb = this.prisma.position;

  private departmentDb = this.prisma.department;

  public async createHistory(data: UserHistoryCreateInput) {
    const user = await this.userDb.findFirst({
      where: {
        id: data.user_id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const position = await this.positionDb.findFirst({
      where: {
        id: data.positionId,
      },
    });
    if (!position) {
      throw new Error('Position not found');
    }
    const department = await this.departmentDb.findFirst({
      where: {
        id: data.departmentId,
      },
    });
    if (!department) {
      throw new Error('Department not found');
    }

    return this.userHistoriesDb.create({
      data: {
        user: { connect: { id: data.user_id } },
        position: { connect: { id: data.positionId } },
        department: { connect: { id: data.departmentId } },
        startDate: data.startDate,
        endDate: data.endDate,
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }
  public async getHistoryCurrent(userId:string) {
    const user = await this.userDb.findFirst({
      where: {
        id:userId
      }
    })
    return this.userHistoriesDb.findMany({
      where: {
        delFlg: false,
        userIdUser: user?.idUser
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }
  public async getAllHistory() {
    return this.userHistoriesDb.findMany({
      where: {
        delFlg: false,
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }

  public async updateHistory(
    data: Prisma.UserHistoryUncheckedCreateInput & { id: string },
    user_id: string,
  ) {
    const user = await this.userDb.findFirst({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    // kiểm tra trường positionId có trong table Position hay không
    if (data.positionId) {
      const position = await this.positionDb.findUnique({
        where: { id: data.positionId },
      });

      if (!position) {
        throw new Error('Position not found');
      }
    }
    // kiểm tra trường departmentId có trong table Department hay không
    if (data.departmentId) {
      const department = await this.departmentDb.findUnique({
        where: { id: data.departmentId },
      });

      if (!department) {
        throw new Error('Department not found');
      }
    }

    return this.userHistoriesDb.update({
      where: { id: data.id, userIdUser: user.idUser },
      data: {
        ...omit(['id'], {
          ...data,
          userIdUser: user.idUser,
        }),
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }

  public async deleteHistory(id: string, user_id: string) {
    const user = await this.userDb.findFirst({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const userHistories = await this.userHistoriesDb.findUnique({
      where: {
        id,
        userIdUser: user.idUser,
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
    if (!userHistories) {
      throw new Error('UserHistory not found');
    }
    return this.userHistoriesDb.update({
      where: { id, userIdUser: user.idUser },
      data: { delFlg: true },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }
  // admin
  public async getAllUserHistory() {
    return this.userHistoriesDb.findMany({
      where: {
        delFlg: false,
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }

  public async updateUserHistory(
    data: Prisma.UserHistoryUncheckedCreateInput & { id: string },
  ) {
    // kiểm tra trường positionId có trong table Position hay không
    if (data.positionId) {
      const position = await this.positionDb.findUnique({
        where: { id: data.positionId },
      });

      if (!position) {
        throw new Error('Position not found');
      }
    }
    // kiểm tra trường departmentId có trong table Department hay không
    if (data.departmentId) {
      const department = await this.departmentDb.findUnique({
        where: { id: data.departmentId },
      });

      if (!department) {
        throw new Error('Department not found');
      }
    }

    return this.userHistoriesDb.update({
      where: { id: data.id },
      data: {
        ...omit(['id'], data),
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
  }

  public async getUserHistoryById(id: string) {
    const userHistories = await this.userHistoriesDb.findUnique({
      where: {
        id:id,
        delFlg:false
      },
      select: HISTORIES_SELECTED_FIELDS,
    });
    if (!userHistories) {
      throw new Error('UserHistory not found');
    }
   return userHistories
  }
  public async getAllUserPromotions() {
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);
    const lastYear = new Date();
    lastYear.setFullYear(now.getFullYear() - 1);

   const promotionsLastWeek = await this.userHistoriesDb.count({
    where:{
      delFlg:false,
      startDate:{
        gte:lastWeek
      },
    },
    orderBy: {
      startDate: 'asc',
    },
   }) ;
   const promotionsLastMonth = await this.userHistoriesDb.count({
    where:{
      delFlg:false,
      startDate:{
        gte:lastMonth
      }
    },
    orderBy: {
      startDate: 'asc',
    },
   }) ;
   const promotionsLastYear = await this.userHistoriesDb.count({
    where:{
      delFlg:false,
      startDate:{
        gte:lastYear
      }
    },
    orderBy: {
      startDate: 'asc',
    },
   }) ;
   return {
    promotionsLastWeek:promotionsLastWeek,
    promotionsLastMonth:promotionsLastMonth,
    promotionsLastYear:promotionsLastYear
   }
  }
}
