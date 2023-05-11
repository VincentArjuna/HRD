import { defineStore } from "pinia";

interface UserState {
  access_token: string;
  data: {
    email: string;
    employee_id: string;
  };
}

export const useUserStore = defineStore({
  id: "userState",
  state: (): UserState => ({
    access_token: "",
    data: {
      email: "",
      employee_id: "",
    },
  }),
  getters: {
    getAccessToken(state) {
      return state.access_token;
    },
    getUserData(state) {
      return state.data;
    },
  },
  actions: {
    setUserStateLogin(response: any) {
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
      this.access_token = response.access_token;
      localStorage.setItem("user_data", JSON.stringify(response.data));
      this.data = response.data;
    },
    setUserStateLocal() {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        this.access_token = access_token;
      }
      const user_data = localStorage.getItem("user_data");
      if (user_data) {
        this.data = JSON.parse(user_data);
      }
    },
  },
});
