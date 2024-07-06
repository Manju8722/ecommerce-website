import { defineStore } from "pinia";

//import {ref,computed} from 'vue'

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({ accessToken: "", user: null }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async getUser() {
      try {
        const { data, status, error } = await useFetch(
          "http://localhost:5000/api/v1/user",
          {
            // method: "POST",
            // body: {
            //   username: username.value,
            //   password: password.value,
            // },
            // credentials:'include',
          }
        );
        console.log(data.value);
      } catch (error) {}
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
  },
});
