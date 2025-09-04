// store
import env from '@/core/env'
import { defineStore } from 'pinia'
import { ProfileService } from './services'
import { AUTH_TOKEN } from '@/core/constants'
import type { submitUpdateProfile, submitUpdateSkills,submitUpdateQualifications } from './types'
const service = new ProfileService({ endpoint: env.string('VITE_CLIENT_SERVICE_ENDPOINT') })

const access_token:string = localStorage.getItem(AUTH_TOKEN) ?? ''
export const userProfileStore = defineStore({
  id: 'appDocument',
  actions: {
    async actGetMe() {
      return await service.getMe(access_token)
    },
    async actUpdateProfile(params: submitUpdateProfile) {
      return await service.updateProfile(access_token, params)
    },
    //skills
    async actGetSkills() {
      return await service.getSkills(access_token)
    },
    async actUpdateSkills(params: submitUpdateSkills) {
      return await service.updateSkills(access_token, params)
    },
    //positions
    async actGetPositions() {
      return await service.getPositions(access_token)
    },
    //status
    async actGetStatus() {
      return await service.getStatus(access_token)
    },
    //departments
    async actGetDepartments() {
      return await service.getDepartments(access_token)
    },
    async actUpdatePositions(params: submitUpdateSkills) {
      return await service.updatePositions(access_token, params)
    },
    //Qualifications
    async actGetQualifications() {
      return await service.getQualifications(access_token)
    },
    async actUpdateQualifications(params: submitUpdateQualifications) {
      return await service.updateQualifications (access_token, params)
    },

    async actDeleteQualification(params: string) {
      return await service.deleteQualifications(access_token, params);
    },
    async actCreateQualification(params: submitUpdateQualifications) {
      return await service.createQualification(access_token, params);
    },
    async actGetVcard() {
      return await service.getVcard(access_token)
    },
    async actGetVcardById(params: string) {
      return await service.getVcardById(access_token,params)
    },
    //Admin
    async actGetAllUsers() {
      return await service.getAllUsers(access_token)
    },
    async actGetUserById(params: string) {
      return await service.getUserById(access_token,params)
    },
    async actGetAllUsersPaginate(pageSize: number, currentPage: number) {
      return await service.getAllUsersPaginate(access_token, pageSize, currentPage)
    },
    async actUpdateProfileAdmin(params: submitUpdateProfile) {
      return await service.updateProfileAdmin(access_token, params)
    },
    //Admin Qualifications
    async actGetQualificationsAdmin() {
      return await service.getQualificationsAdmin(access_token)
    },
    async actUpdateQualificationsAdmin(params: submitUpdateQualifications) {
      return await service.updateQualificationsAdmin (access_token, params)
    },
    async actCreateQualificationAdmin(params: submitUpdateQualifications) {
      return await service.createQualification(access_token, params);
    },
    async actCreateUser(params: submitUpdateProfile) {
      return await service.createUser(access_token, params)
    },
    async actDeleteUser(params: string) {
      return await service.deleteUser(access_token, params);
    },
    async actUpdateActivation(params: submitUpdateProfile) {
      return await service.updateActivation(access_token, params)
    },

  },
})
