import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { POSITION_SELECTED_FIELDS } from './position.sql';

export class PositionsDataSource extends PrismaDataSource {
  private positionDb = this.prisma.position;

  public async createPositions(data: Prisma.PositionCreateInput) {
    return this.positionDb.create({
      data,
      select: POSITION_SELECTED_FIELDS,
    });
  }

  public async getAllPositions() {
    return this.positionDb.findMany({
      where: {
        delFlg: false,
      },
      select: POSITION_SELECTED_FIELDS,
    });
  }

  public async updatePositions(data: Prisma.PositionCreateInput & { id: string }) {
    const position = await this.positionDb.findUnique({
      where: { id: data.id },
    });
    if (!position) {
      throw new Error('Position not found');
    }

    return this.positionDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: POSITION_SELECTED_FIELDS,
    });
  }

  public async deletePositions(id: string) {
    const positions = await this.positionDb.findUnique({
      where: {
        id,
      },
      select: POSITION_SELECTED_FIELDS,
    });
    if (!positions) {
      throw new Error('Position not found');
    }
    return this.positionDb.update({
      where: { id },
      data: { delFlg: true },
      select: POSITION_SELECTED_FIELDS,
    });
  }
  
  public async getUserCountByPositions() {
    return this.positionDb.findMany({
      where: {
        delFlg:false
      },
      select: {
        title:true,
        _count:{
          select:{
            user:true
          }
        }
      },
    });
  }
}
