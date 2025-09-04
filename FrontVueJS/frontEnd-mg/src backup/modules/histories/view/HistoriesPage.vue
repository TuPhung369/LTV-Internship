<template>
  <div>
    <el-container>
      <el-header style="font-weight: 700">
        Current:
        <el-tag v-if="currentHistory" type="success" effect="plain">{{ currentHistory }}</el-tag>
      </el-header>
      <el-main>
        <div style="display: flex; justify-content: flex-end; margin-right: 40px">
          <el-button type="primary" plain @click="openCreateDialog">
            <el-icon style="font-size: 20px">
              <CirclePlus />
            </el-icon>
            <span style="margin-left: 10px"> Create </span>
          </el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="position.title"
            label="Position"
            label-class-name="custom-label-padding"
          >
            <template #default="{ row }">
              <el-tag type="primary" style="margin: 0 40px" effect="plain">{{
                row.position.title
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="department.title" label="Department">
            <template #default="{ row }">
              <span>{{ row.department.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Time Line">
            <template #default="{ row }">
              <el-date-picker
                v-model="row.daterange"
                disabled
                type="daterange"
                unlink-panels
                range-separator="To"
                start-placeholder="Start Date"
                end-placeholder="End Date"
                :shortcuts="shortcuts"
                size="large"
              />
            </template>
          </el-table-column>

          <el-table-column label="">
            <template #default="{ row }">
              <div style="display: flex; justify-content: flex-end; margin-right: 40px">
                <el-button plain @click="openEditDialog(row)"> Edit </el-button>
                <el-button type="danger" size="small" plain @click="deleteHistory(row.id)">
                  Delete
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog
      v-model="dialogVisible"
      :title="isEditMode ? 'Edit History' : 'Create History'"
      width="500"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="Position">
          <el-select v-model="form.positionId" placeholder="Select Position">
            <el-option
              v-for="item in positions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Department">
          <el-select v-model="form.departmentId" placeholder="Select Department">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Start Date">
          <el-date-picker v-model="form.daterange[0]" type="date" placeholder="Start Date" />
        </el-form-item>
        <el-form-item label="End Date">
          <el-date-picker v-model="form.daterange[1]" type="date" placeholder="End Date" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button plain @click="dialogVisible = false">Cancel</el-button>
          <el-button plain type="primary" @click="saveChanges">{{
            isEditMode ? 'Confirm' : 'Create'
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { HistoriesService } from '../services'
  import { PositionsService } from '@/modules/position/services'
  import { DepartmentServices } from '@/modules/department/services'

  export default defineComponent({
    name: 'HistoriesPage',
    setup() {
      const dialogVisible = ref(false)
      const isEditMode = ref(false)
      const tableData = ref([])
      const shortcuts = ref([])
      const currentHistory = ref(null)
      const form = ref({
        id: null,
        positionId: null,
        departmentId: null,
        daterange: [],
      })

      const positions = ref([])
      const departments = ref([])
      const getPositionsService = new PositionsService()
      const getDepartmentService = new DepartmentServices()
      const historiesService = new HistoriesService()

      const openCreateDialog = () => {
        isEditMode.value = false
        form.value = {
          id: null,
          positionId: null,
          departmentId: null,
          daterange: [],
        }
        dialogVisible.value = true
      }

      const openEditDialog = (row) => {
        isEditMode.value = true
        form.value = {
          id: row.id,
          positionId: row.position.id,
          departmentId: row.department.id,
          daterange: row.endDate
            ? [new Date(row.startDate), new Date(row.endDate)]
            : [new Date(row.startDate)],
        }
        dialogVisible.value = true
      }

      const handleClose = (done) => {
        ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            console.log('close')
            done()
          })
          .catch(() => {
            console.log('cancel')
          })
      }

      const saveChanges = async () => {
        const updatedData = {
          positionId: form.value.positionId,
          departmentId: form.value.departmentId,
          startDate: form.value.daterange[0] ? form.value.daterange[0].toISOString() : null,
          endDate: form.value.daterange[1] ? form.value.daterange[1].toISOString() : null,
        }

        if (isEditMode.value) {
          // Update existing history
          try {
            await historiesService.updateHistory(form.value.id, updatedData)
            ElMessage({
              message: 'Updated successfully',
              type: 'success',
              plain: true,
            })
          } catch (error) {
            ElMessage({
              message: 'Failed to update',
              type: 'error',
              plain: true,
            })
          }
        } else {
          // Create new history
          try {
            await historiesService.createHistory(updatedData)
            ElMessage({
              message: 'Created successfully',
              type: 'success',
              plain: true,
            })
          } catch (error) {
            ElMessage({
              message: 'Failed to create',
              type: 'error',
              plain: true,
            })
          }
        }
        fetchHistories()
        dialogVisible.value = false
      }

      const deleteHistory = async (id) => {
        ElMessageBox.confirm('Are you sure you want to delete this record?')
          .then(async () => {
            try {
              await historiesService.deleteHistory(id)
              ElMessage({
                message: 'Deleted successfully',
                type: 'success',
                plain: true,
              })
              fetchHistories()
            } catch (error) {
              ElMessage({
                message: 'Failed to delete',
                type: 'error',
                plain: true,
              })
            }
          })
          .catch(() => {
            console.log('Delete cancelled')
          })
      }

      const fetchHistories = async () => {
        const getHistories = await historiesService.getHistories()
        const getCurrentHistory = await historiesService.getCurrentHistory()
        currentHistory.value = getCurrentHistory[0]?.position?.title
        tableData.value = getHistories.map((item) => ({
          ...item,
          daterange: item.endDate
            ? [new Date(item.startDate), new Date(item.endDate)]
            : [new Date(item.startDate)],
        }))
      }

      const fetchData = async () => {
        positions.value = await getPositionsService.getPosition()
        departments.value = await getDepartmentService.getDepartment()
      }

      onMounted(() => {
        fetchHistories()
        fetchData()
      })

      return {
        dialogVisible,
        isEditMode,
        tableData,
        shortcuts,
        form,
        currentHistory,
        positions,
        departments,
        openCreateDialog,
        openEditDialog,
        handleClose,
        saveChanges,
        deleteHistory,
      }
    },
  })
</script>

<style scoped>
  .dialog-footer {
    text-align: right;
  }

  :deep(th.custom-label-padding .cell) {
    padding-left: 40px;
  }
</style>
