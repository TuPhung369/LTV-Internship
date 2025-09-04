<template>
  <div class="flex items-center justify-center mt-0">
    <el-container class="w-full h-full max-w-7xl">
      <!-- Main page 80% width -->
      <el-main class="flex flex-col w-4/5 bg-white">
        <!-- top content -->
        <el-header class="flex bg-white h-10">
          <div class="topProfile flex items-center">
            <el-link class="w-5 h-5 ml-3 font-bold text-green-700 hover:text-orange-600">
              <el-icon>
                <ArrowLeft />
              </el-icon>
            </el-link>
            <div>
              <p class="label text-xs text-gray-400 pl-5 pt-1">Tài Khoản</p>
              <p class="title font-bold pl-5 text-base">{{ userData.fullName }} - Internship</p>
            </div>
          </div>
          <el-button
            class="editProfile h-6 mt-3 mr-3 ml-auto flex justify-center items-center"
            @click="dialogFormVisible = true"
          >
            <el-icon size="17px" class="mr-2">
              <Edit />
            </el-icon>
            Chỉnh sửa tài khoản
          </el-button>
        </el-header>

        <!-- Header Information of Account-->
        <el-divider class="my-2"></el-divider>
        <div class="informationAccount mb-20 mt-5">
          <div class="flex items-center justify-center">
            <el-avatar
              :src="'../../../../public/image/tupt.jpg'"
              :size="200"
              :fit="'cover'"
              shape="circle"
              style="background-color: white; overflow: hidden"
            ></el-avatar>
            <div class="ml-4">
              <div class="accountName flex items-center text-2xl my-1">
                <div class="ml-2 truncate">{{ userData.fullName }}</div>
              </div>
              <div class="accountTitle flex items-center text-gray-400 my-1">
                <div class="ml-2 truncate">Internship</div>
              </div>
              <div class="accountEmail flex items-center text-sm my-1">
                <el-link
                  :href="'mailto:' + userData.email"
                  class="w-6 text-gray-700 hover:text-green-900"
                >
                  <el-icon>
                    <Message />
                  </el-icon>
                </el-link>
                <div class="ml-2 truncate">
                  <span class="font-semibold text-xs">Email: </span>{{ userData.email }}
                </div>
              </div>
              <div class="accountPhone flex items-center text-sm my-1">
                <el-link class="w-6 text-gray-700 hover:text-green-900">
                  <el-icon>
                    <Phone />
                  </el-icon>
                </el-link>
                <div class="ml-2 truncate">
                  <span class="font-semibold text-xs">Phone: </span>{{ userData.phoneNumber }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Detail information -->
        <!-- Thông Tin Liên Hệ -->
        <div class="contactAccount flex-row items-left ml-5 mr-10">
          <div class="text-base font-bold text-gray-400">Thông Tin Liên Hệ</div>
          <div class="addressAccount flex my-1">
            <span class="informationAddress w-1/5 text-sm my-1">Địa Chỉ:</span>
            <span class="dataAddress text-sm my-1">Helsinki, Finland</span>
          </div>
        </div>
        <!-- Nhóm (0) -->
        <el-divider class="my-3"></el-divider>
        <div class="groupAccount flex-row items-left ml-5 mb-7 mr-5">
          <div class="text-base font-bold text-gray-400">Nhóm <em>(0)</em></div>
        </div>
        <!-- Nhân Viên Trực Tiếp (0) -->
        <el-divider class="my-3"></el-divider>
        <div class="staffAccount flex-row items-left ml-5 mb-7 mr-5">
          <div class="text-base font-bold text-gray-400">Nhân Viên Trực Tiếp <em>(0)</em></div>
        </div>
        <!-- Học Vấn -->
        <el-divider class="my-3"></el-divider>
        <div class="educationAccount ml-5 mr-5">
          <div class="flex justify-between items-center text-base font-bold text-gray-400">
            <span>Trình Độ Học Vấn</span>
            <!-- <el-icon size="30px">
              <CirclePlus />
            </el-icon> -->
            <!-- <el-button size="large" :icon="Edit" circle /> -->
          </div>
          <div class="informationEducation flex-row justify-between my-2">
            <el-row :gutter="10">
              <el-col
                v-for="qualification in qualificationsData"
                :key="qualification.id"
                :span="12"
              >
                <div
                  class="border border-gray-300 rounded-full text-gray-100 italic text-sm bg-gradient-to-r from-gray-400 via-gray-400 to-gray-500 h-10 flex justify-center items-center transition duration-300 ease-in-out hover:bg-gradient-to-l hover:from-gray-600 hover:via-gray-200 hover:to-gray-500 hover:text-black hover:font-normal hover:shadow-lg hover:transform hover:translate-y-px"
                >
                  {{ qualification.title }} - {{ qualification.field }} -
                  {{ qualification.institute }} - {{ qualification.dateObtained }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Skills -->
        <el-divider class="my-3"></el-divider>
        <div class="skillsAccount ml-5 mr-5">
          <div class="flex justify-between items-center text-base font-bold text-gray-400">
            <span>Kĩ Năng</span>
            <!-- <el-icon size="30px">
              <CirclePlus />
            </el-icon> -->
          </div>
          <div class="informationSkill flex items-center justify-start my-1">
            <el-row :gutter="10">
              <el-col v-for="skill in skillsAccount" :key="skill.title" :span="3">
                <el-card
                  :style="{
                    border: '1px solid #ccc',
                    'border-radius': '9999px',
                    'background-color': '#f5f5f5',
                    height: '40px',
                    display: 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                  }"
                >
                  <!-- <div
                    class="bg-blue hover:bg-blue-200 text-gray-500 font-bold border-b-2 border-blue-700 hover:border-green-500 rounded"
                  > -->
                  <div
                    class="flex font-bold text-gray-100 justify-center transition duration-400 ease-in-out transform px-4 py-2 w-48 border-b-4 border-gray-500 hover:border-b-2 bg-gradient-to-t from-gray-400 via-gray-600 to-gray-200 rounded-2xl hover:translate-y-px"
                    style="
                      -webkit-box-shadow: 0px 10px 13px -7px #000000,
                        5px 5px 15px 8px rgba(0, 0, 0, 0);
                      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
                    "
                  >
                    {{ skill.title }}
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- Giải Thưởng & Thành Tích-->
        <el-divider class="my-3"></el-divider>
        <div class="rewardsAccount ml-5 mr-5">
          <div class="flex justify-between items-center text-base font-bold text-gray-400">
            <span>Giải Thưởng & Thành Tích</span>
            <!-- <el-icon size="30px">
              <CirclePlus />
            </el-icon> -->
            <!-- <el-button icon="el-icon-plus" size="mini" @click="addAchievement"></el-button> -->
          </div>
          <div class="informationRewards flex items-center justify-center my-1">
            <span
              class="text-sm w-full h-10 border bg-gray-200 my-1 flex items-center justify-center"
              >Không có thông tin</span
            >
          </div>
        </div>
        <div class="mt-20"></div>
        <div class="mt-20"></div>
        <div class="mt-20"></div>
      </el-main>

      <!-- navigate at the right side 20% -->
      <el-aside class="listNavigate w-1/5 py-3 bg-gray-200">
        <el-menu :default-active="activeMenuItem" class="bg-gray-200" @select="handleMenuSelect">
          <h2 class="text-sm text-gray-700 mt-5">THÔNG TIN TÀI KHOẢN</h2>
          <el-menu-item index="1" @click="updateProfile">
            <el-icon><ArrowLeft /></el-icon>
            <span>Tài khoản</span>
          </el-menu-item>
          <el-menu-item index="2" @click="dialogFormVisible = true">
            <el-icon><Edit /></el-icon>
            <span>Chỉnh sửa</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Switch /></el-icon>
            <span>Ngôn ngữ</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Lock /></el-icon>
            <span>Đổi mật khẩu</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Brush /></el-icon>
            <span>Đổi màu hiển thị</span>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon><Calendar /></el-icon>
            <span>Lịch sử</span>
          </el-menu-item>
          <h2 class="text-sm text-gray-700 mt-2">ỨNG DỤNG - BẢO MẬT</h2>
          <el-menu-item>
            <span></span>
          </el-menu-item>
          <h2 class="text-sm text-gray-700">TÙY CHỈNH NÂNG CAO</h2>
          <el-menu-item index="7">
            <el-icon><List /></el-icon>
            <span>Lịch sử đăng nhập</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon><Monitor /></el-icon>
            <span>Quản lý thiết bị</span>
          </el-menu-item>
          <el-menu-item index="9">
            <el-icon><Message /></el-icon>
            <span>Tùy chỉnh email thông báo</span>
          </el-menu-item>
          <el-menu-item index="10">
            <el-icon><EditPen /></el-icon>
            <span>Ủy quyền tạm thời</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>

    <!-- Model edit profile -->
    <el-dialog v-model="dialogFormVisible" title="Edit User Profile" width="800" draggable>
      <el-form :model="profile">
        <el-form-item label="Full Name" :label-width="formLabelWidth">
          <el-input
            v-model="profile.fullName"
            placeholder="Please input your Full Name"
            clearable
          />
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="profile.email" placeholder="Please input your Email" clearable />
        </el-form-item>
        <el-form-item label="Phone Number" :label-width="formLabelWidth">
          <el-input
            v-model="profile.phoneNumber"
            placeholder="Please input your Phone Number"
            clearable
          />
        </el-form-item>
      </el-form>

      <el-form-item label="Your Skills" :label-width="formLabelWidth">
        <el-select
          v-model="skillsUser"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
          style="width: 100%"
        >
          <el-option
            v-for="item in skillsOptions"
            :key="item.value"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Your Education" :label-width="formLabelWidth">
        <div class="flex">
          <el-scrollbar
            style="height: 120px"
            class="informationEducation flex items-center justify-start"
          >
            <el-row :gutter="1" style="direction: rtl; overflow-y: auto">
              <el-col
                v-for="qualification in qualificationsData"
                :key="qualification.id"
                style="direction: ltr"
              >
                <el-card
                  style="
                    margin: 0px;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                    transition: box-shadow 0.3s ease;
                  "
                >
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px">
                    <!-- <span
                    style="flex: 1; font-size: 18px; font-weight: bold; color: #333; margin: 0 2px"
                    >{{ qualification.id }}</span
                  > -->
                    <span
                      style="
                        flex: 1;
                        font-size: 18px;
                        font-weight: bold;
                        color: #333;
                        margin: 0 2px;
                      "
                      >{{ qualification.title }}</span
                    >
                    <span
                      style="flex: 1; font-size: 16px; font-weight: 500; color: #333; margin: 0 2px"
                      >{{ qualification.field }}</span
                    >
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <span
                      style="flex: 1; font-size: 16px; font-weight: 500; color: #333; margin: 0 2px"
                      >{{ qualification.institute }}</span
                    >
                    <span
                      style="
                        flex: 1;
                        font-size: 18px;
                        font-weight: bold;
                        color: #777;
                        margin: 0 2px;
                      "
                      >{{ qualification.dateObtained }}
                      <span style="margin-left: 10px"
                        ><el-button @click="editQualification(qualification.id)"
                          ><el-icon :size="30"> <Edit /> </el-icon
                        ></el-button>
                        <el-button @click="deleteQualification(qualification.id)"
                          ><el-icon :size="30"> <Delete /> </el-icon></el-button></span
                    ></span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-scrollbar>
          <div style="margin-top: 1px; margin-left: 20px; display: flex; align-items: center">
            <el-button style="width: 40px" @click="addQualification">
              <el-icon :size="40"> <Plus /> </el-icon>
            </el-button>
          </div>
        </div>
      </el-form-item>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="updateProfile">Confirm</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Dialog for Updating Qualification -->
    <el-dialog v-model="isDialogVisible" title="Update Qualification">
      <el-form :model="currentQualification">
        <el-form-item label="Degree" :label-width="formLabelWidth">
          <el-input
            v-model="currentQualification.title"
            placeholder="Please input your Degree"
            clearable
          />
        </el-form-item>
        <el-form-item label="field" :label-width="formLabelWidth">
          <el-input
            v-model="currentQualification.field"
            placeholder="Please input your field"
            clearable
          />
        </el-form-item>
        <el-form-item label="Institute" :label-width="formLabelWidth">
          <el-input
            v-model="currentQualification.institute"
            placeholder="Please input your Institute"
            clearable
          />
        </el-form-item>
        <el-form-item label="Graduated Year" :label-width="formLabelWidth">
          <el-input
            v-model="currentQualification.dateObtained"
            placeholder="Please input your Graduated Year"
            clearable
          />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = true">Cancel</el-button>
        <el-button type="primary" @click="saveQualification">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>
]
<script lang="js">
  import { useAppOptionStore } from '../../../store/app/options'
  import { userProfileStore } from '../store'
  import { useRouter } from 'vue-router'
  import { AUTH_CURRENT_USER } from '@/core/constants'
  import { computed, onMounted, ref, reactive,toRefs } from 'vue'
  import { ArrowLeft, Edit,Delete,Plus, Message, Phone, Switch, Lock, Brush, Calendar, List, Monitor, EditPen } from '@element-plus/icons-vue'
  import { ElScrollbar,ElRow,ElCol,ElCard, ElContainer, ElHeader, ElMain, ElAside, ElDivider, ElAvatar, ElButton, ElLink, ElMenu, ElMenuItem, ElIcon, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'

  export default {
    name: 'UserProfile',
    components: {
      ElScrollbar,ElRow,ElCol,ElCard, ElContainer, ElHeader, ElMain, ElAside, ElDivider, ElAvatar, ElButton, ElLink, ElMenu, ElMenuItem, ElIcon, ElDialog, ElForm, ElFormItem, ElInput, ArrowLeft, Edit,Delete,Plus, Message, Phone, Switch, Lock, Brush, Calendar, List, Monitor, EditPen,
    },
    setup() {
      const appOptionStore = useAppOptionStore()
      const router = useRouter()
      const userProfile = userProfileStore()
      const dialogFormVisible = ref(false)
      const isDialogVisible = ref(false)
      const formLabelWidth = '140px'
      const userData = ref({})
     // const qualificationsData = ref({})
      //const qualificationsUser = ref({})

      const skillsData = ref({})
      const skillsUser = ref({})

      const profile = reactive({
        fullName: '',
        email: '',
        phoneNumber: '',
        skillIds: [''],
      })
      const state = reactive({
        currentQualification: {},
        qualificationsData: {},
      });
      const activeMenuItem = ref('1') // Initialize with the default active menu item
      const handleMenuSelect = (index) => {
        activeMenuItem.value = index // Update the active menu item
      }

      const editQualification = (qualificationId) => {
        const qualification = state.qualificationsData.find(q => q.id === qualificationId);
        if (qualification) {
          state.currentQualification = {
            id: qualification.id,
            title: qualification.title,
            field: qualification.field,
            institute: qualification.institute,
            dateObtained: new Date(qualification.dateObtained).getFullYear(),
          }
        } else {
          console.log(`No qualification found with ID: ${qualificationId}`);
        }
          dialogFormVisible.value = false // Close the dialog Update Profile
          isDialogVisible.value = true // Open the dialog Update Qualification
      }

      const saveQualification = async () => {
        try {
          console.log('before qualification:', state.currentQualification)
          await userProfile.actUpdateQualifications(state.currentQualification)
          isDialogVisible.value = false // Close the dialog Update Qualification
          dialogFormVisible.value = true // Open the dialog
        } catch (error) {
          console.error('Failed to save qualification:', error)
        }
      }
      const deleteQualification = async (qualificationId) => {
        try {
          await userProfile.actDeleteQualification(qualificationId);
          //update data after deleting qualification.
          state.qualificationsData = state.qualificationsData.filter(qualification => qualification.id !== qualificationId);

        } catch (error) {
          console.error(`Error deleting qualification with ID ${qualificationId}: ${error}`);
        }
      };
      const updateProfile = async () => {
        try {
          profile.skillIds = skillsUser.value.map(skill => skill.value);
          //profile.qualificationIds = state.qualificationsData.map(qualification => qualification.id); //*BUG*
          // console.log('11111111111111profile:', profile)
          // console.log('11111111111111skillsUser:', skillsUser.value)
          // console.log('222222222222qualificationsData:', state.qualificationsData)
          //profile.skillIds = skillsUser.value.map(skill => skill.id);
          const editUserData = await userProfile.actUpdateProfile(profile)
          localStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(editUserData))
          appOptionStore.setUser(editUserData)
          setTimeout(() => {
            router.go(0)
          }, 100)
          dialogFormVisible.value = false // Close the dialog
        } catch (error) {
          console.error('Failed to update profile:', error)
        }
      }

      //const emailAccount = computed(() => userData.value?.email || '')
      //const phoneAccount = computed(() => userData.value?.phoneNumber || '')
      //const qualificationsAccount = computed(() => userData.value?.qualifications || [])
      // const qualificationsOptions = computed(() => {
      //     //console.log('1111111111111qualificationsData:', state.qualificationsData)
      //   if (!state.qualificationsData || !Array.isArray(state.qualificationsData)) {
      //     return [];
      //   }
      //   return state.qualificationsData.map(qualification => ({
      //     value: qualification.id,
      //     label: qualification.title,
      //     field: qualification.field,
      //     institute: qualification.institute,
      //     year: new Date(qualification.dateObtained).getFullYear(),
      //   }));
      // });

      const skillsAccount = computed(() => userData.value?.skills || [])
      const skillsOptions = computed(() => {
        return skillsData.value?.map(skill => ({
          value: skill.id,
          label: skill.title,
        })) || [];
      });

      onMounted(async () => {``
        try {
          userData.value = await userProfile.actGetMe()
          skillsData.value = await userProfile.actGetSkills()//get all skills
          state.qualificationsData = await userProfile.actGetQualifications()//get all qualifications

          //console.log('skillsData:', skillsData.value)
          //console.log('qualificationsData:', state.qualificationsData)
          profile.fullName = userData.value?.fullName || ''
          profile.email = userData.value?.email || ''
          profile.phoneNumber = userData.value?.phoneNumber || ''
          //profile.skillIds = userData.value.skills.map(skill => skill.id);
          skillsUser.value = userData.value?.skills.map(skill => ({
            value: skill.id,
            label: skill.title
          }));
          // qualificationsUser.value = userData.value?.qualifications.map(qualification => ({
          //    value: qualification.id,
          //    label: qualification.title,
          // }));
        } catch (error) {
          console.error('Failed to fetch user data:', error)
        }
      })

      return {
        ...toRefs(state),
        dialogFormVisible,
        isDialogVisible,
        formLabelWidth,
        profile,
        skillsData,
        skillsAccount,
        skillsOptions,
        skillsUser,
        //qualificationsData,
        //currentQualification,
        //qualificationsOptions,
        userData,
        updateProfile,
        activeMenuItem,
        handleMenuSelect,
        deleteQualification,
        editQualification,
        saveQualification,
      }
    }
  }
</script>

<style scoped></style>
