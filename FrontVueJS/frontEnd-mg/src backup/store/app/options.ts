// src/stores/appOptions.js
import { AUTH_CURRENT_USER, IS_LOGIN } from '@/core/constants'
import { defineStore } from 'pinia'

export const useAppOptionStore = defineStore({
  id: 'appOptions',
  state: () => ({
    isAuth: false,
    user: {
      idUser: null,
      email: null,
      fullName: null,
      phoneNumber: null,
      position: null,
      department: null,
      skills: [],
      qualifications: [],
      status: null,
      creDt: null,
      updDt: null,
    },
  }),
  getters: {
    getUser(state) {
      return state.user
    },
  },
  actions: {
    setUser() {
      const userData: any = localStorage.getItem(AUTH_CURRENT_USER)
      //console.log('>>>>>>>>>>>>', userData)
      if (userData) {
        this.isAuth = true
        //console.log('>>>>>>', this.isAuth)
        localStorage.setItem(IS_LOGIN, JSON.stringify(this.isAuth))
        this.user = JSON.parse(userData)
      }
    },
    actGetUserName() {
      return this.user.email
    },
    actGetIsAuth() {
      console
      return this.isAuth
    },
  },
})
