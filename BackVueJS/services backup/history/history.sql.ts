export const HISTORIES_SELECTED_FIELDS = {
  id: true,
  startDate: true,
  endDate: true,
  delFlg: true,
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
};

export interface UserHistoryCreateInput {
  user_id: string;
  positionId: string;
  departmentId: string;
  startDate: string;
  endDate: string;
}
