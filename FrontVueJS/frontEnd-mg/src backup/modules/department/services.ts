import Service from '@/core/service'

export class DepartmentServices extends Service {
  public async createDepartment  (data: any) {
    return this.post('/api/department', {
        title: data.title,
        description: data.description,
    })
  }
public async getDepartment  () {
return this.get(`/api/department`)
}
public async updateDepartment  (id:string, data: any) {
return this.patch(`/api/department/${id}`, {
    title: data.title,
    description: data.description,
})
}
public async deleteDepartment  (id:string) {
return this.delete(`/api/department/${id}`)
}
}
