import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

/** 后端统一响应结构 */
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

/** 自定义请求配置（扩展 AxiosRequestConfig） */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否跳过统一错误提示，默认 false */
  skipErrorHandler?: boolean;
  /** 是否直接返回原始 AxiosResponse，默认 false */
  rawResponse?: boolean;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================== 请求拦截器 ========================
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token，如果有则添加到请求头
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求拦截器错误:", error);
    return Promise.reject(error);
  },
);

// ======================== 响应拦截器 ========================
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data: res, config } = response;
    const reqConfig = config as RequestConfig;

    // 如果需要原始响应（如文件下载），直接返回
    if (reqConfig.rawResponse) {
      return response;
    }

    // 业务状态码判断（根据实际后端约定调整）
    if (res.code === 200 || res.code === 0) {
      return res as any;
    }

    // 统一错误处理
    if (!reqConfig.skipErrorHandler) {
      handleBusinessError(res.code, res.message);
    }

    return Promise.reject(new Error(res.message || "请求失败"));
  },
  (error) => {
    // HTTP 状态码错误处理
    const status = error.response?.status;
    const reqConfig = error.config as RequestConfig;

    if (!reqConfig?.skipErrorHandler) {
      handleHttpError(status);
    }

    return Promise.reject(error);
  },
);

/** 处理业务错误码 */
function handleBusinessError(code: number, message: string): void {
  switch (code) {
    case 401:
      console.error("登录已过期，请重新登录");
      // TODO: 跳转登录页或清除 token
      localStorage.removeItem("token");
      break;
    case 403:
      console.error("没有权限访问该资源");
      break;
    default:
      console.error(message || "请求失败");
  }
}

/** 处理 HTTP 错误状态码 */
function handleHttpError(status?: number): void {
  const errorMap: Record<number, string> = {
    400: "请求参数错误",
    401: "未授权，请重新登录",
    403: "拒绝访问",
    404: "请求资源不存在",
    408: "请求超时",
    500: "服务器内部错误",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时",
  };

  if (status) {
    console.error(errorMap[status] || `请求失败 (${status})`);
  } else {
    console.error("网络异常，请检查网络连接");
  }
}

// ======================== 封装请求方法 ========================

/**
 * GET 请求
 * @example const data = await get<UserInfo>('/user/info')
 */
export function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return service.get(url, { params, ...config });
}

/**
 * POST 请求
 * @example const data = await post<UserInfo>('/user/login', { username, password })
 */
export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return service.post(url, data, config);
}

/**
 * PUT 请求
 * @example const data = await put<UserInfo>('/user/update', { name: 'new' })
 */
export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return service.put(url, data, config);
}

/**
 * DELETE 请求
 * @example const data = await del('/user/123')
 */
export function del<T = unknown>(
  url: string,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return service.delete(url, config);
}

/** 导出 axios 实例（用于特殊场景） */
export default service;
