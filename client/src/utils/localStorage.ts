/**
 * 로컬스토리지에서 해당 키의 정보를 Get하는 유틸
 * 존재하지 않을 경우 null을 리턴
 */
export const getLS = <T>(key: string) => {
  const item = localStorage.getItem(key);
  let returnValue: T;
  try {
    if (item) {
      returnValue = JSON.parse(item) as T;
      return returnValue;
    }
  } catch (err) {
    return null;
  }
};
/**
 * 로컬스토리지에 값을 저장하는 유틸
 */
export const setLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 로컬스토리지에서 해당 키의 정보를 삭제하는 유틸
 */
export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};
