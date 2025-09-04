import Service from '@/core/service'
export class qualificationServices extends Service {
  public async getQualification  () {
    return this.get(`/api/qualification`)
  }
  public async createQualification  (data: any) {
    return this.post('/api/qualification', {
        title: data.title,
        field: data.field,
        institute: data.institute,
        dateObtained:data.dateObtained,
    })
  }
  public async updateQualification   (id:string,data: any) {
    return this.patch(`/api/qualification/${id}`, {
        title: data.title,
        field: data.field,
        institute: data.institute,
        dateObtained:data.dateObtained,
    })
  }
  public async deleteQualification   (id:string) {
    return this.delete(`/api/qualification/${id}`)
  }
  public async getQualificationById  (id:any) {
    return this.get(`/api/qualification/admin/${id}`)
  }
}
