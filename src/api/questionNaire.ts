import myRequest from '@/api/request.js';

/**
 * 获取问卷列表
 * @param {object} params 参数
 * @returns {Array} 数组
 */
export async function getFormList(params?: {
  size?: number;
  current?: number;
  title?: string;
  author?: string;
}): Promise<{
  data: any;
  total: number;
  size: number;
  current: number;
}> {
  console.log('request', params);
  return myRequest('/form/getTable', {
    method: 'GET',
    params: {
      ...params
    }
  }).then((res) => res.data);
}

/**
 * 新建问卷
 * @param {any} form 提交表单
 * @return {boolean} res
 *  */
export async function newForm(form: any): Promise<{
  data: boolean;
}> {
  return myRequest(`/form/new`, {
    method: 'POST',
    data: form
  }).then((res) => res.data);
}

/**
 * 删除问卷
 * @param {number} id 问卷id
 * @return {boolean} res
 *  */
export async function deleteForm(id: number): Promise<boolean> {
  return myRequest(`/form/delete`, {
    method: 'GET',
    params: {
      id
    }
  }).then((res) => res.data);
}

// 获取问卷的详情：填写问卷页
export async function getForm(id: number): Promise<{
  data: any;
}> {
  return myRequest(`/form/get`, {
    method: 'GET',
    params: {
      id
    }
  }).then((res) => res.data);
}

/**
 * 提交问卷结果：填写问卷
 * @param {string}  uid 用户id
 * @param {number} id 问卷id
 * @param {any} data 提交的数据
 * @return {any} res
 *  */
export async function submitForm(uid: number, id: number, data: any): Promise<{ data: any }> {
  return myRequest(`/fruits/submit`, {
    method: 'POST',
    data,
    params: {
      uid,
      id
    }
  }).then((res) => res.data);
}

/**
 * 获取结果表格 By 问卷 id
 * @param {object} params 参数
 * @return {any} 返回的结果
 **/
export async function getFruitsList(params?: {
  size?: number;
  current?: number;
  id?: number;
}): Promise<{
  data: any;
  total: number;
  size: number;
  current: number;
}> {
  return myRequest(`/fruits/getTable`, {
    method: 'GET',
    params: {
      ...params
    }
  }).then((res) => res.data);
}

/**
 * 获取问卷结果--统计
 * @param {number} id 问卷id
 * @return {any} 问卷填写统计结果
 */
export async function getFruitStatis(id: number): Promise<{ data: any }> {
  return myRequest(`/fruits/getStatis`, {
    method: 'GET',
    params: { id }
  }).then((res) => res.data);
}

/**
 * 获取问卷结果 By 表单 id
 * @param {number} id 问卷的id
 * @return {any} 填写的问卷信息
 *  */
export async function getFruitDetails(id: number): Promise<{ data: any }> {
  return myRequest(`/fruits/getfruits`, {
    method: 'GET',
    params: { id }
  }).then((res) => res.data);
}
