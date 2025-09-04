<template>
  <div>
    <div style="display: flex; justify-content: flex-end; margin-right: 40px">
      <el-button type="primary" plain @click="openCreateDialog">
        <el-icon style="font-size: 20px">
          <CirclePlus />
        </el-icon>
        <span style="margin-left: 10px"> Create </span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="title" label="Title" label-class-name="custom-label-padding">
        <template #default="{ row }">
          <span style="padding: 0 40px">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="content" label="Content" />
      <el-table-column label="">
        <template #default="{ row }">
          <div style="display: flex; justify-content: flex-end; margin-right: 40px">
            <el-button plain type="primary" size="small" @click="openEditDialog(row)"
              >Edit</el-button
            >
            <el-button plain type="danger" size="small" @click="openDeleteDialog(row)"
              >Delete</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- Edit Dialog -->

    <el-dialog v-model="editDialogVisible" title="Edit Notification" width="500px">
      <el-form :model="editForm">
        <el-form-item>
          <el-input v-model="editForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="editForm.content" type="textarea" placeholder="content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="editForm.userIds" multiple placeholder="Select Users">
            <el-option
              v-for="user in users"
              :key="user.idUser"
              :label="user.email"
              :value="user.idUser"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain @click="editDialogVisible = false">Cancel</el-button>
        <el-button plain type="primary" @click="handleEdit">Save</el-button>
      </template>
    </el-dialog>

    <!-- Delete Dialog -->

    <el-dialog v-model="deleteDialogVisible" title="Delete Notification" width="500px">
      <span>Are you sure you want to delete this Notification?</span>

      <template #footer>
        <el-button plain @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button plain type="danger" @click="handleDelete">Delete</el-button>
      </template>
    </el-dialog>

    <!-- Create Dialog -->

    <el-dialog v-model="createDialogVisible" title="Create Notification" width="500px">
      <el-form :model="createForm">
        <el-form-item>
          <el-input v-model="createForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="createForm.content" type="textarea" placeholder="Content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="createForm.userIds" multiple placeholder="Select Users">
            <el-option
              v-for="user in users"
              :key="user.idUser"
              :label="user.email"
              :value="user.idUser"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain @click="createDialogVisible = false">Cancel</el-button>
        <el-button plain type="primary" @click="handleCreate">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { CirclePlus } from '@element-plus/icons-vue'
  import { ActivitiesServices } from '../services'
  import { ProfileService } from '@/modules/userList/services'

  export default {
    name: 'ActivitiesPage',
    components: {
      CirclePlus,
    },
    setup() {
      const tableData = ref([])
      const editDialogVisible = ref(false)
      const createDialogVisible = ref(false)
      const deleteDialogVisible = ref(false)
      const editForm = ref({
        title: '',
        content: '',
      })
      const createForm = ref({
        title: '',
        content: '',
        userIds: [],
      })
      const selectedRow = ref(null)
      const users = ref([])
      const getActivitiesService = new ActivitiesServices()
      const getUserService = new ProfileService()
      const fetchDataNotify = async () => {
        try {
          const response = await getActivitiesService.getNotification()
          console.log(response)
          tableData.value = response
        } catch (error) {
          console.error(error)
        }
      }

      const fetchUsers = async () => {
        try {
          // Fetch users from the service
          const response = await getUserService.getUserList()
          users.value = response
        } catch (error) {
          console.error(error)
        }
      }

      const openEditDialog = (row) => {
        editForm.value = { ...row }
        editDialogVisible.value = true
      }
      const openCreateDialog = () => {
        createDialogVisible.value = true
      }

      const openDeleteDialog = (row) => {
        selectedRow.value = row
        deleteDialogVisible.value = true
      }

      const handleEdit = async () => {
        try {
          await getActivitiesService.updateNotifiCation(editForm.value.id, editForm.value)
          await fetchDataNotify()
          editDialogVisible.value = false
          ElMessage.success('Notification updated successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to update Notification')
        }
      }
      const handleCreate = async () => {
        try {
          await getActivitiesService.sendNotificationForUser(createForm.value)
          createDialogVisible.value = false
          await fetchDataNotify()

          ElMessage.success('Notification created successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to create Notification')
        }
      }
      const handleDelete = async () => {
        try {
          await getActivitiesService.deleteNotification(selectedRow.value.id)
          await fetchDataNotify()
          deleteDialogVisible.value = false

          ElMessage.success('Notification deleted successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to delete Notification')
        }
      }

      onMounted(() => {
        fetchDataNotify()
        fetchUsers()
      })

      return {
        tableData,
        editDialogVisible,
        deleteDialogVisible,
        createDialogVisible,
        editForm,
        createForm,
        selectedRow,
        openEditDialog,
        openDeleteDialog,
        handleEdit,
        handleDelete,
        openCreateDialog,
        handleCreate,
        users,
      }
    },
  }
</script>

<style scoped>
  :deep(th.custom-label-padding .cell) {
    padding-left: 40px;
  }
</style>
