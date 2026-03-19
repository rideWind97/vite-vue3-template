import { ref } from "vue";
import { defineStore } from "pinia";
import { login as loginApi, getUserInfo as getUserInfoApi } from "@/api/user";
import type { UserInfo, LoginParams } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "");
  const userInfo = ref<UserInfo | null>(null);

  /** 登录 */
  async function login(params: LoginParams) {
    const res = await loginApi(params);
    token.value = res.data.token;
    userInfo.value = res.data.userInfo;
    localStorage.setItem("token", res.data.token);
  }

  /** 获取用户信息 */
  async function fetchUserInfo() {
    const res = await getUserInfoApi();
    userInfo.value = res.data;
  }

  /** 退出登录 */
  function logout() {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token");
  }

  return { token, userInfo, login, fetchUserInfo, logout };
});
