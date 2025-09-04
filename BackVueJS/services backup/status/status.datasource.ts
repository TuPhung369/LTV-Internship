import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { STATUS_SELECTED_FIELDS } from './status.sql';

export class StatusDataSource extends PrismaDataSource {
  private statusDb = this.prisma.status;

  public async createStatus(data: Prisma.StatusCreateInput) {
    return this.statusDb.create({
      data,
      select: STATUS_SELECTED_FIELDS,
    });
  }

  public async getAllStatus() {
    return this.statusDb.findMany({
      where: {
        delFlg: false,
      },
      select: STATUS_SELECTED_FIELDS,
    });
  }

  public async updateStatus(data: Prisma.StatusCreateInput & { id: string }) {
    const status = await this.statusDb.findUnique({
      where: { id: data.id },
    });
    if (!status) {
      throw new Error('Status not found');
    }

    return this.statusDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: STATUS_SELECTED_FIELDS,
    });
  }

  public async deleteStatus(id: string) {
    const status = await this.statusDb.findUnique({
      where: {
        id,
      },
      select: STATUS_SELECTED_FIELDS,
    });
    if (!status) {
      throw new Error('Status not found');
    }
    return this.statusDb.update({
      where: { id },
      data: { delFlg: true },
      select: STATUS_SELECTED_FIELDS,
    });
  }
}
