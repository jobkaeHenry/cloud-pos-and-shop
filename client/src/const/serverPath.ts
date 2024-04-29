export const LOGIN_SERVER_URL = "/auth/login";

export const DOUBLE_CHECK_PASSWORD = "/auth/doubleCheck";

export const MY_INFO_URL = "/user/me";

export const PATCH_PRODUCT = (menuId: number) => `/menu/${menuId}`;

export const CREATE_PRODUCT = "/menu";

export const UPLOAD_MENU_IMAGE = (menuId: number) => `/menu/${menuId}/image`;

export const DELETE_PRODUCT = (menuId: number) => `/menu/${menuId}`;

export const DELETE_COUPON_URL = (couponId: number) => `/coupon/${couponId}`;

export const PATCH_COUPON_URL = (couponId: number) => `/coupon/${couponId}`;

export const CREATE_COUPON_URL = "/coupon";

export const CREATE_CATEGORY = "/category";

export const PATCH_CATEGORY = (categoryId: number | string) =>
  `/category/${categoryId}`;

export const DELETE_CATEGORY = (categoryId: number | string) =>
  `/category/${categoryId}`;

export const CREATE_WEBSITE = "/setting";
