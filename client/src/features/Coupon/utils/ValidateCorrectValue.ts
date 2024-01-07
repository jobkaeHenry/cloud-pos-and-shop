/**
 * 0 이상의 정수인지 판별하는
 * @param val number | string
 * @returns boolean
 */
const ValidatePositiveIntiger = (val: number | string) =>
  !new RegExp(/^[1-9]\d*$/).test(String(val));

export default ValidatePositiveIntiger;
