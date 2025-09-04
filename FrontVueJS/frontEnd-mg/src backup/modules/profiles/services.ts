import Service from '@/core/service'
import type { submitUpdateProfile, submitUpdateSkills, submitUpdateQualifications } from './types'

export class ProfileService extends Service {
  public getMe(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/accounts/user/me`, {}, { headers: headers })
  }

  public updateProfile(token: string, params: submitUpdateProfile) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/accounts/user`, params, { headers: headers })
  }
  //Skills
    public getSkills(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/skill`, {}, { headers: headers })
  }
    public updateSkills(token: string, params: submitUpdateSkills) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/skill`, params, { headers: headers })
    }
      //Status
    public getStatus(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/status`, {}, { headers: headers })
    }
    //Positions
    public getPositions(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/position`, {}, { headers: headers })
    }
  //Departments
    public getDepartments(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/department`, {}, { headers: headers })
  }
    public updatePositions(token: string, params: submitUpdateSkills) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/position`, params, { headers: headers })
    }
  //Qualifications
    public getQualifications(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/qualification`, {}, { headers: headers })
    }

    public updateQualifications(token: string, params: submitUpdateQualifications) {
      const { id, ...restParams } = params;
      if (!id) {
        throw new Error('ID is required to update the qualification');
      }
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/qualification/${id}`, restParams, { headers: headers });
    }


    public deleteQualifications(token: string, id: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
      return this.delete(`/api/qualification/${id}`, {} ,{ headers: headers });
    }
    public createQualification(token: string, params: submitUpdateQualifications) {
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
        return this.post(`/api/qualification`, params ,{ headers: headers });
    }
  public getVcard(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/vcards`, {}, { headers: headers })
  }
  public getVcardById(token: string, id: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
      return this.get(`/api/vcards/${id}`, {} ,{ headers: headers });
    }
  //Admin
  public getAllUsers(token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/accounts/user`, {}, { headers: headers })
  }
  public getUserById(token: string, id: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
      return this.get(`/api/accounts/user/${id}`, {} ,{ headers: headers });
    }
  public getAllUsersPaginate(token: string, pageSize: number, currentPage: number) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.get(`/api/accounts/user?pageSize=${pageSize}&cursor=${currentPage}`, {}, { headers: headers })
}
  public updateProfileAdmin(token: string, params: submitUpdateProfile) {
    const id = params.id;
    if (!id) {
        throw new Error('ID is required to update the qualification');
      }
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/accounts/admin/user/${id}`, params, { headers: headers })
  }
//Admin Qualifications
    public getQualificationsAdmin(token: string) {

      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
      return this.get(`/api/qualification/admin`, {}, { headers: headers });
    }

  public updateQualificationsAdmin(token: string, params: submitUpdateQualifications) {
    const { id, ...restParams } = params;
    if (!id) {
      throw new Error('ID is required to update the qualification');
    }
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  }
  return this.patch(`/api/qualification/admin/${id}`, restParams, { headers: headers });
  }

  public createQualificationAdmin(token: string, params: submitUpdateQualifications) {
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };
        return this.post(`/api/qualification/admin`, params ,{ headers: headers });
    }

  public createUser(token: string, params: submitUpdateProfile) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.post(`/api/accounts/admin/user`, params, { headers: headers })
  }

  public deleteUser(token: string, id: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
      return this.delete(`/api/accounts/admin/user/${id}`, {} ,{ headers: headers });
  }

  public updateActivation(token: string, params: submitUpdateProfile) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.patch(`/api/accounts/admin/user/change-activation-status`, params, { headers: headers })
  }

}
