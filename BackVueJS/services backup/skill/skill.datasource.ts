import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { SKILL_SELECTED_FIELDS } from './skill.sql';

export class SkillDataSource extends PrismaDataSource {
  private skillDb = this.prisma.skill;

  public async createSkill(data: Prisma.SkillCreateInput) {
    return this.skillDb.create({
      data,
      select: SKILL_SELECTED_FIELDS,
    });
  }

  public async getAllSkill() {
    return this.skillDb.findMany({
      where: {
        delFlg: false,
      },
      select: SKILL_SELECTED_FIELDS,
    });
  }

  public async updateSkill(data: Prisma.SkillCreateInput & { id: string }) {
    const skill = await this.skillDb.findUnique({
      where: { id: data.id },
    });
    if (!skill) {
      throw new Error('Skill not found');
    }

    return this.skillDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: SKILL_SELECTED_FIELDS,
    });
  }

  public async deleteSkill(id: string) {
    const skill = await this.skillDb.findUnique({
      where: {
        id,
      },
      select: SKILL_SELECTED_FIELDS,
    });
    if (!skill) {
      throw new Error('Skill not found');
    }
    return this.skillDb.update({
      where: { id },
      data: { delFlg: true },
      select: SKILL_SELECTED_FIELDS,
    });
  }
  
  public async getUserCountBySkill() {
    return this.skillDb.findMany({
      where: {
        delFlg:false
      },
      select: {
        title:true,
        _count:{
          select:{
            users:true
          }
        }
      },
    });
  }
}
