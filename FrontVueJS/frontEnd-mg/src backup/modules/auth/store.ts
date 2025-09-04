import { defineStore } from 'pinia'
import { AuthService } from './service'
import type { AuthState } from './types'

import { AUTH_CURRENT_USER, AUTH_TOKEN } from '@/core/constants'
import env from '@/core/env'
import type { AuthorProfile, User, UserInfoForm } from '@/global'
import { app } from '@/utils/firebase'
import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth'
import { getMessaging, getToken } from 'firebase/messaging'
import { v4 as uuidv4 } from 'uuid'

const messaging = getMessaging(app)
const adminSvc = new AuthService()
const clientSvc = new AuthService({ endpoint: env.string('VITE_CLIENT_SERVICE_ENDPOINT') })
const tokenStr = localStorage.getItem(AUTH_TOKEN)
const userStr = localStorage.getItem(AUTH_CURRENT_USER)
const currentUser = userStr ? JSON.parse(userStr) : null

export const useAuthStore = defineStore({
  id: 'appAuth',
  state: (): AuthState => ({
    currentUser,
    accessToken: tokenStr ?? '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentUser && !!state.accessToken,
  },
  actions: {
    actUpdateCurrentUser(user: User | null) {
      this.currentUser = user
      localStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user))
    },
    async actGetMe() {
      if (!this.accessToken) return Promise.resolve(null)
      return new Promise((resolve, reject) => {
        clientSvc
          .getMe()
          .then((resp) => {
            this.actUpdateUserDevice(resp)
            this.actUpdateCurrentUser(resp)
            resolve(resp)
          })
          .catch((error: Error) => {
            this.currentUser = null
            this.accessToken = ''
            reject(error)
          })
      })
    },
    async actUpdateUserDevice(resp: any) {
      const deviceId = resp.deviceId
      if (!deviceId) {
        const regToken = await getToken(messaging, {
          vapidKey: env.string('VITE_PUBLIC_FIREBASE_CLOUD_MESSAGE_ID'),
        })
          .then((token) => token)
          .catch((err) => {
            console.log(`Error getting FCM registration token: ${err}`)
            return ''
          })

        const input = {
          dvcId: uuidv4(),
          regToken,
        }
        await Promise.all([
          this.actCreateNewDevice(input),
          this.actUpdateUserProfile({ deviceId: input.dvcId }),
        ])
        return input.dvcId
      }
      resp.deviceId = deviceId
    },
    async actGetAuthorProfileById(id: string): Promise<AuthorProfile> {
      return clientSvc.getAuthorProfileById(id)
    },
    actCreateNewDevice(params: { [key: string]: any }) {
      return adminSvc.createNewDevice(params)
    },
    async actUpdateUserBankInformation(
      params: Required<Pick<UserInfoForm, 'beneficiary' | 'creditCardNumber' | 'bankName'>>,
    ) {
      return clientSvc.updateUserBankInformation(params)
    },
    actUpdateUserProfile(params: { [key: string]: any }, options?: any) {
      return clientSvc.updateUserProfile(params, options)
    },
    actModifyUserProfileData(firebaseUser: any) {
      const user = {
        ...firebaseUser,
        id: firebaseUser.uid,
        usrNm: firebaseUser.displayName || 'MyGarment User',
        usrEml: firebaseUser.email || 'no-email@ltv.dev',
        imgUrl: firebaseUser.photoURL,
      }
      return { user }
    },
    async actGoogleLogin() {
      return adminSvc.googleLogin().then(async (resp) => {
        const token = await resp.user.getIdToken()
        const { user } = this.actModifyUserProfileData(resp.user)
        localStorage.setItem(AUTH_TOKEN, token)
        this.accessToken = token
        await adminSvc.checkAndRegUsr(user)
        return resp
      })
    },
    actLogIn(params: { email: string; password: string }) {
      return adminSvc.login(params).then(async (resp) => {
        const token = await resp.user.getIdToken()
        const { user } = this.actModifyUserProfileData(resp.user)

        if (!user.emailVerified) {
          throw new FirebaseError(AuthErrorCodes.UNVERIFIED_EMAIL, 'Email chưa được xác minh.')
        }

        localStorage.setItem(AUTH_TOKEN, token)
        this.accessToken = token
        await adminSvc.checkAndRegUsr(user)
        return resp
      })
    },
    actSignUp(params: { email: string; password: string }) {
      return adminSvc.register(params)
    },
    actResetPassword(params: { email: string }) {
      return clientSvc.resetPassword(params)
    },
    actLogOut() {
      return adminSvc.logout().then(() => {
        this.actRemoveAuthCache()
      })
    },
    actSendFeedback(params: { email: string; content: string }) {
      return adminSvc.sendFeedback(params)
    },
    actSubmitReferralCode(params: { phnNmbr: string; refCode: string }) {
      return adminSvc.submitReferralCode(params)
    },
    actRemoveAuthCache() {
      this.actUpdateCurrentUser(null)
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.removeItem(AUTH_CURRENT_USER)
    },
  },
})
