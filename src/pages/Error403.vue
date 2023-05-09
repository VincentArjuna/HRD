<script setup lang="ts">
import errorIllustration from "../assets/images/403-Error-Forbidden.svg";
import Button from "../base-components/Button";
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.back();
}
</script>

<template>
    <div class="py-2">
        <div class="container">
            <!-- BEGIN: Error Page -->
            <div class="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
                <div class="-intro-x lg:mr-20">
                    <img alt="Midone Tailwind HTML Admin Template" class="w-[450px] h-48 lg:h-auto"
                        :src="errorIllustration" />
                </div>
                <div class="mt-10 text-white lg:mt-0">
                    <div class="font-medium intro-x text-8xl">403</div>
                    <div class="mt-5 text-xl font-medium intro-x lg:text-3xl">
                        Oops. Looks like you don't have the permission.
                    </div>
                    <div class="mt-3 text-lg intro-x">
                        Please contact your administrator.
                    </div>
                    <Button @click="goBack"
                        class="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200">
                        Go Back
                    </Button>
                </div>
            </div>
            <!-- END: Error Page -->
        </div>
    </div>
</template>
