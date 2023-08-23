import {
  API_ROUTE_CLASS,
  API_ROUTE_CLASSES,
  API_ROUTE_LOGIN,
  API_ROUTE_LOGS,
  API_ROUTE_STUDENT,
  API_ROUTE_STUDENTS,
  API_ROUTE_STUDENT_VOUCHERS,
  API_ROUTE_VOUCHER,
  API_ROUTE_VOUCHERS,
} from "./constants";

import { post, get, put, del } from "./utils";

export const loginUserApi = (username, password) => {
  return get(API_ROUTE_LOGIN, {}, { username, password });
};

export const getAllClasses = () => {
  return get(API_ROUTE_CLASSES, {}, {});
};

export const getAllStudents = () => {
  return get(API_ROUTE_STUDENTS, {}, {});
};

export const getAllVouchers = () => {
  return get(API_ROUTE_VOUCHERS, {}, {});
};

export const postStudent = (formData) => {
  return post(API_ROUTE_STUDENT, formData, {}, {
    "Content-Type": "multipart/form-data",
    "Accept": "multipart/form-data",
  });
};

export const updateStudent = (formData, id) => {
  return put(API_ROUTE_STUDENT, formData, { id }, {
    "Content-Type": "multipart/form-data",
    "Accept": "multipart/form-data",
  });
};

export const getStudentById = ({ class_id }) => {
  return get(API_ROUTE_STUDENT, {}, { class_id });
};

export const getStudentByStudentId = ({ id }) => {
  return get(API_ROUTE_STUDENT, {}, { id });
};


export const postVoucherApi = ({ date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }) => {
  return post(API_ROUTE_VOUCHER, { date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }, {});
};

export const putVoucherApi = ({ id, date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }) => {
  return put(API_ROUTE_VOUCHER, { date_issued, date_expiry, config, payment_mode, is_paid, classId, studentId }, { id });
};

export const deleteStudentApi = ({ id }) => {
  return del(API_ROUTE_STUDENT, {}, { id });
};

export const postClassesApi = ({ name }) => {
  return post(API_ROUTE_CLASS, { name }, {});
};

export const deleteClassesApi = ({ id }) => {
  return del(API_ROUTE_CLASS, {}, { id });
};

export const putClassesApi = ({ id, name }) => {
  return put(API_ROUTE_CLASS, { name }, { id });
};

export const getLogsApi = () => {
  return get(API_ROUTE_LOGS, {}, {});
};

export const getStudentVouchersApi = ({student_id}) => {
  return get(API_ROUTE_STUDENT_VOUCHERS, {}, {student_id});
};
