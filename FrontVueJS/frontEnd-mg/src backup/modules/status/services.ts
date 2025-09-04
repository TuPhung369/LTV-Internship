import Service from '@/core/service'
export class StatusService extends Service {
  public async getStatus  () {
    return this.get(`/api/status`)
  }
  public async createStatus  (data: any) {
    return this.post('/api/status', {
        title: data.title,
        description:data.description,
    })
  }
  public async updateStatus   (id:string,data: any) {
    return this.patch(`/api/status/${id}`, {
        title: data.title,
        description:data.description,
    })
  }
  public async deleteStatus   (id:string) {
    return this.delete(`/api/status/${id}`)
  }
}
