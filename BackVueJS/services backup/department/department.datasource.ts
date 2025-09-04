import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { DEPARTMENT_SELECTED_FIELDS } from './department.sql';

export class DepartmentDataSource extends PrismaDataSource {
  private departmentDb = this.prisma.department;

  public async createDepartment(data: Prisma.DepartmentCreateInput) {
    return this.departmentDb.create({
      data,
      select: DEPARTMENT_SELECTED_FIELDS,
    });
  }

  public async getAllDepartment() {
    return this.departmentDb.findMany({
      where: {
        delFlg: false,
      },
      select: DEPARTMENT_SELECTED_FIELDS,
    });
  }

  public async updateDepartment(data: Prisma.DepartmentCreateInput & { id: string }) {
    const department = await this.departmentDb.findUnique({
      where: { id: data.id },
    });
    if (!department) {
      throw new Error('Department not found');
    }

    return this.departmentDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: DEPARTMENT_SELECTED_FIELDS,
    });
  }

  public async deleteDepartment(id: string) {
    const departments = await this.departmentDb.findUnique({
      where: {
        id,
      },
      select: DEPARTMENT_SELECTED_FIELDS,
    });
    if (!departments) {
      throw new Error('Position not found');
    }
    return this.departmentDb.update({
      where: { id },
      data: { delFlg: true },
      select: DEPARTMENT_SELECTED_FIELDS,
    });
  }
  public async getUserCountByDepartment() {
    return this.departmentDb.findMany({
      where: {
        delFlg:false
      },
      select:{
        title:true,
        _count:{
          select: {
            user:true
          }
        }
      }

    });
  }
}
