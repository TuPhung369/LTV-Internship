import Service from '@/core/service'

export class AutService extends Service {
  public async loginWithGoogle(accessToken: string) {
    return this.post('/api/accounts/login', {
      accessToken: accessToken,
    })
  }
}
