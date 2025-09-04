export const CATEGORY_SELECTED_FIELDS = {
  id: true,
  title: true,
  desc: true,
  order: true,
  delFlg: true,
  creDt: true,
  updDt: true,
};

export type Category = {
  id: string;
  title: string;
  desc: string | null;
  order: number | null;
  delFlg: boolean;
};
