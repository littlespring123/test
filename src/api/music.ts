import myRequest from '@/api/musicRequest';
import cacheMusic from '@/api/request';
import { IMusicItem } from '@/pages/Music/types';

/**
 * 本地音乐列表get
 * @returns
 */
export const getPlayListApi = async (): Promise<IMusicItem[]> => {
  const res = await cacheMusic({
    url: '/music/get',
    method: 'GET'
  });
  return res.data;
};

/**
 * 添加到本地音乐列表
 * @param { IMusicItem } data 保存音乐信息
 * @returns
 */
export const addListApi = async (data: IMusicItem): Promise<boolean> => {
  const res = await cacheMusic({
    url: '/music/add',
    method: 'POST',
    data
  });
  return res?.data;
};

/**
 * 删除到本地音乐列表
 * @param {string} id 音乐id(非musicId)
 * @returns {boolean} res
 */
export const delListApi = async (id: string): Promise<boolean> => {
  const res = await cacheMusic({
    url: '/music/delete',
    method: 'get',
    params: {
      id
    }
  });
  return res?.data;
};

// 检索音乐
export const searchMusic = async (
  keywords: string,
  pageNum?: number,
  pageSize?: number
): Promise<any> => {
  const res = await myRequest({
    url: `/search`,
    method: 'GET',
    params: {
      keywords
    }
    // data: {
    //   pageNum,
    //   pageSize,
    // },
  });
  return res.result;
};

/**
 * check音乐
 * @param {number} id 音乐id
 * @return {boolean} success
 */
export const checkMusic = async (id: number): Promise<boolean> => {
  const res = await myRequest({
    url: `/check/music?id=` + id,
    method: 'GET'
  });
  return res;
};

/**
 * 获取歌曲链接
 * @param {number} id 歌曲id
 * @return {any} data
 */
export const musicUrl = async (id: number): Promise<any> => {
  const res = await myRequest({
    url: `/song/url?id=` + id,
    method: 'GET'
  });
  return res?.data;
};

/**
 * 获取歌曲详情
 * @param {number} id 歌曲id
 * @return {any} data
 */
export const musicInfo = async (id: number): Promise<any> => {
  const res = await myRequest({
    url: `/song/detail?ids=` + id,
    method: 'GET'
  });
  return res;
};

/**
 * 获取歌词详情
 * @param {number} id 歌词id
 * @return {[]} data
 */
export const lyricInfo = async (id: number): Promise<[]> => {
  const res = await myRequest({
    url: `/lyric?id=` + id,
    method: 'GET'
  });
  return res;
};

/**
 * 获取最新列表
 * @return {any} data
 */
export const newSongAPi = async (): Promise<any> => {
  const res = await myRequest({
    url: '/personalized/newsong',
    method: 'GET'
  });
  return res;
};
