<template>
  <div class="common-layout">
    <el-container>
      <el-header
        style="
          text-align: right;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 60px;
        "
      >
        <img src="@/assets/images/logoltv.png" alt="LTV" class="LTV" />
        <div
          class="toolbar"
          style="
            margin-top: 20px;
            font-size: 15px;
            display: flex;
            justify-content: right;
            align-items: center;
          "
        >
          <span style="margin-right: 20px">{{ fullName }}</span>
          <el-dropdown>
            <el-avatar src="https://i.redd.it/8a0wds8pzwmb1.jpg" />
            <template #dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item @click="handleLogOut">Log Out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-container>
          <el-aside width="200px">
            <el-scrollbar>
              <el-menu :default-active="activeMenu" :default-openeds="['1', '2', '3']">
                <el-menu-item index="/info" @click="navigateTo('UserProfile')">
                  <template #title>
                    <el-icon> <UserFilled /> </el-icon>Profile
                  </template>
                </el-menu-item>
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon> <Avatar /> </el-icon>Employee
                  </template>
                  <el-menu-item index="/user-list" @click="navigateTo('UserListPage')">
                    <template #title>
                      <el-icon> <List /> </el-icon>User List
                    </template>
                  </el-menu-item>
                  <el-menu-item index="/qualifications" @click="navigateTo('QualificationPage')">
                    <template #title>
                      <el-icon> <Tickets /> </el-icon>Qualification
                    </template>
                  </el-menu-item>
                  <el-menu-item index="/histories" @click="navigateTo('HistoriesPage')">
                    <template #title>
                      <el-icon> <RefreshLeft /> </el-icon>Histories
                    </template>
                  </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                  <template #title>
                    <el-icon> <SuitcaseLine /> </el-icon>Job
                  </template>
                  <el-menu-item index="/position" @click="navigateTo('PositionsPage')">
                    <template #title>
                      <el-icon> <Histogram /> </el-icon>Position
                    </template>
                  </el-menu-item>
                  <el-menu-item index="/department" @click="navigateTo('DepartmentPage')">
                    <template #title>
                      <el-icon> <OfficeBuilding /> </el-icon>Department
                    </template>
                  </el-menu-item>
                  <el-menu-item index="/skill" @click="navigateTo('SkillPage')">
                    <template #title>
                      <el-icon> <Suitcase /> </el-icon>Skill
                    </template>
                  </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <Eleme />
                    </el-icon>
                    Activities
                  </template>
                  <el-menu-item index="/activities" @click="navigateTo('ActivitiesPage')">
                    <template #title>
                      <el-icon>
                        <ChatRound />
                      </el-icon>
                      Notification
                    </template>
                  </el-menu-item>

                  <el-menu-item index="/status" @click="navigateTo('StatusPage')">
                    <template #title>
                      <el-icon> <Notification /> </el-icon>Status
                    </template>
                  </el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main class="main-content" style="height: 88vh">
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { ElScrollbar } from 'element-plus'
  import { AUTH_CURRENT_USER } from '@/core/constants'

  export default defineComponent({
    name: 'DefaultLayout',
    setup() {
      const fullName = ref('')
      const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
      const route = useRoute()
      const router = useRouter()
      const activeMenu = ref(route.path)
      watch(route, () => {
        if (!scrollbarRef.value) {
          return
        }
        scrollbarRef.value.setScrollTop(0)
      })
      onMounted(() => {
        const userLocal = localStorage.getItem(AUTH_CURRENT_USER)
        if (userLocal) {
          const user = JSON.parse(userLocal)
          fullName.value = user.fullName
        }
        activeMenu.value = route.path
        console.log(activeMenu.value)
      })

      const handleLogOut = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          localStorage.clear()
          router.push('/login')
        } catch (error) {
          console.error('Failed to log out:', error)
        }
      }
      const navigateTo = (routeName: string) => {
        router.push({ name: routeName, params: { tab: routeName } })
      }
      return { scrollbarRef, route, fullName, handleLogOut, activeMenu, navigateTo }
    },
  })
</script>

<style scoped>
  .custom-dropdown-menu :hover .el-dropdown-item {
    background-color: #ff4040;
    color: #fff;
  }

  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }

  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }

  .layout-container-demo .el-menu {
    border-right: none;
  }

  .layout-container-demo .el-main {
    padding: 0;
  }

  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  img {
    margin-top: 20px;
    width: 50px;
    height: auto;
  }
</style>
