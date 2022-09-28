import {
  ADD_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  SEARCH_NAME,
  UPDATE_STUDENT,
} from "../constants/sinhVienContants";

export const addStudent = (payload) => ({
  type: ADD_STUDENT,
  payload,
});

export const deleteStudent = (payload) => ({
  type: DELETE_STUDENT,
  payload,
});

export const editStudent = (payload) => ({
  type: EDIT_STUDENT,
  payload,
});

export const updateStudent = (payload) => ({
  type: UPDATE_STUDENT,
  payload,
});

export const searchName = (payload) => ({
  type: SEARCH_NAME,
  payload,
});
