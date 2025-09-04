import Service from '@/core/service'
export class skillService extends Service {
  public async getSkill  () {
    return this.get(`/api/skill`)
  }
  public async createSkill  (data: any) {
    return this.post('/api/skill', {
        title: data.title,
        description:data.description,
    })
  }
  public async updateSkill  (id:string,data: any) {
    return this.patch(`/api/skill/${id}`, {
        title: data.title,
        description:data.description,
    })
  }
  public async deleteSkill  (id:string) {
    return this.delete(`/api/skill/${id}`)
  }
}
