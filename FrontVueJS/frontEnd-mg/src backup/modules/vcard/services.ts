import Service from '@/core/service'

export class VcardSevices extends Service {

public async getVcard  () {
  return this.get(`/api/vcards`)
}

public async getVcardById  (id:string) {
  return this.get(`/api/vcards/${id}`)
}

}
