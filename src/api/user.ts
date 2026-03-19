/**
 * 用户相关 API（示例模块，可根据实际业务修改）
 */
import { get, post } from "@/utils/request";

/** 用户信息 */
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

/** 登录参数 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录响应 */
export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

/** 登录 */
export const login = (data: LoginParams) => {
  return post<LoginResult>("/user/login", data);
};

/** 获取用户信息 */
export const getUserInfo = () => {
  return get<UserInfo>("/user/info");
};

/** 获取用户列表 */
export const getUserList = (params?: { page: number; pageSize: number }) => {
  return get<{ list: UserInfo[]; total: number }>("/user/list", params);
};
