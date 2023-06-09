import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface TopMenuState {
  menu: Array<Menu>;
}

export const useTopMenuStore = defineStore("topMenu", {
  state: (): TopMenuState => ({
    menu: [
      {
        icon: "Home",
        pageName: "Dashboard",
        title: "Dashboard",
      },
      {
        icon: "Users",
        pageName: "EmployeeIndex",
        title: "Employee",
      },
    ],
  }),
});
