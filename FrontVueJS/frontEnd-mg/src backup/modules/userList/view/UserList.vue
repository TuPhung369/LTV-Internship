<template>
  <div>
    <!-- 1 Search bar -->
    <div style="display: flex; justify-content: flex-end; margin: 0px 40px">
      <el-button
        v-if="currentUser.role === 'ADMIN'"
        type="primary"
        style="margin-left: 10px; padding-top: 5px; padding-bottom: 5px; height: 40px"
        @click="createUser"
      >
        <el-icon style="font-size: 20px">
          <Plus />
        </el-icon>
        <span style="margin-left: 10px; font-size: 20px">Add Employee</span>
      </el-button>
    </div>
    <div style="display: flex; justify-content: flex-end; margin: 20px 40px">
      <el-input
        v-model="searchEmailQuery"
        class="input-search"
        placeholder="Search by Email"
        clearable
      ></el-input>
      <el-input
        v-model="searchNameQuery"
        class="input-search"
        placeholder="Search by Name"
        clearable
      ></el-input>
      <el-input
        v-model="searchPhoneQuery"
        class="input-search"
        placeholder="Search by Phone Number"
        clearable
      ></el-input>

      <el-button
        type="warning"
        style="margin-left: 10px; width: 40px; display: flex; justify-content: center"
        light
        @click="clearAllFilter"
      >
        <el-icon style="font-size: 20px">
          <Refresh />
        </el-icon>
      </el-button>
    </div>
    <!-- 2 Table -->
    <el-table
      :v-loading="allUserData.length === 0"
      :data="searchData"
      :default-sort="{ prop: 'email', order: 'ascending' }"
      stripe
      fixed
      style="width: 100%; font-size: 15px"
    >
      <!-- 21 Email -->
      <el-table-column
        fixed
        prop="email"
        label="Email"
        sortable
        width="250px"
        label-class-name="custom-label-padding"
        :filters="emailFilters"
        :filter-method="genericFilter('email')"
        column-key="email"
      >
        <template #default="{ row }">
          <a :href="`/detail/${row.idUser}`">
            <span style="padding: 0 30px">{{ row.email }}</span>
          </a>
        </template>
      </el-table-column>
      <!-- 22 Name -->
      <el-table-column
        prop="fullName"
        label="Name"
        sortable
        width="200px"
        :sort-method="sortByTitle('fullName')"
      />
      <!-- 23 Phone Number -->
      <el-table-column prop="phoneNumber" label="Phone" sortable width="140px">
        <template #default="{ row }">
          <a>{{ row.phoneNumber }}</a>
        </template>
      </el-table-column>
      <!-- 24 Role -->
      <el-table-column
        prop="role"
        label="Role"
        sortable
        width="120px"
        :filters="roleFilters"
        :filter-method="genericFilter('role')"
      >
        <template #default="{ row }">
          <el-tag
            effect="light"
            :type="row.role === 'ADMIN' ? 'info' : row.role === 'USER' ? 'success' : 'danger'"
          >
            {{ row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 25 Status -->
      <el-table-column
        prop="status"
        label="Status"
        sortable
        width="140px"
        :sort-method="sortByTitle('status.title')"
        :filters="statusFilters"
        :filter-method="genericFilter('status.title')"
      >
        <template #default="{ row }">
          <template v-if="row.status">
            <el-tag
              effect="light"
              type="info"
              :style="{
                color: row.status.color,
                border: 'none',
                fontWeight: '500',
              }"
              >{{ row.status.title }}</el-tag
            >
          </template>
          <template v-else>
            <h2></h2>
          </template>
        </template>
      </el-table-column>
      <!-- 26 isActive -->
      <el-table-column
        prop="isActive"
        label="Active"
        sortable
        width="120px"
        :filters="isActiveFilters"
        :filter-method="genericFilter('isActive')"
        column-key="isActive"
      >
        <template #default="{ row }">
          <el-tag effect="light" :type="row.isActive ? 'success' : 'info'">
            {{ row.isActive ? 'Active' : 'Deactivated' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 27 Position -->
      <el-table-column
        prop="position"
        label="Position"
        sortable
        width="170px"
        :sort-method="sortByTitle('position.title')"
        :filters="positionFilters"
        :filter-method="genericFilter('position.title')"
        column-key="position"
      >
        <template #default="{ row }">
          <template v-if="row.position">
            <el-tag effect="light" type="info">{{ row.position.title }}</el-tag>
          </template>
          <template v-else>
            <h2></h2>
          </template>
        </template>
      </el-table-column>
      <!-- 28 Department -->
      <el-table-column
        prop="department"
        label="Department"
        sortable
        width="150px"
        :sort-method="sortByTitle('department.title')"
        :filters="departmentFilters"
        :filter-method="genericFilter('department.title')"
        column-key="department"
      >
        <template #default="{ row }">
          <template v-if="row.department">
            <el-tag effect="light" type="primary">{{ row.department.title }}</el-tag>
          </template>
          <template v-else>
            <h2></h2>
          </template>
        </template>
      </el-table-column>
      <!-- 29 Edit -->
      <el-table-column v-if="currentUser.role === 'ADMIN'" label="" width="150px">
        <template #default="{ row }">
          <div style="display: flex; justify-content: flex-end; margin-right: 10px"></div>
          <el-button type="primary" @click="editUserDialog(row.idUser)"
            ><el-icon> <EditPen /> </el-icon
          ></el-button>
          <el-button type="danger" @click="deleteUser(row.idUser)"
            ><el-icon> <Delete /> </el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 3 Edit Dialog User-->
    <!-- 31 Dialog for Edit Profile, Skills and showing Qualification-->
    <el-dialog
      v-model="isDialogProfile"
      :title="typeEditCreate === 'createUser' ? 'Create Profile' : 'Edit Profile'"
      width="700"
      draggable
    >
      <el-form :model="selectProfile">
        <el-form-item label="Full Name" :label-width="formLabelWidth">
          <el-input
            v-model="selectProfile.fullName"
            placeholder="Please input your Full Name"
            clearable
          />
        </el-form-item>

        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="selectProfile.email" placeholder="Please input your Email" clearable />
        </el-form-item>

        <el-form-item label="Phone Number" :label-width="formLabelWidth">
          <el-input
            v-model="selectProfile.phoneNumber"
            placeholder="Please input your Phone Number"
            clearable
          />
        </el-form-item>

        <el-form-item
          v-if="currentUser.role === 'ADMIN'"
          label="Role"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="selectProfile.role" class="ml-4">
            <el-radio value="ADMIN" size="large">ADMIN</el-radio>
            <el-radio value="MANAGER" size="large">MANAGER</el-radio>
            <el-radio value="USER" size="large">USER</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="currentUser.role === 'ADMIN'"
          label="Activation"
          :label-width="formLabelWidth"
          ><el-switch
            v-model="selectProfile.isActive"
            class="ml-2 mr-3"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
          {{ selectProfile.isActive ? 'Active' : 'Deactivated' }}</el-form-item
        >
        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-select
            v-model="selectProfile.status"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose status"
            style="width: 100%"
          >
            <el-option
              v-for="status in statusOptions"
              :key="status.id"
              :label="status.title"
              :value="status"
              ><el-tag :color="status.color" style="margin-right: 1px" size="small" />
              <span :style="{ color: status.color }">{{ status.title }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Positions" :label-width="formLabelWidth">
          <el-select
            v-model="selectProfile.position"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your position"
            style="width: 100%"
          >
            <el-option
              v-for="position in positionsOptions"
              :key="position.value"
              :label="position.title"
              :value="position"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Department" :label-width="formLabelWidth">
          <el-select
            v-model="selectProfile.department"
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your position"
            style="width: 100%"
          >
            <el-option
              v-for="department in departmentsOptions"
              :key="department.value"
              :label="department.title"
              :value="department"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Skills" :label-width="formLabelWidth">
          <el-select
            v-model="selectProfile.skills"
            multiple
            filterable
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your skills"
            style="width: 100%"
          >
            <el-option
              v-for="skill in skillsOptions"
              :key="skill.value"
              :label="skill.title"
              :value="skill"
            />
          </el-select>
        </el-form-item>

        <!-- Dialog for Showing Education -->
        <div style="margin-left: 50px">
          <div class="flex justify-between align-top justify-items-start">
            <span>Education</span>
            <span>
              <el-button
                v-if="currentUser.role === 'ADMIN' && currentUser.idUser === selectProfile.id"
                type="info"
                style="margin-right: 20px; height: 40px; width: 40px"
                plain
                round
                @click="addQualification"
              >
                <el-icon :size="20" class="hover:transform-scale(1.2) hover: blue-500">
                  <Plus /> </el-icon
              ></el-button>
            </span>
          </div>
          <div style="margin-left: 70px">
            <el-timeline>
              <el-timeline-item
                v-for="(qualification, index) in selectProfile?.qualifications"
                :key="index"
              >
                <li style="margin-top: 0px">
                  <div
                    class="flex justify-between align-top justify-items-start"
                    style="font-weight: bold; font-size: 15px; margin-top: 0px; color: #333"
                  >
                    <span>{{ qualification?.institute }}</span>
                    <span style="margin-right: 100px">
                      <el-icon
                        :size="23"
                        class="border border-transparent mr-1"
                        @click="editQualification(qualification.id)"
                      >
                        <EditPen />
                      </el-icon>
                      <el-icon
                        :size="23"
                        class="border border-transparent"
                        @click="deleteQualification(qualification.id)"
                      >
                        <Delete />
                      </el-icon>
                    </span>
                  </div>
                  <div class="list-qualification mt-1">
                    <span class="mr-1">{{ qualification?.title }},</span>
                    <span>{{ qualification?.field }}</span>
                  </div>
                  <div class="list-qualification mt-1">
                    <span class="text-green-600">{{ formatDate(qualification.dateObtained) }}</span>
                  </div>
                </li>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isDialogProfile = false">Cancel</el-button>
          <el-button type="primary" @click="updateProfile">Confirm</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 32 Dialog for Edit Education isDialogQualification-->
    <el-dialog
      v-model="isDialogQualification"
      :title="typeEditCreate === 'createQualification' ? 'Create Education' : 'Edit Education'"
    >
      <el-form :model="selectQualification">
        <el-form-item label="Degree" :label-width="formLabelWidth">
          <el-input
            v-model="selectQualification.title"
            placeholder="Please input your Degree"
            clearable
          />
        </el-form-item>
        <el-form-item label="Field of Study" :label-width="formLabelWidth">
          <el-input
            v-model="selectQualification.field"
            placeholder="Please input your Field"
            clearable
          />
        </el-form-item>
        <el-form-item label="School" :label-width="formLabelWidth">
          <el-input
            v-model="selectQualification.institute"
            placeholder="Please input your School"
            clearable
          />
        </el-form-item>
        <el-form-item label="Graduated Date" :label-width="formLabelWidth">
          <el-date-picker
            v-model="selectQualification.dateObtained"
            type="date"
            placeholder="Please input your Graduated Date"
          />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary" @click="saveQualification">Save</el-button>
      </div>
    </el-dialog>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :disabled="disabled"
      :background="background"
      :total="totalItems"
      :page-count="totalPage"
      layout="total, prev, pager, next"
      style="
        margin-top: 20px;
        display: flex;
        justify-content: right;
        margin-right: 60px;
        color: #333;
        font-size: 17px;
      "
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="js">
  import { userProfileStore } from '../../profiles/store'
  import { onMounted, reactive, toRefs, watch, computed } from 'vue';
  import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
  import get from 'lodash/get';
  //import router from '@/router'

  export default {
    name: 'UserList',
    setup() {
      const userProfile = userProfileStore()
      const formLabelWidth = '120px'
      const state = reactive({
        userData: [],
        allUserData: [],
        currentUser: [],
        selectProfile: {
          id: '',
          fullName: '',
          email: '',
          departmentId: '',
          phoneNumber: '',
          positionId: '',
          isActive: '',
          skillIds: [],
          position: {
            value: '',
            title: '',
          },
          department: {
            value: '',
            title: '',
          },
          skills: [],
          statusId: '',
          status: {
            value: '',
            title: '',
          },
          qualifications: {
            id: '',
            title: '',
            field: '',
            institute: '',
            dateObtained: '',
          },
        },
        typeEditCreate: '',
        skillsOptions: [],
        positionsOptions: {},
        departmentsOptions: {},
        statusOptions: {},
        isDialogProfile: false,
        isDialogQualification: false,
        searchEmailQuery: '',
        searchNameQuery: '',
        searchPhoneQuery: '',
        selectQualification: {
          id: '',
          title: '',
          field: '',
          institute: '',
          dateObtained: '',
        },
        selectId: '',
        sortColumn: null,
        sortOrder: null,
        currentPage: 1,
        pageSize: 2,
        small: true,
        disabled: false,
        background: true,
        totalItems: 10,
        totalPage: 1,
      })
      const initializeUserData = async () => {
        try {
          const allDataPaginate = await userProfile.actGetAllUsersPaginate(state.pageSize,state.currentPage)
          state.currentUser = await userProfile.actGetMe()
          state.allUserData = allDataPaginate.users.map((user) => ({
            creDt: user.creDt,
            delFlg: user.delFlg,
            department: user.department,
            email: user.email,
            fullName: user.fullName,
            idUser: user.idUser,
            isActive: user.isActive,
            phoneNumber: user.phoneNumber,
            position: user.position,
            qualifications: user.qualifications.map((qualification) => ({
              id: qualification.id,
              title: qualification.title,
              field: qualification.field,
              institute: qualification.institute,
              dateObtained: qualification.dateObtained,
            })),
            role: user.role,
            skills: user.skills.map((skill) => ({
              value: skill.id,
              title: skill.title,
            })),
            status: user.status
              ? {
                  id: user.status.id,
                  title: user.status.title,
                  color: getStatusColor(user.status.title),
                }
              : {},
            updDt: user.updDt,
          }))
          state.totalItems = allDataPaginate.totalItems
          state.totalPage = allDataPaginate.pageCount
          if (state.userData.status) {
            state.userData.status = {
              id: state.userData.status.id,
              title: state.userData.status.title,
              color: getStatusColor(state.userData.status.title),
            }
          } else {
            state.userData.status = {
              id: null,
              title: 'null',
              color: getStatusColor('Unknown'),
            }
          }
          const skillsData = await userProfile.actGetSkills() //get all skills
          //We must map to value because V-model bind Data by Value of Ref/Reactive
          state.skillsOptions =
            skillsData.map((skill) => ({
              value: skill.id,
              title: skill.title,
            })) || []
          const statusData = await userProfile.actGetStatus() //get all status
          state.statusOptions =
            statusData.map((status) => ({
              value: status.id,
              title: status.title,
              color: getStatusColor(status.title),
            })) || {}
          const positionsData = await userProfile.actGetPositions() //get all positions
          state.positionsOptions =
            positionsData.map((position) => ({
              value: position.id,
              title: position.title,
            })) || {}
          const departmentsData = await userProfile.actGetDepartments() //get all departments
          state.departmentsOptions =
            departmentsData.map((department) => ({
              value: department.id,
              title: department.title,
            })) || {}

        } catch (error) {
          console.error('Failed to initialize user data:', error)
        }
      }
      //Pagination
      const handleCurrentChange = (choosePage) => {
        state.currentPage = choosePage;
        initializeUserData();
      }
      //Updating user data when dialog is open or close.
      watch(
         [() => state.isDialogProfile, () => state.isDialogQualification], async() => {
            await initializeUserData();
            const selectUserId = state.allUserData.find((user) => user.idUser === state.selectId.idUser)
            state.selectProfile = {
            id: selectUserId.idUser,
            fullName: selectUserId.fullName,
            email: selectUserId.email,
            phoneNumber: selectUserId.phoneNumber,
            role: selectUserId.role,
            isActive: selectUserId.isActive,
            position: selectUserId.position ? {
              value: selectUserId.position.id,
              label: selectUserId.position.title,
            } : {},
            department: selectUserId.department ? {
              value: selectUserId.department.id,
              label: selectUserId.department.title,
            } : {},
            skills: selectUserId.skills ? selectUserId.skills.map(skill => ({
              value: skill.value,
              label: skill.title,
            })) : [],
            status: selectUserId.status ? {
              value: selectUserId.status.id,
              label: selectUserId.status.title,
              color: selectUserId.status.color,
            } : {},
            qualifications: selectUserId.qualifications ? selectUserId.qualifications.map(qualification => ({
              id: qualification.id,
              title: qualification.title,
              field: qualification.field,
              institute: qualification.institute,
              dateObtained: qualification.dateObtained,
            })) : [],
        }
      });
      const cancelDialog = async () => {
        console.log('Step 1: cancelDialog state.selectProfile.qualifications', state.selectProfile.qualifications)
        state.isDialogProfile = true
        state.isDialogQualification = false
      }
      //Formatting Data for Showing
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };
      const getStatusColor = (title) => {
        const statusColorMap = {
          Online: '#32CD32',
          Busy: '#FF6600',
          Away: '#FFDE0A',
          'Do Not Disturb': '#E63415',
          Offline: '#14CCCC',
          'Meeting': '#6222C9',
        }
        return statusColorMap[title] || 'rgba(0, 0, 0, 0)'
      }
      //Sorting by Title
      const sortByTitle = (propertyPath) => {
      return (a, b) => {
        const titleA = get(a, propertyPath, '');
        const titleB = get(b, propertyPath, '');
        return titleA.localeCompare(titleB, ['vi', 'en']);
      };
      };
      const genericFilter = (propertyPath) => (value, row) => {
        const fieldValue = get(row, propertyPath);
        return fieldValue === value;
      };
      //Filtering for Email, Role, Status, isActive, Position, Department
      const emailFilters = computed(() => {
        const domains = new Set();
        state.allUserData.forEach(user => {
          const domain = user.email.split('@')[1];
          if (domain) {
            domains.add(domain);
          }
        });
        return Array.from(domains).map(domain => ({ text: domain, value: domain }));
      });
      const roleFilters = computed(() => {
        const roles = new Set(state.allUserData.map(user => user.role));
        return Array.from(roles).map(role => ({ text: role, value: role }));
      });
      const statusFilters = computed(() => {
        const statuses = new Set(state.allUserData.map(user => user.status && user.status.title));
        return Array.from(statuses).map(title => ({ text: title, value: title }));
      });
      const isActiveFilters = computed(() => {
        const activeValues = new Set(state.allUserData.map(user => user.isActive));
        return Array.from(activeValues).map(value => ({
          text: value ? 'Active' : 'Deactivated',
          value
        }));
      });
      const positionFilters = computed(() => {
        const positions = new Set();
        state.allUserData.forEach(user => {
          if (user.position && user.position.title) {
            positions.add(user.position.title);
          }
        });
        return Array.from(positions).map(title => ({ text: title, value: title }));
      });
      const departmentFilters = computed(() => {
        const departments = new Set();
        state.allUserData.forEach(user => {
          if (user.department && user.department.title) {
            departments.add(user.department.title);
          }
        });
        return Array.from(departments).map(title => ({ text: title, value: title }));
      });
      // 3 Search functions
      const searchData = computed(() => {
        let filtered = state.allUserData
        if (state.searchEmailQuery) {
            filtered = filtered.filter((user) =>
              user.email.toLowerCase().includes(state.searchEmailQuery.toLowerCase()),
          )
        }
        if (state.searchNameQuery) {
          filtered = filtered.filter((user) =>
            user.fullName.toLowerCase().includes(state.searchNameQuery.toLowerCase()),
          )
        }
        if (state.searchPhoneQuery) {
          filtered = filtered.filter((user) => user.phoneNumber.includes(state.searchPhoneQuery))
        }
          return filtered
      })
      const clearAllFilter = () => {
        state.searchEmailQuery = ''
        state.searchNameQuery = ''
        state.searchPhoneQuery = ''
      }
      //4 Functions for Edit, Create, Delete Qualification
      const editQualification = (qualificationId) => {
        const qualification = state.selectProfile.qualifications.find((q) => q.id === qualificationId)
        if (!qualification) {
          throw new Error(`No qualification found with ID: ${qualificationId}`)
        }
        state.selectQualification = qualification
          ? {
              id: qualification.id,
              title: qualification.title,
              field: qualification.field,
              institute: qualification.institute,
              dateObtained: qualification.dateObtained,
            }
          : null
        state.typeEditCreate = 'editQualification'
        state.isDialogProfile = false
        state.isDialogQualification = true
      }
      const addQualification = async () => {
        state.selectQualification = {
          id: '',
          title: '',
          field: '',
          institute: '',
          dateObtained: '',
        }
        state.typeEditCreate = 'createQualification'
        state.isDialogProfile = false
        state.isDialogQualification = true
      }
      const saveQualification = async () => {
        try {
          // If the qualification has changed, update it
          if (state.typeEditCreate === 'createQualification') {
            if (
              !state.selectQualification.title ||
              !state.selectQualification.field ||
              !state.selectQualification.institute ||
              !state.selectQualification.dateObtained
            ) {
              ElNotification({
                title: 'Error',
                message: 'You need to fill all fields!',
                type: 'error',
              })
            }
            delete state.selectQualification.id
            //console.log('Step 1: saveQualification state.selectQualification', state.selectQualification)
            await userProfile.actCreateQualificationAdmin(state.selectQualification)
            ElNotification({
              title: 'Success',
              message: 'Your qualification is CREATED successfully!',
              type: 'success',
            })
            //state.typeEditCreate = '' //reset to empty
          }
          else if (state.typeEditCreate === 'editQualification') {
            console.log('Step 2: before saveQualification state.allUserData', state.allUserData)
            await userProfile.actUpdateQualificationsAdmin(state.selectQualification)
            console.log('Step 3: after saveQualification state.allUserData', state.allUserData)
            ElNotification({
              title: 'Success',
              message: 'Your qualification is UPDATED successfully!',
              type: 'success',
            })
          }
          state.typeEditCreate = ''
          //update data at dialog after updating qualification.

          state.isDialogQualification = false // Close the dialog Update Qualification
          state.isDialogProfile = true // Open the dialog
        } catch (error) {
          console.error('Failed to save qualification:', error)
        }
      }
      const deleteQualification = async (qualificationId) => {
        try {
          await ElMessageBox.confirm(
            'Are you sure you want to delete this qualification?',
            'Warning',
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            },
          )
          await userProfile.actDeleteQualification(qualificationId)
          state.selectProfile.qualifications = state.selectProfile.qualifications.filter(
            (qualification) => qualification.id !== qualificationId,
          )
          // Remove the deleted qualification from the list
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        } catch (error) {
          if (error !== 'cancel') {
            console.error(`Error deleting qualification with ID ${qualificationId}: ${error}`)
          } else {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          }
        }
      }
      //4 Functions for Edit, Create, Delete User
      const editUserDialog = async (idUser) => {
        state.selectId = state.allUserData.find((user) => user.idUser === idUser)
        if (!state.selectId) {
          throw new Error(`No user found with ID: ${idUser}`)
        }
        state.selectProfile = {
          id: state.selectId.idUser,
          fullName: state.selectId.fullName,
          email: state.selectId.email,
          phoneNumber: state.selectId.phoneNumber,
          role: state.selectId.role,
          isActive: state.selectId.isActive,
          position: state.selectId.position ? {
            value: state.selectId.position.id,
            label: state.selectId.position.title,
          } : {},
          department: state.selectId.department ? {
            value: state.selectId.department.id,
            label: state.selectId.department.title,
          } : {},
          skills: state.selectId.skills ? state.selectId.skills.map(skill => ({
            value: skill.value,
            label: skill.title,
          })) : [],
          status: state.selectId.status ? {
            value: state.selectId.status.id,
            label: state.selectId.status.title,
            color: state.selectId.status.color,
          } : {},
          qualifications: state.selectId.qualifications ? state.selectId.qualifications.map(qualification => ({
            id: qualification.id,
            title: qualification.title,
            field: qualification.field,
            institute: qualification.institute,
            dateObtained: qualification.dateObtained,
          })) : [],

        };
          state.typeEditCreate = "editUser";
          state.isDialogProfile = true
      }
      const createUser = async () => {
         //console.log('createUser Step 1: state.selectProfile', state.selectProfile)
        state.selectProfile = {
          id: null,
          fullName: '',
          email: '',
          phoneNumber: '',
          positionId: null,
          isActive: true, // Assuming isActive should remain true
          skillIds: [],
          position: {
              value: null,
              title: '',
          },
          department: {
              value: null,
              title: '',
          },
          skills: [],
          statusId: null,
          status: {
              value: null,
              title: '',
              color: '',
          },
          qualification: {
              id: null,
              title: '',
              field: '',
              institute: '',
              dateObtained: null,
          },
        };
        //step 2: change mode to create USER and open the Dialog
        state.typeEditCreate = "createUser";
        state.isDialogProfile = true;
      };
      const deleteUser = async (idUser) => {
        try {
           await ElMessageBox.confirm(
             'Are you sure you want to delete this User?',
             'Warning',
             {
               confirmButtonText: 'OK',
               cancelButtonText: 'Cancel',
               type: 'warning',
             }
           );

          await userProfile.actDeleteUser(idUser);
          state.allUserData = state.allUserData.filter((user) => user.idUser !== idUser);
          state.selectUserId = '';
           ElMessage({
             type: 'success',
             message: 'Delete completed',
           });
          } catch (error) {
           if (error !== 'cancel') {
             console.error(`Error deleting User with ID ${idUser}: ${error}`);
           } else {
             ElMessage({
               type: 'info',
               message: 'Delete canceled',
             });
           }
         }
      };
      const updateProfile = async () => {
        try {
          // change Object to Array (skillIds) for updating the profile
          console.log('updateProfile Step 1: state.selectProfile', state.selectProfile)
          state.selectProfile.skillIds = state.selectProfile.skills.map(skill => skill.value);
          delete state.selectProfile.skills; //delete property skills before update the profile

          state.selectProfile.statusId = state.selectProfile.status.value;
          delete state.selectProfile.status; //delete property status before update the profile

          state.selectProfile.positionId = state.selectProfile.position.value;
          delete state.selectProfile.position; //delete property position before update the profile
          state.selectProfile.departmentId = state.selectProfile.department.value;
          delete state.selectProfile.department; //delete property department before update the profile
          delete state.selectProfile.qualifications; //delete property qualifications before update the profile

          if (state.typeEditCreate === "createUser") {
            delete state.selectProfile.id;
            await userProfile.actCreateUser(state.selectProfile);
            ElNotification({
              title: 'Success',
              message: 'The User is CREATED successfully!',
              type: 'success',
            });
          }
          else if (state.typeEditCreate === "editUser") {
            await userProfile.actUpdateProfileAdmin(state.selectProfile);
            ElNotification({
              title: 'Success',
              message: 'The User is UPDATED successfully!',
              type: 'success',
            });
          }
          state.typeEditCreate = "";
          state.isDialogProfile = false;
        } catch (error) {
          console.error('Failed to Update profile/Create user:', error);
        }
      };

      onMounted(async () => {
        await initializeUserData()
      })

      return {
        ...toRefs(state),
        formLabelWidth,
        updateProfile,
        deleteQualification,
        editQualification,
        saveQualification,
        addQualification,
        cancelDialog,
        deleteUser,
        editUserDialog,
        createUser,
        sortByTitle,
        searchData,
        emailFilters,
        roleFilters,
        statusFilters,
        isActiveFilters,
        positionFilters,
        departmentFilters,
        genericFilter,
        clearAllFilter,
        formatDate,
        handleCurrentChange,
      }
    },
  }
</script>

<style scoped>
  :deep(th.custom-label-padding .cell) {
    padding-left: 40px;
  }

  .input-search {
    width: 250px;
    height: 32px;
    margin-left: 15px;
  }
</style>
