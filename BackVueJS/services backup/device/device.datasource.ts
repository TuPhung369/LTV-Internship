import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import {  DEVICE_SELECTED_FIELDS, DeviceCreateInput } from './device.sql';

export class DeviceDataSource extends PrismaDataSource {
  private deviceDb = this.prisma.device;
  private userDb = this.prisma.user;

  public async createDevice(data: DeviceCreateInput) {
    const user = await this.userDb.findFirst({
      where:{
        id:data.userId
      },
      select:{ idUser:true }
    });
    // kiểm tra thiết bị đã tồn tại chưa
    const device = await this.deviceDb.findFirst({
      where:{
        userId:user?.idUser,
        regToken:data.regToken
      }
    })

    if (device){
      return device
    }
    
    return this.deviceDb.create({
        data:data,
        select: DEVICE_SELECTED_FIELDS
    });
  } 
  public async getAllDevice(userId:string) {

    const user = await this.userDb.findFirst({
      where:{
        id:userId
      },
      select:{ idUser:true }
    })
    
    return this.deviceDb.findMany({
      where:{
        userId:user?.idUser
      },
      select: DEVICE_SELECTED_FIELDS
    })
  } 

  public async deleteDevice(id: string, userId:string) {

    const user = await this.userDb.findFirst({
      where:{
        id:userId
      },
      select:{ idUser:true }
    })
    
    return this.deviceDb.update({
      where:{
        userId:user?.idUser,
        id:id
      },
      data: { delFlg:true },
      select: DEVICE_SELECTED_FIELDS
    })
  } 
}
