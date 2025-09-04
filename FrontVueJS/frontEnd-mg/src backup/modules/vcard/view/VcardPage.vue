<template>
  <el-container>
    <el-main>
      <el-card style="border-radius: 20px; padding: 20px">
        <div
          style="
            width: 100%;
            font-size: 25px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            src="@/assets/images/logoltv.png"
            alt="LTV"
            style="width: 40px; height: auto"
            class="LTV"
          />V-Card
        </div>
        <div class="flex-container">
          <div class="qr-code-container">
            <el-card>
              <div v-if="qrCodeData">
                <img
                  style="width: 400px; height: auto"
                  :src="qrCodeData"
                  alt="QR Code"
                  class="qr-code-image"
                />
              </div>
              <h1
                style="
                  width: 100%;
                  font-size: 15px;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                Scan Me
              </h1>
            </el-card>
          </div>
          <div class="info-container">
            <h2 v-if="email" class="info-item">
              <span class="item-text">Email: </span>{{ email }}
            </h2>
            <h2 v-if="phoneNumber" class="info-item">
              <span class="item-text">Phone Number: </span>{{ phoneNumber }}
            </h2>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px">
          <el-button>
            <a :href="downloadLink" download="contact.vcf" class="download-link">Download vCard</a>
          </el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import QRCode from 'qrcode'
  import { VcardSevices } from '../services'

  export default {
    name: 'VcardPage',
    setup() {
      const qrCodeData = ref(null)
      const vCardData = ref('')
      const getVcardService = new VcardSevices()
      const email = ref('')
      const phoneNumber = ref('')
      const downloadLink = ref('')

      const generateQRCode = () => {
        QRCode.toDataURL(vCardData.value.trim(), { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) {
            console.error('Error generating QR Code:', err)
            return
          }
          qrCodeData.value = url
        })
      }

      const parseVCardData = (vCardData) => {
        const lines = vCardData.split('\r\n')
        lines.forEach((line) => {
          const [key, value] = line.split(':')
          if (key && value) {
            if (key === 'EMAIL;INTERNET;WORK') {
              email.value = value
            } else if (key === 'TEL;CELL') {
              phoneNumber.value = value
            }
          }
        })
      }

      const getVcardApi = async () => {
        try {
          const response = await getVcardService.getVcard()
          vCardData.value = response.data
          parseVCardData(vCardData.value)
          generateQRCode()
          downloadLink.value = `data:text/vcard;charset=utf-8,${encodeURIComponent(
            vCardData.value,
          )}`
        } catch (error) {
          console.error('Error fetching Vcard Data:', error)
        }
      }

      onMounted(() => {
        getVcardApi()
      })

      return {
        qrCodeData,
        email,
        phoneNumber,
        downloadLink,
      }
    },
  }
</script>

<style scoped>
  .el-main {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-card {
    width: 70%;
    border-radius: 20px;
  }

  .flex-container {
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
  }

  .qr-code-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .qr-code-image {
    width: 200px;
    height: auto;
    margin-top: 0;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 40px;
  }

  .info-item {
    margin-left: 0;
  }

  .item-text {
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
      Geneva, Verdana, sans-serif;
  }

  .download-link {
    text-decoration: none;
    color: #409eff;
    font-size: 16px;
    cursor: pointer;
  }

  .download-link:hover {
    text-decoration: underline;
  }
</style>
