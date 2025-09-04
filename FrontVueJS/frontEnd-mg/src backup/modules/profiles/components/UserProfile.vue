<template>
  <div>
    <!-- 1 Showing the User information (name, contact...) -->
    <el-card style="height: 35vh; margin: 0 auto; width: 98%">
      <!-- 11 - Dropdown button  -->
      <div style="display: flex; justify-content: flex-end">
        <el-dropdown :width="400" trigger="hover">
          <el-icon style="font-size: 23px">
            <More />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu class="custom-dropdown-menu">
              <el-dropdown-item class="dropdownitem" @click="isDialogProfile = true">
                Edit</el-dropdown-item
              >
              <el-dropdown-item class="dropdownitem" @click="qrCodeDialogVisible = true"
                >QR Code</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 12 - User information -->
      <div style="display: flex">
        <!-- 121 - avatar, name, position, department, status, role  -->
        <div style="display: flex; width: 49%; border-right: 2px dashed #d3d3d4">
          <div style="position: relative; width: 130px">
            <div style="position: relative">
              <el-avatar
                :size="130"
                src="https://i.redd.it/8a0wds8pzwmb1.jpg"
                style="position: relative; z-index: 0"
              />
              <el-tag
                v-if="userData.status"
                :color="userData.status.color"
                style="
                  position: absolute;
                  bottom: 13%;
                  right: 13%;
                  border-radius: 50%;
                  width: 15px;
                  height: 15px;
                  z-index: 1;
                "
                size="small"
                @mouseover="showStatusTitle = true"
                @mouseleave="showStatusTitle = false"
              />
              <el-tag
                v-if="showStatusTitle"
                :style="{
                  position: 'absolute',
                  bottom: '-10%',
                  right: '-15%',
                  zIndex: '2',
                  color: userData.status.color,
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  border: 'none',
                }"
                >{{ userData.status.title }}
              </el-tag>
            </div>
          </div>

          <!-- User details -->
          <div style="margin-left: 40px">
            <div style="font-size: 30px; font-weight: bold">
              {{ userData?.fullName }}
            </div>
            <div style="font-size: 20px; color: #7a7c7f">
              {{ userData?.department?.title }} Team
            </div>
            <div style="font-size: 12px; color: #7a7c7f; margin-bottom: 10px">
              {{ userData?.position?.title }}
            </div>
            <el-tag
              style="width: 80px; height: 30px; font-size: 15px; margin-left: 3px"
              :type="
                userData.role === 'ADMIN'
                  ? 'success'
                  : userData.role === 'MANAGER'
                  ? 'primary'
                  : 'info'
              "
              effect="dark"
            >
              {{ userData.role }}
            </el-tag>
          </div>
        </div>
        <!-- 122 - email, phone, userId, isActive -->
        <div style="width: 30%; margin-left: 30px">
          <ul>
            <li class="mb-5 text-sm">
              <div class="ml-5">
                <strong>Email:</strong
                ><span style="width: 300px; margin-left: 90px; color: #50c878">
                  <a href="#">{{ userData?.email }}</a>
                </span>
              </div>
            </li>
            <li class="mt-5 mr-10 text-sm">
              <div class="ml-5">
                <strong>Phone:</strong
                ><span style="width: 300px; margin-left: 85px; color: #50c878">
                  <a href="#">{{ userData?.phoneNumber }}</a>
                </span>
              </div>
            </li>
            <li class="mt-5 text-xs">
              <div class="ml-5">
                <strong>Employee ID:</strong
                ><span style="width: 300px; margin-left: 50px; color: #4f7942">
                  <a href="#">{{ userData?.idUser }}</a>
                </span>
              </div>
            </li>
            <li class="mt-5 text-xs">
              <el-tag
                style="width: 70px; height: 30px; font-size: 15px; margin-left: 1.25rem"
                :type="userData.isActive ? 'success' : 'danger'"
              >
                {{ userData.isActive ? 'Active' : 'Deactivated' }}
              </el-tag>
            </li>
          </ul>
        </div>
      </div>
    </el-card>

    <!-- 2 Showing Education and Skills -->
    <div style="display: flex; justify-content: space-around; margin-top: 40px">
      <!-- 21 Education -->
      <el-card style="width: 48%">
        <h3
          style="
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin-bottom: 20px;
          "
        >
          Education:
        </h3>
        <div>
          <el-timeline>
            <el-timeline-item
              v-for="(qualification, index) in userData?.qualifications"
              :key="index"
            >
              <li style="margin-top: 0px">
                <div style="font-weight: bold; font-size: 15px; margin-top: 5px; color: #333">
                  {{ qualification?.institute }}
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
      </el-card>
      <!-- 22 Skills -->
      <el-card style="width: 48%">
        <h3 style="font-size: 20px; margin-bottom: 20px">Skills:</h3>
        <div class="informationSkill flex-row items-center justify-start my-1">
          <el-row :gutter="10" style="margin-left: 20px">
            <el-col
              v-for="skill in selectProfile.skills"
              :key="skill.title"
              :span="6"
              style="display: flex; justify-content: space-between"
            >
              <el-button
                type="primary"
                plain
                style="
                  width: 100px;
                  margin-bottom: 10px;
                  font-size: 15px;
                  color: #fff;
                  background-color: #409eff;
                  border-color: #409eff;
                "
              >
                {{ skill.title }}
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <!-- 3 Dialog for Edit Profile, Skills and Education-->
    <el-dialog v-model="isDialogProfile" title="Edit Profile" width="700" draggable>
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

        <el-form-item v-if="userData.role === 'ADMIN'" label="Role" :label-width="formLabelWidth">
          <el-radio-group v-model="selectProfile.role" class="ml-4">
            <el-radio value="ADMIN" size="large">ADMIN</el-radio>
            <el-radio value="MANAGER" size="large">MANAGER</el-radio>
            <el-radio value="USER" size="large">USER</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="userData.role === 'ADMIN'"
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
            placeholder="Choose your position"
            style="width: 100%"
          >
            <el-option
              v-for="position in positionsOptions"
              :key="position.id"
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
            placeholder="Choose your position"
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
            placeholder="Choose your skills"
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

        <!-- 32 Dialog for Showing Education -->
        <div style="margin-left: 50px">
          <div class="flex justify-between align-top justify-items-start">
            <span>Education</span>
            <span>
              <el-button
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

    <!-- 4 Dialog for Edit Qualification -->
    <el-dialog
      v-model="isDialogQualification"
      :title="typeQualification === 'createQualification' ? 'Create Education' : 'Edit Education'"
    >
      <el-form :model="selectProfile.qualifications">
        <el-form-item label="Degree" :label-width="formLabelWidth">
          <el-input
            v-model="selectProfile.qualifications.title"
            placeholder="Please input your Degree"
            clearable
          />
        </el-form-item>
        <el-form-item label="Field of Study" :label-width="formLabelWidth">
          <el-input
            v-model="selectProfile.qualifications.field"
            placeholder="Please input your Field"
            clearable
          />
        </el-form-item>
        <el-form-item label="School" :label-width="formLabelWidth">
          <el-input
            v-model="selectProfile.qualifications.institute"
            placeholder="Please input your School"
            clearable
          />
        </el-form-item>
        <el-form-item label="Graduated Date" :label-width="formLabelWidth">
          <el-date-picker
            v-model="selectProfile.qualifications.dateObtained"
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

    <!-- 5 Dialog QR Code -->
    <el-dialog v-model="qrCodeDialogVisible" title="" width="300px">
      <div v-if="qrCodeData" style="text-align: center">
        <img :src="qrCodeData" alt="QR Code" class="qr-code-image" />
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button>
          <a :href="downloadLink" download="contact.vcf" class="download-link">Download vCard</a>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
  import { useAppOptionStore } from '../../../store/app/options'
  import { userProfileStore } from '../store'
  import { AUTH_CURRENT_USER } from '@/core/constants'
  import { onMounted, reactive, toRefs, watch } from 'vue';
  import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'
  import QRCode from 'qrcode'


  export default {
    name: 'UserProfile',
    setup() {
      const appOptionStore = useAppOptionStore()
      const userProfile = userProfileStore()
      const formLabelWidth = '120px'
      const state = reactive({
        userData: {},
        selectProfile: {
           id: '',
           fullName: '',
           email: '',
           phoneNumber: '',
           positionId: '',
           isActive: '',
           skillIds: [''],
           position: {
              value: '',
              label: '',
           },
          department: {
              value: '',
              label: '',
           },
          skills: {
              value: '',
              label: '',
           },
           status: {
              value: '',
              label: '',
           },
           qualifications: {
              id: '',
              title: '',
              field: '',
              institute: '',
              dateObtained: '',
           },
        },
        showStatusTitle: false,
        typeQualification: '',
        skillsOptions: {},
        positionsOptions: {},
        departmentsOptions: {},
        statusOptions:{},
        isDialogProfile: false,
        isDialogQualification: false,
        qrCodeDialogVisible: false,
        downloadLink: '',
        qrCodeData: '',
        vCardData: '',
      });
      const initializeUserData = async () => {
        try {
          state.userData = await userProfile.actGetMe()
          if (state.userData.status) {
            state.userData.status = {
              id: state.userData.status.id,
              title: state.userData.status.title,
              color: getStatusColor(state.userData.status.title),
            };
          } else {
            state.userData.status = {
              id: null,
              title: 'Unknown',
              color: getStatusColor('Unknown'),
            };
          }
          const skillsData = await userProfile.actGetSkills()//get all skills
          //We must map to value because V-model bind Data by Value of Ref/Reactive
          state.skillsOptions = skillsData.map(skill => ({
            value: skill.id,
            title: skill.title
          })) || {};
          const statusData = await userProfile.actGetStatus()//get all status
           state.statusOptions = statusData.map(status => ({
             value: status.id,
             title: status.title,
             color: getStatusColor(status.title)
           })) || {};
          const positionsData = await userProfile.actGetPositions()//get all positions
           state.positionsOptions = positionsData.map(position => ({
             value: position.id,
             title: position.title
           })) || {};
           const departmentsData = await userProfile.actGetDepartments()//get all departments
           state.departmentsOptions = departmentsData.map(department => ({
             value: department.id,
             title: department.title
           })) || {};

          state.selectProfile = {
            id: state.userData.idUser,
            email: state.userData.email,
            fullName: state.userData.fullName,
            phoneNumber: state.userData.phoneNumber,
            position: state.userData.position ? {
              value: state.userData.position.id,
              title: state.userData.position.title,
             } : {},
            department: state.userData.department ? {
              value: state.userData.department.id,
              title: state.userData.department.title,
             } : {},
            skills: state.userData.skills.map(skill => ({
              value: skill.id,
              title: skill.title,
            })),
            status: state.userData.status ? {
              value: state.userData.status.id,
              title: state.userData.status.title,
              color: getStatusColor(state.userData.status.title)
             } : {},

            isActive: state.userData.isActive,
            qualifications: state.userData.qualifications.map(qualification => ({
              id: qualification.id,
              title: qualification.title,
              field: qualification.field,
              institute: qualification.institute,
              dateObtained: qualification.dateObtained,
            })),
            role: state.userData.role,
          };
          await getVcardApi(); // Fetch vCard data after user data is loaded

        } catch (error) {
          console.error('Failed to initialize user data:', error);
        }
       };
      //Formatting Data for Showing
      const getStatusColor = (title) => {
        const statusColorMap = {
          'Online': '#32CD32',
          'Busy': '#FF6600',
          'Away': '#FFDE0A',
          'Do Not Disturb': '#E63415',
          'Offline': '#14CCCC',
          'In a Meeting': '#6222C9'
        };
      return statusColorMap[title] || '#000000';
      };
      const formatDate = (dateString) => {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, '0');
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const month = monthNames[date.getMonth()];
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
      };
      //Managing Dialog
      const cancelDialog = async () => {
        await initializeUserData();
        state.isDialogProfile = true;
        state.isDialogQualification = false;
      };
      //Generating QR Code
      const generateQRCode = () => {
        QRCode.toDataURL(state.vCardData.trim(), { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) {
            console.error('Error generating QR Code:', err);
            return;
          }
          state.qrCodeData = url;
        });
      };
      const getVcardApi = async () => {
        try {
          const response = await userProfile.actGetVcardById(state.userData.idUser)
          state.vCardData = response.data
          generateQRCode()
          state.downloadLink = `data:text/vcard;charset=utf-8,${encodeURIComponent(
            state.vCardData,
          )}`
        } catch (error) {
          console.error('Error fetching Vcard Data:', error)
        }
      }
      //4 Functions for Edit, Create, Delete Qualification
      const editQualification = (qualificationId) => {
        //console.log("editQualification 1: state.userData.qualifications = ",state.userData.qualifications)
        const qualification = state.userData.qualifications.find(q => q.id === qualificationId);
        console.log("editQualification 2: qualification = ", qualification)
        if (!qualification) {
          throw new Error(`No qualification found with ID: ${qualificationId}`);
        }
        state.selectProfile.qualifications = qualification ? {
          id: qualification.id,
          title: qualification.title,
          field: qualification.field,
          institute: qualification.institute,
          dateObtained: qualification.dateObtained
        } : null;
        console.log("editQualification 3: state.selectProfile.qualifications = ", state.selectProfile.qualifications)
        state.isDialogProfile = false;
        state.isDialogQualification = true;
      };
      const addQualification = async () => {
        state.selectProfile.qualifications = {
          title: '',
          field: '',
          institute: '',
          dateObtained: '',
        };
        state.typeQualification = "createQualification";
        state.isDialogProfile = false;
        state.isDialogQualification = true;
      };
      const saveQualification = async () => {
        try {
          // If the qualification has changed, update it
          if (state.typeQualification === "createQualification") {
            if (!state.selectProfile.qualifications.title || !state.selectProfile.qualifications.field || !state.selectProfile.qualifications.institute || !state.selectProfile.qualifications.dateObtained) {
              ElNotification({
                title: 'Error',
                message: 'You need to fill all fields!',
                type: 'error',
              })
            }
           await userProfile.actCreateQualification(state.selectProfile.qualifications);
           ElNotification({
            title: 'Success',
            message: 'Your qualification is CREATED successfully!',
            type: 'success',
          })
           state.typeQualification = "";//reset to empty
          } else {
           await userProfile.actUpdateQualifications(state.selectProfile.qualifications);
            ElNotification({
              title: 'Success',
              message: 'Your qualification is UPDATED successfully!',
              type: 'success',
            })
          }
          state.typeQualification = "";
          //update data at dialog after updating qualification.
          await initializeUserData();
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
          // Remove the deleted qualification from the list
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          });
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
      //Updating the Profile
      const updateProfile = async () => {
        try {
          console.log ('before update state.selectProfile 1', state.selectProfile)
          state.selectProfile.skillIds = state.selectProfile.skills.map(skill => skill.value);
          delete state.selectProfile.skills;
          state.selectProfile.statusId = state.selectProfile.status.value;
          delete state.selectProfile.status; //delete property status before update the profile
          state.selectProfile.positionId = state.selectProfile.position.value;
          delete state.selectProfile.position; //delete property position before update the profile
          state.selectProfile.departmentId = state.selectProfile.department.value;
          delete state.selectProfile.department; //delete property department before update the profile
          delete state.selectProfile.qualifications; //delete property qualifications before update the profile
          console.log ('before update state.selectProfile 2', state.selectProfile)
          const editUserData = await userProfile.actUpdateProfile(state.selectProfile)
          localStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(editUserData))
          appOptionStore.setUser(editUserData)
          await initializeUserData();
          state.isDialogProfile = false // Close the dialog
        } catch (error) {
          console.error('Failed to update profile:', error)
        }
      };

      onMounted(async () => {
        initializeUserData();
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
        generateQRCode,
        formatDate,
      }
    }
  }
</script>

<style scoped>
  .qr-code-image {
    display: block;
    margin: 0 auto;
  }
</style>
