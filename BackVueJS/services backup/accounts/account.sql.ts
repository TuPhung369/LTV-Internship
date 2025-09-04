export const USER_SELECTED_FIELDS = {
  idUser: true,
  email: true,
  fullName: true,
  phoneNumber: true,
  isActive:true,
  role:true,
  delFlg:true,
  position: {
    select: {
      id: true,
      title: true,
    },
  },
  department: {
    select: {
      id: true,
      title: true,
    },
  },
  skills: {
    select: {
      id: true,
      title: true,
    },
  },
  qualifications: {
    select: {
      id: true,
      title: true,
      field: true,
      institute: true,
      dateObtained: true,
      delFlg: false,
    },
    where: {
      delFlg: false,
    },
  },
  status: {
    select: {
      id: true,
      title: true,
    },
  },
  creDt: true,
  updDt: true,
};

export interface UserLoginInput {
  user_id: string;
  email: string;
  fullName: string;
}

export interface UserSearchInput {
  email?:string;
  fullName?:string;
  phoneNumber?:string;
  positionId?:string;
  departmentId?:string;
  skillIds?:string[];
  statusId?:string;
  qualificationTitle?:string;
  role?:string;
  isActive?:boolean;
  delFlg?: boolean
}
