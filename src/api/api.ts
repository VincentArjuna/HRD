import axios, { AxiosError } from "axios";
import { useUserStore } from "../stores/user";

const apiURL = import.meta.env.VITE_API_URL;
export class API {
  /**
   * @name adminLogin
   * @description For Admin account Login
   * @param email
   * @param password
   * @returns User Data
   */
  static async adminLogin(email: string, password: string): Promise<any> {
    localStorage.clear();
    return axios
      .post(
        apiURL + "/custom-auth/login/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "X-CSRFToken": csrfToken,
          },
        }
      )
      .then((response) => {
        const userState = useUserStore();
        userState.setUserStateLogin(response.data);
        return {
          status: response.status,
          response: response.data,
        };
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          return {
            status: error.response.status,
            message: "Invalid login credentials",
          };
        } else {
          return null;
        }
      });
  }

  /**
   * @name adminLogout
   * @description For Admin Logout
   * @param email
   * @returns Success
   */
  static async adminLogout(email: string): Promise<any> {
    return axios
      .post(
        apiURL + "/custom-auth/logout/",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return "success";
      })
      .catch((error: AxiosError) => {
        return "success";
      });
  }

  static async getBranch(): Promise<any> {
    return axios
      .get(apiURL + "/tenant/get-branch-list", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return 0;
      });
  }
}
