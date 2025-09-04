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

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="Department" label-class-name="custom-label-padding">
        <template #default="{ row }">
          <span style="padding: 0 40px">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="Description" />
      <el-table-column label="" width="180">
        <template #default="{ row }">
          <el-button plain type="primary" size="small" @click="openEditDialog(row)">Edit</el-button>
          <el-button plain type="danger" size="small" @click="openDeleteDialog(row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- Edit Dialog -->
    <el-dialog v-model="editDialogVisible" title="Edit Department" width="500px">
      <el-form :model="editForm">
        <el-form-item>
          <el-input v-model="editForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="editForm.description"
            type="textarea"
            placeholder="Description"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain @click="editDialogVisible = false">Cancel</el-button>
        <el-button plain type="primary" @click="handleEdit">Save</el-button>
      </template>
    </el-dialog>

    <!-- Delete Dialog -->
    <el-dialog v-model="deleteDialogVisible" title="Delete Department" width="500px">
      <span>Are you sure you want to delete this Department?</span>
      <template #footer>
        <el-button plain @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button plain type="danger" @click="handleDelete">Delete</el-button>
      </template>
    </el-dialog>
    <!-- Create Dialog -->
    <el-dialog v-model="createDialogVisible" title="Create Department" width="500px">
      <el-form :model="createForm">
        <el-form-item>
          <el-input v-model="createForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="createForm.description"
            type="textarea"
            placeholder="Description"
          ></el-input>
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
  import {  onMounted, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { DepartmentServices } from '../services'
  export default {
    name: 'DepartmentPage',
    setup() {
      const tableData = ref([])
      const editDialogVisible = ref(false)
      const createDialogVisible = ref(false)
      const deleteDialogVisible = ref(false)
      const editForm = ref({
        id: '',
        title: '',
        description: '',
      })
      const createForm = ref({
        title: '',
        description: '',
      })
      const selectedRow = ref(null)
      const getPositionService = new DepartmentServices()
      const fetchDataPositions = async () => {
        try {
          const response = await getPositionService.getDepartment()
          tableData.value = response
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
          await getPositionService.updateDepartment(editForm.value.id, editForm.value)
          await fetchDataPositions()
          editDialogVisible.value = false
          ElMessage.success('Department updated successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to update Department')
        }
      }
      const handleCreate = async () => {
        try {
          await getPositionService.createDepartment(createForm.value)
          createDialogVisible.value = false
          await fetchDataPositions()
          ElMessage.success('Department created successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to create Department')
        }
      }
      const handleDelete = async () => {
        try {
          await getPositionService.deleteDepartment(selectedRow.value.id)
          await fetchDataPositions()
          deleteDialogVisible.value = false
          ElMessage.success('Department deleted successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to delete Department')
        }
      }

      onMounted(() => {
        fetchDataPositions()
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
      }
    },
  }
</script>

<style scoped>
  /* Your component's CSS styles go here */
  :deep(th.custom-label-padding .cell) {
    padding-left: 40px;
  }
</style>
