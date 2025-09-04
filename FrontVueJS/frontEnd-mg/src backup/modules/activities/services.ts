import Service from '@/core/service'

export class ActivitiesServices extends Service {
  public async getNotification  () {
    return this.get('/api/notifications')
  }
  public async sendNotificationForAll  (data: any) {
    return this.post('/api/notifications',{
        title:data.title,
        content:data.content,
    })
  }
public async sendNotificationForUser  (data: any) {
    return this.post('/api/notifications/group', {
        title:data.title,
        content:data.content,
        userIds : data.userIds,

    })
  }
public async updateNotifiCation  (id:string,data: any) {
    console.log(data)
    console.log(id)
    return this.patch(`/api/notifications/${id}`,{
        title:data.title,
        content:data.content,

    })
  }
  public async deleteNotification  (id:string) {
    console.log(id)
    return this.delete(`/api/notifications/${id}`)
  }

}
