<script setup lang="ts">
import { ref } from "vue";
import Lucide from "../../base-components/Lucide";
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import fakerData from "../../utils/faker";
import _, { lastIndexOf } from "lodash";
import { TransitionRoot } from "@headlessui/vue";
import { useRouter } from "vue-router";
import { useBreadcrumbStore } from "../../stores/breadcrumb";

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const logout = async () => {

}
const router = useRouter();

/**
 * Breadcrumb
 */
const breadcrumbState = useBreadcrumbStore();
</script>

<template>
  <!-- BEGIN: Top Bar -->
  <div class="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
    <!-- BEGIN: Breadcrumb -->
    <Breadcrumb class="hidden mr-auto -intro-x sm:flex" v-if="breadcrumbState.getBreadcrumb">
      <div v-for="(bc, index) in breadcrumbState.getBreadcrumb" :key="index">
        <Breadcrumb.Link :active="bc.active" v-if="bc.active" to="#">
          {{ bc.display_name }}
          <span v-if="index !== breadcrumbState.getBreadcrumb.length - 1">&emsp;>&emsp;</span>
        </Breadcrumb.Link>
        <Breadcrumb.Link v-else :active="bc.active" :to="{ name: bc.route_name }">
          {{ bc.display_name }}
          <span v-if="index !== breadcrumbState.getBreadcrumb.length - 1">&emsp;>&emsp;</span>
        </Breadcrumb.Link>
      </div>
    </Breadcrumb>
    <!-- END: Breadcrumb -->

    <Menu class="ml-auto">
      <Menu.Button class="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
        <img alt="Profile Picture" :src="fakerData[9].photos[0]" />
      </Menu.Button>
      <Menu.Items class="w-56 mt-px text-white bg-primary">
        <Menu.Header class="font-normal">
          <div class="font-medium">Test</div>
          <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
            Test
          </div>
        </Menu.Header>
        <Menu.Divider class="bg-white/[0.08]" />
        <Menu.Item @click="logout" class="hover:bg-white/5">
          <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  </div>
  <!-- END: Top Bar -->
</template>
