<template>
  <section class="gradient-form flex items-center justify-center h-screen">
    <div class="container">
      <div
        class="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200"
      >
        <div class="w-3/4 rounded-full">
          <div class="rounded-full">
            <div class="rounded-full g-0 lg:flex lg:flex-wrap shadow-2xl shadow-blue-200">
              <!-- Left column container-->
              <div class="px-4 md:px-0 lg:w-6/12">
                <div class="fullscreen-bg">
                  <el-card
                    class="expanded-card LTV-Card"
                    style="border-top-left-radius: 20px; border-bottom-left-radius: 20px"
                    shadow="hover"
                  >
                    <div class="logo-container flex flex-row">
                      <img src="@/assets/images/logoltv.png" alt="LTV" class="LTV" />
                      <span class="mt-6 font-bold text-xl">LTV</span>
                    </div>
                    <div class="p-8">
                      <h1 class="text-2xl font-bold mb-3 text-center">WELCOME TO LTV</h1>
                      <p class="text-gray-400 mb-6 text-center">Lovers technology</p>
                      <el-form ref="form" :model="form" size="default">
                        <el-form-item>
                          <el-button
                            type="danger"
                            class="w-3/4 rounded-full mx-auto custom-button text-white bg-red-500 google-button"
                            @click="loginWithGoogle"
                          >
                            <img
                              src="@/assets/images/google.svg"
                              alt="Google Icon"
                              class="w-4 h-5 inline mr-2"
                              style="filter: brightness(0) invert(1)"
                            />
                            Google
                          </el-button>
                        </el-form-item>
                        <p class="text-blue mb-6 text-center text-blue-500">Continue as Guest</p>
                        <p class="text-blue mb-6 text-center">
                          By registration you agree to
                          <span class="text-blue-500">Terms of Use</span> and
                          <span class="text-blue-500">Privacy Policy</span>
                        </p>
                      </el-form>
                    </div>
                  </el-card>
                </div>
              </div>

              <!-- Right column container with background and description-->
              <div
                class="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none shadow-blue-200 gradient-background"
              >
                <img src="@/assets/images/background.svg" class="animated-image" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
  import firebaseConfig from '@/utils/firebase'
  import { AutService } from '../services'
  import { useAppOptionStore } from '../../../store/app/options'
  import { AUTH_CURRENT_USER, AUTH_TOKEN } from '@/core/constants'
  import router from '@/router'
  firebaseConfig
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const postToken = new AutService()
  export default {
    name: 'LoginPage',
    data() {
      return {
        accessToken: null,
        form: {},
      }
    },
    methods: {
      async loginWithGoogle() {
        try {
          const result = await signInWithPopup(auth, provider)
          this.accessToken = result.user.accessToken
          localStorage.setItem(AUTH_TOKEN, this.accessToken)
          const userData = await postToken.loginWithGoogle(this.accessToken)
          if (userData) {
            const appOption = useAppOptionStore()
            localStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(userData))
            appOption.setUser()
            router.push('/user-list')
          }
        } catch (error) {
          console.error('Failed to login with Google:', error)
        }
      },
    }
  }
</script>

<style>
  .google-button {
    border-radius: 20px;
  }

  @keyframes moveImage {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateX(-10px);
    }

    100% {
      transform: translateY(-20px);
    }
  }

  .animated-image:hover {
    animation: moveImage 1s ease infinite alternate;
  }

  .gradient-background {
    background: linear-gradient(to right, aliceblue, aliceblue, aliceblue, aliceblue);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .animated-image {
    width: 70%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
