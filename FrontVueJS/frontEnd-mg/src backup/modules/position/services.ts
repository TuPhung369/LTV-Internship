import Service from '@/core/service'
export class PositionsService extends Service {
  public async createPosition  (data: any) {
        return this.post('/api/position', {
            title: data.title,
            description: data.description,  
        })
      }
  public async getPosition  () {
    return this.get(`/api/position`)
  }
  public async updatePosition  (id:string, data: any) {
    return this.patch(`/api/position/${id}`, {
        title: data.title,
        description: data.description,  
    })
  }
  public async deletePosition  (id:string) {
    return this.delete(`/api/position/${id}`)
  }

}
