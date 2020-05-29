import axios from 'axios';







const baseURL = 'http://localhost:3001/';
// const baseURL = 'https://api-staging.mybarrefitness.com/';
// const baseURL = 'https://api.mybarrefitness.com/';
axios.defaults.baseURL = baseURL;

let token = localStorage.getItem('token');
console.log("TOKEN IN HTTPS");
console.log(token);
if (token !== undefined && token !== null && token !== "") {
  console.log("Setting token in https file");
  axios.defaults.headers.common['Authorization'] = token;
}

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API,
  responseType: 'json'
});

export const URLS = {
  baseURL: baseURL,
  REGISTER: '/admin/user/register',
  LOGIN: '/admin/login',
  OTP: {
    SEND: '/corp/user/email/send/otp',
    VERIFY: '/corp/user/email/verify?otp='
  },
  FILE: {
    UPLOAD: 'file/upload',
    BY_ID: 'file/:id',
  },
  USER: {
    LIST_ALL: 'user/list/all',
    BY_ID: 'user/profile/:id'
  },
  BUNDLE: {
    BY_ID: 'bundle/:id',
    LIST_ALL: 'bundle/list/all',
    CREATE: 'bundle/create'
  },
  ADMIN: {
    CREATE: '/admin/register',
    LIST_ALL: 'admin/list/all',
    BY_ID: 'admin/:id'
  },
  INVITE: {
    DETAIL: 'corp/invite/:id',
    SEND: 'corp/user/invite',
    REGISTER: 'corp/user/register/by/invitation'
  },
  PRODUCT: {
    CREATE: 'store/product/create',
    LIST_ALL: 'store/products/list/all',
    BY_ID: 'store/product/:id',
    RETIRE: 'store/product/:id/retire',
    ACTIVATE: 'store/product/:id/activate',
  },
  ORDER: {
    LIST_ALL: 'order/list/all',
    BY_ID: 'order/:id',
    UPDATE_STATUS: 'order/:id/update/status'
  },
  COURSE: {
    LIST_ALL: 'course/list/all',
    CREATE: 'course/create',
    BY_ID: 'course/:id',
    REPORT: 'course/:id/report'
  },
  MEMBERSHIP: {
    DETAIL_BY_ID: 'memberships/:id',
    BY_ID: 'user/:id/memberships',
    EXTEND_VIDEO_SUBMISSION_DATE: 'user/membership/:id/extend/submission?date=:date',
    CHANGE: 'user/:userId/membership/change/to/course/:courseId',
    UPDATE_STATUS: 'user/membership/:id/update?status=:status',
    UPDATE_CERTIFICATE_URL: 'user/membership/:id/update/certificate_url'
  },
  DASHBOARD: {
    GRAPHS: 'dashboard/graphs',
    MEMBERSHIPS: 'dashboard/memberships',
    ORDERS: 'dashboard/orders',
    MEMBERSHIPS_REVENUE: 'dashboard/memberships/revenue',
    STORE_REVENUE: 'dashboard/store/revenue',
    BUNDLES_REVENUE: 'dashboard/bundles/revenue',
    BUNDLES: 'dashboard/bundles',
    REVENUE: 'dashboard/revnue',
    TOTAL: 'dashboard/total',
    GENDER_RATIO: 'dashboard/users/gender/ratio',
    DISK: 'disk'
  },
  CONFIGS: {
    CONFIG: 'configs'
  },
  COUPON: {
    LIST_ALL: 'coupon/list/all',
    BY_ID: 'coupon/:id',
    CREATE: 'coupon/create',
    USERS_REPORT: 'coupon/:id/users/list/report'
  }
}
