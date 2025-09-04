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
              <p class="title font-bold pl-5 text-base">{{ nameAccount }} - Internship</p>
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
                <div class="ml-2 truncate">{{ nameAccount }}</div>
              </div>
              <div class="accountTitle flex items-center text-gray-400 my-1">
                <div class="ml-2 truncate">Internship</div>
              </div>
              <div class="accountEmail flex items-center text-sm my-1">
                <el-link
                  :href="'mailto:' + emailAccount"
                  class="w-6 text-gray-700 hover:text-green-900"
                >
                  <el-icon>
                    <Message />
                  </el-icon>
                </el-link>
                <div class="ml-2 truncate">
                  <span class="font-semibold text-xs">Email: </span>{{ emailAccount }}
                </div>
              </div>
              <div class="accountPhone flex items-center text-sm my-1">
                <el-link class="w-6 text-gray-700 hover:text-green-900">
                  <el-icon>
                    <Phone />
                  </el-icon>
                </el-link>
                <div class="ml-2 truncate">
                  <span class="font-semibold text-xs">Phone: </span>{{ phoneAccount }}
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
            <span>Học Vấn</span>
            <el-icon size="30px" @click="addEducation">
              <CirclePlus />
            </el-icon>
            <!-- <el-button size="large" :icon="Edit" circle /> -->
          </div>
          <div class="informationEducation flex items-center justify-center my-1">
            <span
              class="text-sm w-full h-10 border bg-gray-200 my-1 flex items-center justify-center"
              >Không có thông tin</span
            >
          </div>
        </div>
        <!-- Kinh Nghiệm Làm Việc -->
        <el-divider class="my-3"></el-divider>
        <div class="skillsAccount ml-5 mr-5">
          <div class="flex justify-between items-center text-base font-bold text-gray-400">
            <span>Kinh Nghiệm Làm Việc</span>
            <el-icon size="30px" @click="addWorkExperience">
              <CirclePlus />
            </el-icon>
          </div>
          <div class="informationSkill flex items-center justify-center my-1">
            <el-row :gutter="20">
              <el-col v-for="skill in skillsAccount" :key="skill.title" :span="8">
                <el-card>
                  <div>{{ skill.title }}</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- Giải Thưởng & Thành Tích-->
        <el-divider class="my-3"></el-divider>
        <div class="educationAccount ml-5 mr-5">
          <div class="flex justify-between items-center text-base font-bold text-gray-400">
            <span>Giải Thưởng & Thành Tích</span>
            <el-icon size="30px" @click="addAchievement">
              <CirclePlus />
            </el-icon>
            <!-- <el-button icon="el-icon-plus" size="mini" @click="addAchievement"></el-button> -->
          </div>
          <div class="informationEducation flex items-center justify-center my-1">
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
    <el-dialog
      v-model="dialogFormVisible"
      title="Edit User Profile"
      width="700"
      class="font-size: 30px;"
      draggable
    >
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
      <el-form-item label="Choose Your Skills">
        <el-checkbox-group v-model="profile.skillIds">
          <el-checkbox
            v-for="skill in skillsAll"
            :key="skill.id"
            :label="skill.id"
            :value="skill.id"
          >
            {{ skill.title }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="updateProfile">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
]
<script lang="js">
  import { useAppOptionStore } from '../../../store/app/options'
  import { userProfileStore } from '../store'
  import { useRouter } from 'vue-router'
  import { AUTH_CURRENT_USER } from '@/core/constants'
  import { computed, onMounted, ref, reactive } from 'vue'
  import { ArrowLeft, Edit, Message, Phone, Switch, Lock, Brush, Calendar, List, Monitor, EditPen, CirclePlus } from '@element-plus/icons-vue'
  import { ElRow,ElCol,ElCard, ElContainer, ElHeader, ElMain, ElAside, ElDivider, ElAvatar, ElButton, ElLink, ElMenu, ElMenuItem, ElIcon, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'

  export default {
    name: 'UserProfile',
    components: {
      ElRow,ElCol,ElCard, ElContainer, ElHeader, ElMain, ElAside, ElDivider, ElAvatar, ElButton, ElLink, ElMenu, ElMenuItem, ElIcon, ElDialog, ElForm, ElFormItem, ElInput, ArrowLeft, Edit, Message, Phone, Switch, Lock, Brush, Calendar, List, Monitor, EditPen, CirclePlus,
    },
    setup() {
      const appOptionStore = useAppOptionStore()
      const userProfile = userProfileStore()
      const dialogFormVisible = ref(false)
      const formLabelWidth = '140px'
      const userData = ref({})
      const skillsData = ref({})
      //const checkedSkillsAccount =ref({})
      const skillsAll =ref({})
      const router = useRouter()
      const skillIds = reactive({
        title: 'Java',
        description: 'Java programming language',
      })
      const profile = reactive({
        fullName: '',
        email: '',
        phoneNumber: '',
        skillIds: ['66535835790377c351123735','6653589c790377c351123736'],
      })
      const activeMenuItem = ref('1') // Initialize with the default active menu item
      const handleMenuSelect = (index) => {
        activeMenuItem.value = index // Update the active menu item
      }
      const updateProfile = async () => {
        try {
          console.log('....>>>>>>>>>346436436', profile)

          const editUserData = await userProfile.actUpdateProfile(profile)
          //await userProfile.actUpdateSkills(profile.skillIds)
          localStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(editUserData))
          appOptionStore.setUser(editUserData)
          // setTimeout(() => {
          //   router.go(0)
          // }, 100)
          dialogFormVisible.value = false // Close the dialog
        } catch (error) {
          //clearTokenAfterTimeout(0)
          console.error('Failed to update profile:', error)
        }
      }

      const nameAccount = computed(() => {
        const fullName = userData.value?.fullName || ''
        if (fullName) {
          const nameParts = fullName.split(' ')
          const lastName = nameParts.pop()
          const firstName = nameParts.join(' ')
          return `${lastName} ${firstName}`
        }
        return ''
      })

      const emailAccount = computed(() => userData.value?.email || '')
      const phoneAccount = computed(() => userData.value?.phoneNumber || '')
      const skillsAccount = computed(() => userData.value?.skills || [])
      // console.log('.skillsAccount:', skillsAccount)


        //console.log('skillsAll:', skillsAll.value);


      //const skillsAllTitle = computed(() => skillsData.value?.map(skill => skill.title) || [''])
      //const skillsAllId = computed(() => skillsData.value?.map(skill => skill.id) || [''])
      //console.log('00000000000000---->skillsAllTitle:', skillsAllTitle.value)
      //console.log('00000000000000---->skillsAllId:', skillsAllId.value)
      onMounted(async () => {
        try {
          // console.log('.skillsAccount:', skillsAccount)
          userData.value = await userProfile.actGetMe()
          skillsData.value = await userProfile.actGetSkills()//get all skills
          skillsAll.value = skillsData.value.map(skill => {
              return {
                id: skill.id,
                title: skill.title
              };
            });
          //console.log('11111111>>>>>>>>>skillsAll:', skillsAll.value)
          console.log('skillsData.value 1:', skillsData.value);
          console.log('skillsAll.value 22222:', skillsAll.value);
          //console.log('00000000000000---->skillsAll:', skillsData.value)
          profile.fullName = userData.value?.fullName || ''
          profile.email = userData.value?.email || ''
          profile.phoneNumber = userData.value?.phoneNumber || ''
          profile.skillIds = skillsData.value?.map(skill => skill.id) || ['']
        } catch (error) {
          console.error('Failed to fetch user data:', error)
        }
      })

      // const clearTokenAfterTimeout = (timeoutInMinutes) => {
      //   setTimeout(() => {
      //     localStorage.clear()
      //   }, timeoutInMinutes * 60 * 1000) // Convert minutes to milliseconds
      // }

      return {
        dialogFormVisible,
        formLabelWidth,
        profile,
        skillsData,
        skillIds,
        userData,
        nameAccount,
        emailAccount,
        phoneAccount,
        skillsAccount,
        updateProfile,
        activeMenuItem,
        handleMenuSelect,
        skillsAll,
        //skillsAllTitle,
        //skillsAllId,
      }
    }
  }
</script>

<style scoped></style>
