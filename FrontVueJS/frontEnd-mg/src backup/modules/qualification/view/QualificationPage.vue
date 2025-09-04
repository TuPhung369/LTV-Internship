<template>
  <div>
    <el-button type="primary" size="small" plain @click="openCreateDialog()"
      ><el-icon> <CirclePlus /> </el-icon
    ></el-button>

    <el-table :data="tableData" stripe>
      <el-table-column prop="title" label="Title" label-class-name="custom-label-padding">
        <template #default="{ row }">
          <span style="padding: 0 40px">{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="field" label="Field" />
      <el-table-column prop="institute" label="Institute" />
      <el-table-column prop="dateObtained" label="Date Obtained">
        <template #default="{ row }">
          <el-date-picker
            v-model="row.dateObtained"
            disabled
            unlink-panels
            end-placeholder="End Date"
            size="large"
          />
        </template>
      </el-table-column>

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
    <el-dialog v-model="editDialogVisible" title="Edit Qualification" width="500px">
      <el-form :model="editForm">
        <el-form-item>
          <el-input v-model="editForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="editForm.field" placeholder="field"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="editForm.institute" placeholder="institute"></el-input>
        </el-form-item>
        <el-form-item label="Start Date">
          <el-date-picker v-model="editForm.dateObtained" type="date" placeholder="Start Date" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button plain @click="editDialogVisible = false">Cancel</el-button>
        <el-button plain type="primary" @click="handleEdit">Save</el-button>
      </template>
    </el-dialog>

    <!-- Delete Dialog -->
    <el-dialog v-model="deleteDialogVisible" title="Delete Qualification" width="500px">
      <span>Are you sure you want to delete this Qualification?</span>
      <template #footer>
        <el-button plain @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button plain type="danger" @click="handleDelete">Delete</el-button>
      </template>
    </el-dialog>
    <!-- Create Dialog -->
    <el-dialog v-model="createDialogVisible" title="Create Qualification" width="500px">
      <el-form :model="createForm">
        <el-form-item>
          <el-input v-model="createForm.title" placeholder="Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="createForm.field" placeholder="Field"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="createForm.institute" placeholder="Institute"></el-input>
        </el-form-item>
        <el-form-item label="End Date">
          <el-date-picker v-model="createForm.dateObtained" type="date" placeholder="Start Date" />
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
  import { defineComponent, onMounted, ref } from 'vue'
  import { qualificationServices } from '../services'
  import { ElMessage } from 'element-plus'
  export default defineComponent({
    name: 'QualificationPage',
    // Your component's JavaScript logic goes here
    setup() {
      const tableData = ref([])
      const editDialogVisible = ref(false)
      const createDialogVisible = ref(false)
      const deleteDialogVisible = ref(false)
      const editForm = ref({
        title: '',
        field: '',
        institute: '',
        dateObtained: '',
      })
      const createForm = ref({
        title: '',
        field: '',
        institute: '',
        dateObtained: '',
      })
      const selectedRow = ref(null)
      const getQualificationService = new qualificationServices()
      const fetchDataPositions = async () => {
        try {
          const response = await getQualificationService.getQualification()
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
          await getQualificationService.updateQualification(editForm.value.id, editForm.value)
          await fetchDataPositions()
          editDialogVisible.value = false
          ElMessage.success('Qualification updated successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to update Qualification')
        }
      }
      const handleCreate = async () => {
        try {
          await getQualificationService.createQualification(createForm.value)
          createDialogVisible.value = false
          await fetchDataPositions()
          ElMessage.success('Qualification created successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to create Qualification')
        }
      }
      const handleDelete = async () => {
        try {
          await getQualificationService.deleteQualification(selectedRow.value.id)
          await fetchDataPositions()
          deleteDialogVisible.value = false
          ElMessage.success('Qualification deleted successfully')
        } catch (error) {
          console.error(error)
          ElMessage.error('Failed to delete Qualification')
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
  })
</script>

<style scoped>
  /* Your component's CSS styles go here */
  :deep(th.custom-label-padding .cell) {
    padding-left: 40px;
  }
</style>
