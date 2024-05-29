import myRequest from '@/api/request.js';
import { ITodoItem } from '@/pages/tools/types';

/**
 * 获取todo列表
 * @param {number} pageNum 当前页
 * @param {number} pageSize 分页大小
 * @returns {any} res
 */
export const getList = async (pageNum: number, pageSize: number): Promise<any> => {
  const res = await myRequest({
    url: '/note/get',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  });
  return res?.data;
};

/**
 * 添加todo
 * @param {string} content 内容
 * @param {string} type 类型
 * @returns
 */
export const addTodo = async (content: string, type: string) => {
  const res = await myRequest({
    url: '/note/add',
    method: 'POST',
    data: {
      content,
      type
    }
  });
  return res?.data;
};

/**
 * 修改
 * @returns
 */
export const modifyTodo = async (obj: any) => {
  const res = await myRequest({
    url: '/note/modify',
    method: 'POsT',
    data: obj
  });
  return res?.data;
};

/**
 * 删除
 * @param {number} id todo的id
 * @returns
 */
export const deleteTodo = async (id: number) => {
  const res = await myRequest({
    url: '/note/delete',
    method: 'GET',
    params: {
      id
    }
  });
  return res?.data;
};
