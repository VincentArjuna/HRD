<script setup lang="ts">
import logoUrl from "../../assets/images/logo.svg";
import illustrationUrl from "../../assets/images/financial-illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { useRouter } from "vue-router";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import { ref } from "vue";
import { API } from "../../api/api";


interface LoginUser {
  email: string;
  password: string;
}

const user: LoginUser = {
  email: "",
  password: "",
};

const router = useRouter();
const errorMsg = ref('');
/**
 * Login User
 */
const loginUser = async () => {
  const login = await API.adminLogin(user.email, user.password);
  if (login) {
    if (login.status == 200) {
      router.push({ name: "Dashboard" });
    } else {
      errorMsg.value = login.message;
    }
  } else {
    errorMsg.value = "Something went wrong!";
  }
};

const dismissNClear = () => {
  errorMsg.value = '';
}

</script>

<template>
  <div :class="[
    '-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
    'before:hidden before:xl:block before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
    'after:hidden after:xl:block after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
  ]">
    <div class="container relative z-10 sm:px-10">
      <div class="block grid-cols-2 gap-4 xl:grid">
        <!-- BEGIN: Login Info -->
        <div class="flex-col hidden min-h-screen xl:flex">
          <a href="" class="flex items-center pt-5 -intro-x">
            <img alt="Midone Tailwind HTML Admin Template" class="w-6" :src="logoUrl" />
            <span class="ml-3 text-lg text-white"> Aptaworks </span>
          </a>
          <div class="my-auto">
            <img alt="Midone Tailwind HTML Admin Template" class="w-1/2 -mt-16 -intro-x" :src="illustrationUrl" />
            <div class="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
              Manage all your company's data in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
          <div
            class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
            <h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
              Sign In
            </h2>
            <div class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
              <Alert v-if="errorMsg" variant="danger" dismissible
                class="w-full col-span-11 mb-2 intro-y box dark:border-darkmode-600" v-slot="{ dismiss }">
                <div class="flex items-center">
                  <span>
                    <Lucide icon="Info" class="w-4 h-4 mr-2" />
                  </span>
                  <span>
                    {{ errorMsg }}
                  </span>
                  <Alert.DismissButton class="text-white" @click="dismissNClear" aria-label="Close">
                    <Lucide icon="X" class="w-4 h-4" />
                  </Alert.DismissButton>
                </div>
              </Alert>
            </div>
            <div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
              A few more clicks to sign in to your account.
            </div>
            <form @submit.prevent="loginUser">
              <div class="mt-8 intro-x">
                <FormInput v-model="user.email" type="text"
                  class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]" placeholder="Email" />
                <FormInput v-model="user.password" type="password"
                  class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]" placeholder="Password" />
              </div>
              <div class="mt-5 text-center intro-x xl:text-left">
                <Button variant="primary" class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3">
                  Login
                </Button>
                <RouterLink :to="{ name: 'Register' }">
                  <Button variant="outline-secondary" class="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0">
                    Register
                  </Button>
                </RouterLink>
              </div>
            </form>
            <div class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href="">
                Terms and Conditions
              </a>
              &
              <a class="text-primary dark:text-slate-200" href="">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>
