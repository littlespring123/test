import myRequest from '@/api/request.js';
import { IUserInfo } from '@/pages/center/types';
// 按需引入的 请求头

/**
 * 登录
 * POST /users/login
 * @param {ILoginForm} data 登录数据
 * @return {IUserInfo} userInfo
 * */
export async function login(data) {
  const res = await myRequest({
    url: '/users/login',
    method: 'POST',
    data: data
  });
  return res?.data;
}

/**
 * 注册
 * POST /users/registe
 * @param {ILoginForm} data 注册数据
 * */
export async function register(data) {
  const res = await myRequest({
    url: '/users/register',
    method: 'POST',
    data: data
  });
  return res?.data;
}

/**
 * 获取用户自己的信息
 * GET /users/get
 * 使用token
 * */
export async function getUserInfoApi() {
  const res = await myRequest({
    url: '/users/get',
    method: 'GET'
  });
  return res?.data;
}

/**
 * 注册时检查名字
 * @param data
 * @returns
 */
export async function checkName(data: string) {
  const res = await myRequest({
    url: '/users/check',
    method: 'GET',
    data: {
      username: data
    }
  });
  return res?.data;
}

/**
 * 获取头像
 * @param {string} data 用户uid
 * */
export async function getAvatar(data: string) {
  const res = await myRequest({
    url: '/users/getAvatar',
    method: 'GET',
    data: {
      uid: data
    }
  });
  return res?.data;
}

// 反馈
export async function postFeedBack(data) {
  const res = await myRequest({
    url: '/feedback/post',
    method: 'POST',
    data: {
      uid: data.uid,
      score: data.score,
      feedBack: data.feedBack
    }
  });
  return res?.data;
}

/**
 * 获取其他人的信息
 * GET /users/getLessInfo
 * @param {string} uid 用户uid
 * */
export const getLessInfoApi = async (uid: string): Promise<IUserInfo> => {
  const res = await myRequest<IUserInfo>(`/users/getLessInfo`, {
    method: 'GET',
    params: { uid }
  });
  return res?.data;
};

/**
 * 获取所有人的信息
 * GET /users/selectAll
 * */
export const getAllListApi = async (): Promise<IUserInfo> => {
  const res = await myRequest<IUserInfo>(`/users/selectAll`, {
    method: 'GET'
  });
  return res?.data;
};

/**
 * 上传头像
 * @param {file} file 图片文件（单个）
 * @return {boolean} 上传状态
 *  */
export const uploadAvatar = async (file: any): Promise<Boolean> => {
  const res = await myRequest<Boolean>(`/users/upload`, {
    method: 'POST',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data: file
  });
  return res?.data;
};
