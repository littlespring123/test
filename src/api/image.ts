import myRequest from '@/api/request.js';

/**
 * 图床：上传图片
 * @param files
 * @returns
 */
export const uploadImage = async (files: any[], index: number, callBack) => {
  const res = await myRequest({
    url: '/image/upload',
    method: 'POST',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    data: files,
    onUploadProgress: (e) => callBack(index, e),
    noToast: true
  });
  return res?.data;
};
