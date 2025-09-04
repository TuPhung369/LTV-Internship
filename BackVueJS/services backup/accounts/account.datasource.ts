import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import { Prisma } from '@prisma/client';
import admin from '../../shared/utils/firebase-admin-init';
import { omit } from 'ramda';
import { USER_SELECTED_FIELDS, UserLoginInput, UserSearchInput } from './account.sql';

export class AccountsDataSource extends PrismaDataSource {
  private userDb = this.prisma.user;

  private positionDb = this.prisma.position;

  private departmentDb = this.prisma.department;

  private skillDb = this.prisma.skill;

  private statusDb = this.prisma.status;

  public async login(data: UserLoginInput) {
    // kiêm tra xem user tồn tại chưa nếu chưa lưu vào db và nếu có trả về thông tin user
    try {
      const user = await this.userDb.findFirst({
        where: {
          id: data.user_id,
        },
        select: USER_SELECTED_FIELDS,
      });
      if (!user) {
        const userData = {
          id: data.user_id,
          email: data.email,
          fullName: data.fullName,
        };

        return this.userDb.create({
          data: userData,
          select: USER_SELECTED_FIELDS,
        });
      }

      return user;
    } catch (error) {
      throw new Error('Failed to login or create user.');
    }
  }

  public async updateProfile(data: Prisma.UserUncheckedCreateInput) {
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
    // kiêm tra xem skillIds có trong table Skill không
    if (data.skillIds && Array.isArray(data.skillIds)) {
      const skills = await this.skillDb.findMany({
        where: {
          id: {
            in: data.skillIds,
          },
        },
      });
      // Kiểm tra xem tất cả các skillIds có được tìm thấy trong cơ sở dữ liệu không
      if (skills.length !== data.skillIds.length) {
        throw new Error('One or more skillIds do not exist in the Skills table.');
      }
    }
    // kiểm tra xem statusId có trong table Status không
    if (data.statusId) {
      const status = await this.statusDb.findUnique({
        where: {
          id: data.statusId,
        },
      });
      if (!status) {
        throw new Error('Status not found');
      }
    }

    return this.userDb.update({
      where: { id: String(data.id) },
      data: { ...omit(['id'], data) },
      select: USER_SELECTED_FIELDS,
    });
  }
  public async getMe(id: string) {
    return this.userDb.findFirst({
      where: { id },
      select: USER_SELECTED_FIELDS,
    });
  }
    public async getProfileById(id: string) {
    return this.userDb.findFirst({
      where: { idUser:id },
      select: USER_SELECTED_FIELDS,
    });
  }
  // admin
  public async createUser(data: Prisma.UserUncheckedCreateInput) {
    // kiểm tra email có trong table User chưa
    const user = await this.userDb.findFirst({
        where:{
            email:data.email
        },
        select:{
            id:true
        }
    });
    if (user){
        throw new Error('Email already exists');
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
    // kiêm tra xem skillIds có trong table Skill không
    if (data.skillIds && Array.isArray(data.skillIds)) {
      const skills = await this.skillDb.findMany({
        where: {
          id: {
            in: data.skillIds,
          },
        },
      });
      // Kiểm tra xem tất cả các skillIds có được tìm thấy trong cơ sở dữ liệu không
      if (skills.length !== data.skillIds.length) {
        throw new Error('One or more skillIds do not exist in the Skills table.');
      }
    }
    // kiểm tra xem statusId có trong table Status không
    if (data.statusId) {
      const status = await this.statusDb.findUnique({
        where: {
          id: data.statusId,
        },
      });
      if (!status) {
        throw new Error('Status not found');
      }
    }
    // Khởi tạo admin firebase nếu chưa có
    if (!admin.apps.length) {
      admin.initializeApp();
    }

    let userFirebase;
    try {
          // kiếm tra accounts trong firebase nếu tồn tại
          userFirebase = await admin.auth().getUserByEmail(data.email);
          throw new Error("Email already exists in Firebase");
    } catch (error) {
          // tạo accounts mới nếu không tồn tại trong firebase
          userFirebase = await admin.auth().createUser({
              email: data.email,
              emailVerified: false
          });
    }
    return this.userDb.create({
      data:{...data, id: userFirebase.uid},
      select:USER_SELECTED_FIELDS
    })
  }
  public async getUserById(idUser: string) {
  const user = await this.userDb.findFirst({
    where: {
      idUser: idUser
    },
    select: USER_SELECTED_FIELDS
  });
  if (!user) {
    throw new Error("User not found");
  };

  return user;
  }
  public async changeUserActivationStatus(idUser: string, isActive: boolean){
    const user = await this.userDb.findFirst({
      where: {
        idUser:idUser
      }, select:USER_SELECTED_FIELDS
    });
    if (!user){
      throw new Error("User not found");
    };

    return this.userDb.update({
      where: {
        idUser:idUser
      },
      data:{ isActive:isActive },
      select:USER_SELECTED_FIELDS
    });
  }
  public async updateUser(data: Prisma.UserUncheckedCreateInput) {
    // kiểm tra email có trong table User chưa
    const user = await this.userDb.findFirst({
        where:{
          idUser:data.idUser
        },
        select:{
          idUser:true
        }
    });
    if (!user){
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
    // kiêm tra xem skillIds có trong table Skill không
    if (data.skillIds && Array.isArray(data.skillIds)) {
      const skills = await this.skillDb.findMany({
        where: {
          id: {
            in: data.skillIds,
          },
        },
      });
      // Kiểm tra xem tất cả các skillIds có được tìm thấy trong cơ sở dữ liệu không
      if (skills.length !== data.skillIds.length) {
        throw new Error('One or more skillIds do not exist in the Skills table.');
      }
    }
    // kiểm tra xem statusId có trong table Status không
    if (data.statusId) {
      const status = await this.statusDb.findUnique({
        where: {
          id: data.statusId,
        },
      });
      if (!status) {
        throw new Error('Status not found');
      }
    }

    return this.userDb.update({
      where: { idUser: data.idUser },
      data: { ...omit(['idUser', 'id'], data) },
      select: USER_SELECTED_FIELDS,
    });

  }
  public async deleteUser(idUser: string){
    const user = await this.userDb.findFirst({
      where: {
        idUser:idUser
      }, select:USER_SELECTED_FIELDS
    });
    if (!user){
      throw new Error("User not found");
    };

    return this.userDb.update({
      where: {
        idUser:idUser
      },
      data:{ delFlg:true },
      select:USER_SELECTED_FIELDS
    });
  }
  public async getAllUsersWithPagination(pageSize: number, cursor: number) {
  const skip = (cursor - 1) * pageSize;
  const take = pageSize;

  // Retrieve total count of users
  const totalItems = await this.userDb.count({
    where: {
      delFlg: false,
    },
  });
  // Calculate pageCount based on totalItems and pageSize
  const pageCount = Math.ceil(totalItems / pageSize);
  // Fetch users data for the current page
  const users = await this.userDb.findMany({
    where: {
      delFlg: false,
    },
    select: USER_SELECTED_FIELDS,
    skip,
    take,
  });

  // Return an object containing totalItems, pageCount, and users
  return {
    totalItems,
    pageCount,
    users,
  };
}
  public async getAllUsers() {
    const users = await this.userDb.findMany({
      where: {
        delFlg: false,
      },
      select: USER_SELECTED_FIELDS,
    });
    return users;
  }
  public async searchUser(data: UserSearchInput){
    let whereClause: any = {};

    if (data.email) {
      whereClause.email = data.email;
    }

    if (data.fullName) {
      whereClause.fullName = {
        contains: data.fullName,
        mode: 'insensitive', // không phân biệt chữ hoa với thường
      };
    }

    if (data.phoneNumber) {
      whereClause.phoneNumber = {
        contains: data.phoneNumber,
        mode: 'insensitive', // không phân biệt chữ hoa với thường
      };
    }

    if (data.positionId) {
      whereClause.positionId = data.positionId;
    }

    if (data.departmentId) {
      whereClause.departmentId = data.departmentId;
    }

    if (data.skillIds && data.skillIds.length > 0) {
      whereClause.skillIds = {
        hasSome: data.skillIds,
      };
    }

    if (data.qualificationTitle) {
      whereClause.qualifications = {
        some: {
          title: {
            contains: data.qualificationTitle,
            mode: 'insensitive', // không phân biệt chữ hoa với thường
          },
        },
      };
    }

    if (data.statusId) {
      whereClause.statusId = data.statusId;
    }

    if (data.role) {
      whereClause.role = data.role;
    }

    if (data.isActive !== undefined) {
      whereClause.isActive = data.isActive;
    }

    if (data.delFlg !== undefined) {
      whereClause.delFlg = data.delFlg;
    }

    return this.userDb.findMany({
      where: whereClause,
      select:USER_SELECTED_FIELDS
    });

  }
  // báo cáo số lượng nhân viên
public async getUserCount(){
    // Số lượng nhân viên đang hoạt động
    const activeUser = await this.userDb.count({
      where: {
        delFlg:false,
        isActive:true
      }
    });
    // Số lượng nhân viên không hoạt động
    const inactiveUser = await this.userDb.count({
      where: {
        delFlg:false,
        isActive:false
      }
    });

    return { activeUser:activeUser,  inactiveUser:inactiveUser}
  };
}
