import myRequest from '@/api/request.js';

/**
 * 获取列表
 * @returns
 */
export const getListApi = async (word: string, pageNum: number, pageSize: number) => {
  const res = await myRequest({
    url: '/genshin/get',
    method: 'GET',
    params: {
      word,
      pageNum,
      pageSize
    }
  });
  return res?.data;
};

/**
 * 添加
 * @returns
 */
export const addApi = async (item: object) => {
  const res = await myRequest({
    url: '/genshin/add',
    method: 'POST',
    data: item
  });
  return res?.data;
};
