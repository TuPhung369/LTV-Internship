import { Prisma } from '@prisma/client';
import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { omit } from 'ramda';
import { CATEGORY_SELECTED_FIELDS } from './category.sql';

export class CategoryDataSource extends PrismaDataSource {
  private categoryDb = this.prisma.category;

  public async createCategory(data: Prisma.CategoryCreateInput) {
    return this.categoryDb.create({
      data,
      select: CATEGORY_SELECTED_FIELDS,
    });
  }

  public async getCategoryById(id: string) {
    return this.categoryDb.findUnique({
      where: { id },
      select: CATEGORY_SELECTED_FIELDS,
    });
  }

  public async getListCategories() {
    const result = await this.categoryDb.findMany({
      where: { delFlg: true },
      select: CATEGORY_SELECTED_FIELDS,
      orderBy: [{ order: 'asc' }],
    });
    return {
      results: result,
    };
  }

  public async updateCategory(params: Prisma.CategoryUpdateInput & { id: string }) {
    const category = await this.categoryDb.findUnique({ where: { id: params.id } });
    if (!category) {
      throw new Error('Category not found');
    }
    return this.categoryDb.update({
      where: { id: params.id },
      data: omit(['id'], params),
      select: CATEGORY_SELECTED_FIELDS,
    });
  }

  public async deleteCategory(id: string) {
    const category = await this.categoryDb.findUnique({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }

    return this.categoryDb.update({
      where: { id },
      data: { delFlg: false },
      select: CATEGORY_SELECTED_FIELDS,
    });
  }
}
