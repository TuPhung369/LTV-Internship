import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import { omit } from 'ramda';
import { QUALIFICATION_SELECTED_FIELDS } from './qualifications.sql';

export class QualificationsDataSource extends PrismaDataSource {
  private qualificationDb = this.prisma.qualification;

  private userDb = this.prisma.user;

  public async createQualification(data: Prisma.QualificationCreateInput, user_id: string) {
    const user = await this.userDb.findFirst({
      where: { id: user_id },
      select: { idUser: true },
    });

    // kiểm tra xem user có tòn tại không
    if (!user) {
      throw new Error('User not found');
    }

    return this.qualificationDb.create({
      data: {
        ...data,
        user: {
          connect: {
            idUser: user.idUser,
          },
        },
      },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  }

  public async getAllQualification(user_id: string) {
    const user = await this.userDb.findFirst({
      where: { id: user_id },
      select: { idUser: true },
    });

    // kiểm tra xem user có tòn tại không
    if (!user) {
      throw new Error('User not found');
    }

    return this.qualificationDb.findMany({
      where: {
        delFlg: false,
        userId: user.idUser,
      },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  }

  public async updateQualification(
    data: Prisma.QualificationCreateInput & { id: string },
    user_id: string,
  ) {
    const user = await this.userDb.findFirst({
      where: { id: user_id },
      select: { idUser: true },
    });

    // kiểm tra xem user có tòn tại không
    if (!user) {
      throw new Error('User not found');
    }

    const qualification = await this.qualificationDb.findUnique({
      where: { id: data.id, userId: user.idUser },
    });
    if (!qualification) {
      throw new Error(
        'No qualification found or you do not have permission to change qualification',
      );
    }

    return this.qualificationDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  }

  public async deleteQualification(id: string, user_id: string) {
    const user = await this.userDb.findFirst({
      where: { id: user_id },
      select: { idUser: true },
    });

    // kiểm tra xem user có tòn tại không
    if (!user) {
      throw new Error('User not found');
    }
    const qualifications = await this.qualificationDb.findUnique({
      where: {
        id,
        userId: user.idUser,
      },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
    if (!qualifications) {
      throw new Error('Position not found');
    }
    return this.qualificationDb.update({
      where: { id, userId: user.idUser },
      data: { delFlg: true },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  }
  // admin
  public async getAllUserQualification() {

    return this.qualificationDb.findMany({
      where: {
        delFlg: false,
      },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  };
  
  public async getUserQualificationById(id:string) {

    const qualification = await this.qualificationDb.findFirst({
      where: {
        delFlg: false, id:id
      },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
    if (!qualification){
        throw new Error("Qualification not found");
    }
    return qualification
  };

  public async updateUserQualification(
    data: Prisma.QualificationCreateInput & { id: string }
  ) {
    
    const qualification = await this.qualificationDb.findUnique({
      where: { id: data.id },
    });
    if (!qualification) {
      throw new Error(
        'Qualification not found',
      );
    }

    return this.qualificationDb.update({
      where: { id: data.id },
      data: { ...omit(['id'], data) },
      select: QUALIFICATION_SELECTED_FIELDS,
    });
  }
}
