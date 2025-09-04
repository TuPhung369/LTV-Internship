import Service from '@/core/service'

export class HistoriesService extends Service {
  public async getHistories  () {
    return this.get('/api/histories')
  }
  public async getCurrentHistory  () {
    return this.get('/api/histories/me')
  }
   public async updateHistory (id: string, data: any) {
    return this.patch(`/api/histories/${id}`, {
      startDate: data.startDate,
      endDate: data.endDate,
      positionId: data.positionId,
      departmentId: data.departmentId
    })
  }
  public async createHistory ( data: any) {
    return this.post(`/api/histories`, {
      startDate: data.startDate,
      endDate: data.endDate,
      positionId: data.positionId,
      departmentId: data.departmentId
    })
  }
  public async deleteHistory  (id:string) {
    return this.delete(`/api/histories/${id}`)
  }
}
