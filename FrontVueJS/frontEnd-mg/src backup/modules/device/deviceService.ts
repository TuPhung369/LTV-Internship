import Service from '@/core/service';
import { v4 as uuidv4 } from 'uuid';

export class DeviceService extends Service {
  public async createDevice(regToken: string) {
    // Tạo một UUID mới cho thiết bị
    const dvcId = uuidv4();
    // Gửi yêu cầu tạo thiết bị mới đến API với regToken và dvcId
    return this.post('/api/devices', {
      regToken: regToken,
      dvcId: dvcId
    });
  }
}
