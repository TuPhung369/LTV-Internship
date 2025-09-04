import { PrismaDataSource } from '@shared/datasource/PrismaDataSource';
import {  NOTIFICATION_SELECTED_FIELDS, NotificationCreateInput, NotificationCreateUpdate } from './notification.sql';
import admin from '@/shared/utils/firebase-admin-init';

export class NotificationDataSource extends PrismaDataSource {
  private notificationDb = this.prisma.notification;
  private deviceDb = this.prisma.device;
  private userDb = this.prisma.user

  public async sendAllNotification(data: NotificationCreateInput, userId: string) {
    // lấy ra tất cả các thiết bị
    const devices = await this.deviceDb.findMany({ where: { delFlg: false } });
    // lọc mảng lấy ra regToken và loại bỏ token không hợp lệ
    const listRegTokens = devices.map(device => device.regToken ?? '').filter(token => token);
  
    // lấy ra tất cả người dùng đang hoạt động
    const activeUsers = await this.userDb.findMany({ where: { isActive: true, delFlg: false } });
    // lọc mảng chỉ có idUser của người dùng đang hoạt động
    const activeUserIds = activeUsers.map(user => user.idUser);
  
    // Lưu các thông báo trong cơ sở dữ liệu với ID của người dùng đang hoạt động
    await this.notificationDb.create({
      data: { 
        title: data.title, 
        content: data.content, 
        userId: userId, 
        creUsrId: activeUserIds 
      },
    });
  
    // Chỉ gửi thông báo nếu có ít nhất một token hợp lệ
    if (listRegTokens.length > 0) {
      const message = {
        notification: {
          title: data.title,
          body: data.content,
        },
        tokens: listRegTokens,
      };
      return admin.messaging().sendMulticast(message);  // Gửi thông báo qua Firebase Messaging
    }
  
    return { success: true, message: "No valid tokens to send notifications." };
  }

  public async sendGroupNotification(data: NotificationCreateInput, userId:string) {
  
    const devices = await this.deviceDb.findMany({ where: { userId: { in: data.userIds } } });
    const listRegTokens = devices.map((device) => device.regToken ?? '').filter(token => token);

    // Lưu các thông báo trong cơ sở dữ liệu
    await this.notificationDb.create({
      data: { title: data.title, content: data.content, userId: userId , creUsrId: data.userIds }
    });
    
    // Chỉ gửi thông báo nếu có ít nhất một token hợp lệ
    if (listRegTokens.length > 0) {
      await Promise.all(devices.map(device => {
        const message = {
          notification: {
            title: data.title,
            body: data.content,
          },
          data: {
            userId: device.userId ?? '',  // Đính kèm userId để xác định người dùng trên thiết bị
          },
          token: device.regToken ?? '',
        };
        return admin.messaging().send(message);  // Gửi thông báo qua Firebase Messaging cho mỗi token
      })) 
  
      return { success: true, message: "Notifications sent successfully." };
    }

    return { success: true, message: "No valid tokens to send notifications." };
  }

  public async getAllNotification(userId:string) {
    return this.notificationDb.findMany({
      where: {
        userId:userId
      }, 
      select: NOTIFICATION_SELECTED_FIELDS
    });
  }
  public async getNotificationById(id:string) {
    return this.notificationDb.findFirst({
      where: {
        id:id
      }, 
      select: NOTIFICATION_SELECTED_FIELDS
    });
  }

  public async updateNotification(data: NotificationCreateUpdate) {
    return this.notificationDb.update({
      where: {
        id:data.id
      }, 
      data:data,
      select: NOTIFICATION_SELECTED_FIELDS
    });
  }

  public async deleteNotification(id:string) {
    return this.notificationDb.update({
      where: {
        id:id
      }, 
      data: { delFlg:true },
      select: NOTIFICATION_SELECTED_FIELDS
    });
  }

}
