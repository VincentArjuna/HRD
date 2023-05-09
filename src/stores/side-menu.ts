import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

export const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => ({
    menu: [
      {
        icon: "Activity",
        pageName: "Dashboard",
        title: "Dashboard",
      },
      {
        icon: "ClipboardType",
        pageName: "#",
        title: "Forms",
        subMenu: [
          {
            icon: "List",
            pageName: "Forms",
            title: "List",
          },
          {
            icon: "HeartHandshake",
            pageName: "FormRelations",
            title: "Form Relations",
          },
        ],
      },
      {
        icon: "LayoutList",
        pageName: "Records",
        title: "Records",
      },
      // {
      //   icon: "Mails",
      //   pageName: "#",
      //   title: "Letters",
      //   subMenu: [
      //     {
      //       icon: "List",
      //       pageName: "LetterList",
      //       title: "List",
      //     },
      //   ],
      // },
    ],
  }),
});
