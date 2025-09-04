interface User {
  id: string
  balance?: number
  sellBalance?: number
  username?: string
  email?: string
  name?: string | null
  avatarUrl?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  usrNm?: string
  usrEml?: string
  usrPwd?: string
  fullNm?: string
  imgUrl?: string
  phnNmbr?: string
  sex?: number
  deviceId?: string | null
  dob?: string
  addr?: string
  job?: string
  isAdm?: boolean
  parentUsrNm?: string
  resetPassCode?: string
  resetPasswordExpires?: number
  phone?: string
  title?: string
  productIds?: string[]
  bank?: {
    bankName: string
    creditCardNumber: string
    beneficiary: string
  }
}

interface UserInfoForm
  extends Required<Pick<User, 'usrNm' | 'addr' | 'job' | 'dob' | 'phnNmbr' | 'sex'>> {
  bankName?: string
  creditCardNumber?: string
  beneficiary?: string
}

interface DocumentStatistic {
  documents?: number
  views?: number
  downloads?: number
  frees?: number
  charges?: number
  approval?: number
  request?: number
  reject?: number
  purchased?: number
}

interface AuthorProfile {
  activities: DocumentStatistic
  email: string
  fullNm?: null | string
  imgUrl?: string
  usrNm: string
}

interface AttachFile {
  id?: string
  name: string
  percentage: number
  raw: File
  referenceId?: string
  role: 'AVATAR' | 'MAIN_FILE' | 'ATTACH_FILE'
  size: number
  status: string
  typeCode?: string
  uid: number
  url: string
}

interface Pagination {
  cursor?: number | string
  hasNextPage: boolean
  hasPreviousPage: boolean
  total: number
}

export type OrderRecord = {
  orderId?: string
  id?: string
  orderStatus?: OrderStatus
  orderTypeCode: OrderTypeCode
  amount: number
  originalPrice?: number | null
  discount?: number | null
  documentId?: string | null
  requestId?: string | null
  transId?: string | null
  message?: string | null
  createdAt?: Date | string
  updatedBy?: string | null
  updatedAt?: Date | string | null
}

interface UserInput {
  usrNm?: string
  usrEml?: string
  phnNmbr?: string
  dob?: Date
  addr?: string
  job?: string
  sex?: number
  deviceId?: string
}

interface TotalDocumentWithCategory {
  totalDocument: number
  totalFree: number
  totalCharge: number
}

export interface CategoryRecord {
  categoryId?: string
  id: string
  title: string
  background?: string | null
  desc?: string | null
  lock?: boolean
  order?: number | null
  parentId?: string | null
  delFlg?: boolean
  totalDocument?: number
  children: CategoryRecord[]
  infoDocs: TotalDocumentWithCategory
}

export interface DocumentRecord extends DocumentStatistic {
  documentId?: string
  id?: string
  categoryId: string
  docName: string
  description?: string | null
  keyword?: string | null
  price: number
  numOfPages?: number
  freeNumOfPages?: number
  createdBy?: string
  createdAt?: string
  slug?: string
  docTypeCode: 'TAI_LIEU' | 'MAU_RAP' | string
  docStatusTypeCode?: 'REQUEST' | 'APPROVAL' | 'REJECT' | string
  user?: {
    usrNm: string | null
    fullNm?: string | null
    id: string
    imgUrl: string
    deviceId: string | null
  }
  files?: Array<DownloadFile>
  isPurchase?: boolean
}

export interface DownloadFile {
  id: string
  referenceId: string
  fileName: string
  fileUrl: string
  url: string
  fileType: string
  fileRole: string
  createdBy?: string | null
  createdAt?: string | null
  updatedBy?: string | null
  updatedAt?: string | null
}

export interface DocumentStatistic {
  views?: number
  downloads?: number
  numOfPages?: number
}

export interface CommonCode {
  commonId?: string
  id: string
  commonCode?: string
  commonValue: string | number
  parentId?: string | null
  useFlag: 'Y' | 'N' | string
  children?: Array<CommonCode>
}

export interface Notification {
  id?: string
  title?: string
  content?: string
  readFlg?: boolean
  dvcIds?: string[]
  dvcId?: string
  allUser?: boolean
  userIds?: string[]
}

export interface StaticPageRecord {
  id?: string
  parentId?: string | null
  children?: Omit<StaticPageRecord, 'children'>[]
  key: string
  title?: string
  content?: string
}
