import myRequest from '@/api/fileRequest';

/**
 * 大文件上传
 * @param files
 * @returns
 */
export const uploadLargeApi = async (formData: any) => {
  const res = await myRequest({
    url: '/files/upload-large',
    method: 'POST',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    // data: files,
    data: {
      chunkSize: formData.get('chunkSize'),
      totalNumber: formData.get('totalNumber'),
      chunkNumber: formData.get('chunkNumber'),
      md5: formData.get('md5'),
      file: formData.get('file')
    },
    noToast: true
  });
  return res?.data;
};

/**
 * 大文件上传校验
 * @param {string} md5
 * @returns
 */
export const checkFileApi = async (md5: string) => {
  const res = await myRequest({
    url: '/files/check',
    method: 'POST',
    params: {
      md5
    }
  });
  return res?.data;
};
