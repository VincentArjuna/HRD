import axios, { AxiosError } from "axios";

const apiURL = import.meta.env.VITE_API_URL;
export class API {
  /**
   * @name adminLogin
   * @description For Admin account Login
   * @param email
   * @param password
   */
  static async adminLogin(email: string, password: string): Promise<any> {
    return axios
      .post(
        apiURL + "/custom_auth/login/",
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

  static async adminLogout(email: string): Promise<any> {
    return axios
      .post(
        apiURL + "/custom_auth/logout/",
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
}
