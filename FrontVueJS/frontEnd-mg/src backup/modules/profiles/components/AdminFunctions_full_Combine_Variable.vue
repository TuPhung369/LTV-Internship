<template>
  <div>
    <el-select v-model="selectUserId" clearable placeholder="Select" style="width: 240px">
      <el-option
        v-for="item in allUserData"
        :key="item.value"
        :label="item.fullName"
        :value="item.value"
      />
    </el-select>
    <span style="margin-top: 5px; margin-left: 5px">
      <el-button type="primary" size="normal" @click="createNewUser">Create New User</el-button>
    </span>
    <!-- Display user details only if selectUser is defined -->
    <div v-if="selectUser">
      <el-descriptions
        class="margin-top"
        title="Profile"
        :column="3"
        :size="'28px'"
        :style="blockMargin"
      >
        <el-descriptions-item label="Name">{{ selectUser.fullName }}</el-descriptions-item>
        <el-descriptions-item label="Phone">{{ selectUser.phoneNumber }}</el-descriptions-item>
        <el-descriptions-item>
          <el-tag size="normal" :type="'primary'" effect="light" round>
            {{ selectUser.status ? selectUser.status.title : '' }}
          </el-tag>
          <el-icon size="25px" class="ml-5 mt-1" @click="isDialogProfile = true">
            <Edit />
          </el-icon>
          <el-icon size="25px" class="ml-2" @click="deleteUser(selectUserId)"> <Delete /> </el-icon
        ></el-descriptions-item>
        <el-descriptions-item label="Department">{{
          selectUser.department ? selectUser.department.title : ''
        }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{ selectUser.email }}</el-descriptions-item>

        <el-descriptions-item>
          <el-tag size="normal" :type="'success'" effect="light" round>
            {{ selectUser.role }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="Position">{{
          selectUser.position ? selectUser.position.title : ''
        }}</el-descriptions-item>

        <el-descriptions-item label="">{{
          selectUser.isActive ? 'Working' : 'Resign'
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- Skills -->
      <el-divider class="my-3"></el-divider>
      <div class="skillsAccount ml-5 mr-5">
        <div class="flex-row justify-between items-center text-base font-bold text-gray-400">
          <span>Kĩ Năng</span>
        </div>
        <div class="informationSkill flex-row items-center justify-start my-1">
          <el-row :gutter="10">
            <el-col v-for="skill in selectUser.skills" :key="skill.title" :span="4">
              <el-card
                :style="{
                  border: '1px solid #ccc',
                  'border-radius': '9999px',
                  'background-color': '#f5f5f5',
                  height: '40px',
                  display: 'flex',
                  'justify-content': 'center',
                  'align-items': 'center',
                  'margin-top': '5px',
                }"
              >
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

      <el-divider class="my-3"></el-divider>
      <div class="educationAccount ml-3 mr-3">
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
              v-for="qualification in selectUser.qualifications"
              :key="qualification.value"
              :span="12"
            >
              <div
                class="border ml-5 px-3 mt-3 border-gray-300 rounded-full text-gray-100 italic text-sm bg-gradient-to-r from-gray-400 via-gray-400 to-gray-500 h-10 flex-row pl-4 transition duration-300 ease-in-out hover:bg-gradient-to-l hover:from-gray-600 hover:via-gray-200 hover:to-gray-500 hover:text-black hover:font-normal hover:shadow-lg hover:transform hover:translate-y-px"
              >
                {{ qualification.title }} - {{ qualification.field }} -
                {{ qualification.institute }} - {{ qualification.dateObtained }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- Dialog for Edit Profile and Skills-->
    <el-dialog v-model="isDialogProfile" title="Edit User Profile" width="800" draggable>
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

        <el-form-item label="Role" :label-width="formLabelWidth">
          <el-radio-group v-model="selectProfile.role" class="ml-4">
            <el-radio value="ADMIN" size="large">ADMIN</el-radio>
            <el-radio value="MANAGER" size="large">MANAGER</el-radio>
            <el-radio value="USER" size="large">USER</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Activation" :label-width="formLabelWidth"
          ><el-switch
            v-model="selectProfile.isActive"
            class="ml-2"
            style="--el-switch-off-color: #ff4949; --el-switch-on-color: #13ce66"
        /></el-form-item>
      </el-form>

      <el-form-item label="Skills" :label-width="formLabelWidth">
        <el-select
          v-model="skillsUser"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
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

      <el-form-item label="Status" :label-width="formLabelWidth">
        <el-select
          v-model="statusUser"
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your position"
          style="width: 100%"
        >
          <el-option
            v-for="status in statusOptions"
            :key="status.value"
            :label="status.title"
            :value="status"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Positions" :label-width="formLabelWidth">
        <el-select
          v-model="positionsUser"
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
          v-model="departmentsUser"
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

      <!-- Dialog for Showing Education -->
      <el-form-item v-if="typeCreate !== 'USER'" label="Education" :label-width="formLabelWidth">
        <div class="flex">
          <div style="flex: 1; overflow-x: hidden">
            <el-scrollbar
              style="height: 200px"
              class="informationEducation flex-row items-center justify-start"
            >
              <el-row
                v-for="qualification in qualificationsUser"
                :key="qualification.id"
                style="direction: ltr; overflow-y: auto"
                :gutter="1"
              >
                <el-card
                  style="
                    margin-bottom: 5px;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                    transition: box-shadow 0.3s ease;
                    width: 550px;
                  "
                >
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      align-items: flex-start;
                      margin-bottom: 2px;
                    "
                  >
                    <span
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: #777;
                        margin: 0 2px;
                        width: 100px;
                      "
                      >{{ qualification.title }}</span
                    >
                    <span style="font-size: 18px; font-weight: bold; color: #333; margin: 0 2px">{{
                      qualification.institute
                    }}</span>
                    <el-icon
                      :size="40"
                      class="bg-transparent border border-transparent"
                      @click="editQualification(qualification.id)"
                    >
                      <Edit />
                    </el-icon>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: start;
                      align-items: start;
                      justify-content: space-between;
                    "
                  >
                    <span
                      style="
                        font-size: 17px;
                        font-weight: bold;
                        color: #333;
                        margin: 0 2px;
                        width: 100px;
                      "
                      >{{ qualification.dateObtained }}</span
                    >
                    <span style="font-size: 17px; font-weight: bold; color: #777; margin: 0 2px">
                      {{ qualification.field }}
                    </span>
                    <el-icon
                      :size="40"
                      class="bg-transparent border border-transparent"
                      @click="deleteQualification(qualification.id)"
                    >
                      <Delete />
                    </el-icon>
                  </div>
                </el-card>
              </el-row>
            </el-scrollbar>
          </div>
          <div style="margin-top: 1px; margin-left: 15px">
            <el-icon
              :size="40"
              class="hover:transform-scale(1.2) hover: blue-500"
              @click="addQualification"
            >
              <Plus />
            </el-icon>
          </div>
        </div>
      </el-form-item>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isDialogProfile = false">Cancel</el-button>
          <el-button type="primary" @click="updateProfile">Confirm</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Dialog for Updating Education -->
    <el-dialog v-model="isDialogQualification" title="Update Qualification">
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
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary" @click="saveQualification">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
  // import { useAppOptionStore } from '../../../store/app/options'
   import { userProfileStore } from '../store'
   //import { useRouter } from 'vue-router'
   //import { AUTH_CURRENT_USER } from '@/core/constants'
   import { onMounted, reactive, toRefs, computed, watch } from 'vue'
   import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'

   export default {
     name: 'UserProfile',
     setup() {
       //const appOptionStore = useAppOptionStore()
       //const router = useRouter()
       const userProfile = userProfileStore()
       const formLabelWidth = '140px'

       const state = reactive({
         allData: [],
         allUserData: [],
         selectProfile: {
           id: '',
           fullName: '',
           email: '',
           phoneNumber: '',
           positionId: '',
           skillIds: [''],
         },
         selectUserId: { value: '', label: 'Choose User' },//JSON.parse(localStorage.getItem('selectUserId')) || { value: '', label: 'Choose User' },
         currentQualification: {},
         qualificationsUser: {},
         typeCreate: '',
         skillsUser: {},
         skillsOptions: {},
         positionsUser: {},
         positionsOptions: {},
         departmentsUser: {},
         departmentsOptions: {},
         statusUser: {},
         statusOptions:{},
         isDialogProfile: false,
         isDialogQualification: false,
       });
       // Function to initialize allUserData refresh the data
       const initializeUserData = async () => {
        try {
          state.allData = await userProfile.actGetAllUsers();
          state.allUserData = state.allData.map(user => ({
            creDt: user.creDt,
            delFlg: user.delFlg,
            department: user.department,
            email: user.email,
            fullName: user.fullName,
            value: user.idUser,
            isActive: user.isActive,
            phoneNumber: user.phoneNumber,
            position: user.position,
            qualifications: user.qualifications.map(qualification => ({
              id: qualification.id,
              title: qualification.title,
              field: qualification.field,
              institute: qualification.institute,
              dateObtained: qualification.dateObtained,
            })),
            role: user.role,
            skills: user.skills.map(skill => ({
              value: skill.id,
              title: skill.title,
            })),
            status: user.status,
            updDt: user.updDt,
          }));
        } catch (error) {
          console.error('Failed to initialize user data:', error);
        }
       };

       const selectUser = computed(() => {
         return state.allUserData.find(user => user.value === state.selectUserId) || null;
       });

       //Update user data when dialog is open or close.
       watch(
  [() => state.isDialogProfile, () => state.isDialogQualification], () => {
    if (selectUser.value && state.typeCreate !== "USER") {
      state.selectUser = { ...selectUser.value }; // Update selectUser because it is a computed property by selectUserId so it will not update automatically
      state.skillsUser = Array.isArray(selectUser.value.skills) ? selectUser.value.skills.map(skill => ({
        value: skill.value,
        label: skill.title,
      })) : [];
      state.statusUser = selectUser.value.status ? {
            value: selectUser.value.status.id,
            label: selectUser.value.status.title
          }: {};
      state.positionsUser = selectUser.value.position ? {
            value: selectUser.value.position.id,
            label: selectUser.value.position.title
          }: {};

      state.departmentsUser = selectUser.value.department ? {
        value: selectUser.value.department.id,
        label: selectUser.value.department.title,
      } : {};

      state.qualificationsUser = Array.isArray(selectUser.value.qualifications) ? selectUser.value.qualifications.map(qualification => ({
        id: qualification.id,
        title: qualification.title,
        field: qualification.field,
        institute: qualification.institute,
        dateObtained: qualification.dateObtained,
      })) : [];

      state.selectProfile = {
        id: selectUser.value.value,
        fullName: selectUser.value.fullName,
        email: selectUser.value.email,
        phoneNumber: selectUser.value.phoneNumber,
        role: selectUser.value.role,
        isActive: selectUser.value.isActive,
      };
    } else {
      state.statusUser = {};
      state.skillsUser = [];
      state.positionsUser = {};
      state.departmentsUser = {};
      state.qualificationsUser = [];
      state.selectProfile = {};
    }
  });
       //watch can be used for performing side effects when the value of a ref changes.
       // watch(() => state.selectUserId, (newUserId) => {
       //   state.selectUser = state.allUserData.find(user => user.value === newUserId);
       // });

       const editQualification = (qualificationId) => {
         const qualification = selectUser.value.qualifications.find(q => q.id === qualificationId);
         if (!qualification) {
           throw new Error(`No qualification found with ID: ${qualificationId}`);
         }
         state.currentQualification = qualification ? {
           id: qualification.id,
           title: qualification.title,
           field: qualification.field,
           institute: qualification.institute,
           dateObtained: qualification.dateObtained,
         } : null;
         state.isDialogProfile = false;
         state.isDialogQualification = true;
       };

       const cancelDialog = () => {
         state.isDialogProfile = true;
         state.isDialogQualification = false;
         state.typeCreate="";
       };

       const addQualification = async () => {
         state.currentQualification = {};//Reset the currentQualification
         state.typeCreate = "QUALIFICATION";
         state.isDialogProfile = false;
         state.isDialogQualification = true;
       };

       const saveQualification = async () => {
        try {
          if (state.typeCreate === "QUALIFICATION") {
            if (!state.currentQualification.title || !state.currentQualification.field || !state.currentQualification.institute || !state.currentQualification.dateObtained) {
              ElNotification({
                title: 'Error',
                message: 'You need to fill all fields!',
                type: 'error',
              });
              return;
            }
            await userProfile.actCreateQualification(state.currentQualification);
            ElNotification({
              title: 'Success',
              message: 'Your qualification is CREATED successfully!',
              type: 'success',
            });
            state.typeCreate = "";
          }else {
            await userProfile.actUpdateQualifications(state.currentQualification);
            ElNotification({
              title: 'Success',
              message: 'Your qualification is UPDATED successfully!',
              type: 'success',
            });
            state.typeCreate = "";
          }
          // Fetch all users' data again after saving the qualification
          await initializeUserData();
          // Update qualificationsUser with the edited qualification
            state.qualificationsUser = state.currentQualification;

          state.isDialogQualification = false; // Close the dialog Update Qualification
          state.isDialogProfile = true; // Open the dialog
        } catch (error) {
          console.error('Failed to save qualification:', error);
        }
      };

       const deleteQualification = async (qualificationId) => {
         try {
           await ElMessageBox.confirm(
             'Are you sure you want to delete this qualification?',
             'Warning',
             {
               confirmButtonText: 'OK',
               cancelButtonText: 'Cancel',
               type: 'warning',
             }
           );

           await userProfile.actDeleteQualification(qualificationId);
           await initializeUserData();
           state.qualificationsUser = state.qualificationsUser.filter(qualification => qualification.id !== qualificationId);
           ElMessage({
             type: 'success',
             message: 'Delete completed',
           });
           state.allData = await userProfile.actGetAllUsers()
         } catch (error) {
           if (error !== 'cancel') {
             console.error(`Error deleting qualification with ID ${qualificationId}: ${error}`);
           } else {
             ElMessage({
               type: 'info',
               message: 'Delete canceled',
             });
           }
         }
       };

       const createNewUser = async () => {
         //step 1: reset all the data
        state.selectUser = {
            fullName: '',
            email: '',
            phoneNumber: '',
            department: '',
            position: '',
            skills: [],
            qualifications: [],
        };
        state.selectProfile = {
            id: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            positionId: '',
            skillIds: [''],
        };
        state.skillsUser = {
            value: '',
            label: '',
        };
        state.statusUser = {
          value: '',
          label: '',
        };
        state.positionsUser = {
          value: '',
          label: '',
        };
        state.departmentsUser = {
          value: '',
          label: '',
        };
        state.qualificationsUser = {
            id: '',
            title: '',
            field: '',
            institute: '',
            dateObtained: '',
        };
          //step 2: change mode to create USER and open the Dialog
          state.typeCreate = "USER";
          state.isDialogProfile = true;
       };

       const deleteUser = async (userId) => {
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

           await userProfile.actDeleteUser(userId);
           state.selectUserId = '';
           await initializeUserData();
           ElMessage({
             type: 'success',
             message: 'Delete completed',
           });
          } catch (error) {
           if (error !== 'cancel') {
             console.error(`Error deleting User with ID ${userId}: ${error}`);
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
          // Map skillsUser to skillIds for updating the profile
          state.selectProfile.skillIds = state.skillsUser.map(skill => skill.value);

          console.log("11111111111112222----state.statusUser.value", state.statusUser.value);
          // Access the first element in state.positionsUser and set the positionId
        state.selectProfile.statusId = state.statusUser.value;
        state.selectProfile.positionId = state.positionsUser.value;
        console.log("222222222222233333----state.selectProfile.statusId", state.selectProfile.statusId);
        state.selectProfile.departmentId = state.departmentsUser.value;

          if (state.typeCreate === "USER") {
            //console.log("111111111",state.selectProfile);
            await userProfile.actCreateUser(state.selectProfile);
            await initializeUserData();
            ElNotification({
              title: 'Success',
              message: 'The User is CREATED successfully!',
              type: 'success',
            });
            // Close the dialog
            state.isDialogProfile = false;
            state.typeCreate = "";
          } else {

            // Await the profile update function
            await userProfile.actUpdateProfileAdmin(state.selectProfile);
            await initializeUserData();

            // Find the selectUser in allUserData
            state.selectUser = state.allUserData.find(user => user.value === state.selectProfile.id);

            // Close the dialog
            state.isDialogProfile = false;
          }
        } catch (error) {
          console.error('Failed to update profile/create user:', error);
        }
      };

       onMounted(async () => {
         try {
           await initializeUserData();//waiting until this function completed, then continue to the next line
           const skillsData = await userProfile.actGetSkills()//get all skills
           state.skillsOptions = skillsData.map(skill => ({
             value: skill.id,
             title: skill.title
           })) || {};

          const statusData = await userProfile.actGetStatus()//get all status
           state.statusOptions = statusData.map(status => ({
             value: status.id,
             title: status.title
           })) || {};

           const positionsData = await userProfile.actGetPositions()//get all positions
           state.positionsOptions = positionsData.map(position => ({
             value: position.id,
             title: position.title
           })) || {};

          const departmentsData = await userProfile.actGetDepartments()//get all departments
          console.log("1111111111--------->departmentsData",departmentsData);
           state.departmentsOptions = departmentsData.map(department => ({
             value: department.id,
             title: department.title
           })) || {};
           console.log("22222222--------->state.departmentsOptions",state.departmentsOptions);
         } catch (error) {
           console.error('Failed to fetch user data:', error)
         }
       });

       return {
         ...toRefs(state),
         formLabelWidth,
         selectUser, // Include the computed property
         updateProfile,
         deleteQualification,
         editQualification,
         saveQualification,
         addQualification,
         cancelDialog,
         createNewUser,
         deleteUser,
       }
     }
   }
</script>

<style scoped></style>
