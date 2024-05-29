/**
 * @description 权限存储函数
 */
const authorizationKey = 'user';

export function getAuthorization() {
  return localStorage.getStorageSync(authorizationKey);
}

// export function setAuthorization(authorization: any) {
// 	return localStorage.setStorageSync(authorizationKey, authorization)
// }

// export function removeAuthorization(authorization: any) {
// 	return localStorage.removeStorageSync(authorization);
// }
