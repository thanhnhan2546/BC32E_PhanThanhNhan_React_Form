import {
  ADD_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  SEARCH_NAME,
  UPDATE_STUDENT,
} from "../constants/sinhVienContants";

const stateDefault = {
  sinhVien: [
    {
      maSV: "3118410302",
      hoTen: "Phan Thanh Nhân",
      SDT: "0394361456",
      email: "thanhnhanluongbinh@gmail.com",
    },
    {
      maSV: "123576",
      hoTen: "Nguyen Van A",
      SDT: "0157965",
      email: "vanAh@gmail.com",
    },
  ],
  sinhVienSelected: null,
  svSearch: [],
};

export const SinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case ADD_STUDENT: {
      let temp = [...state.sinhVien];
      temp.push(action.payload);
      state.sinhVien = temp;

      return { ...state };
    }
    case DELETE_STUDENT: {
      const temp = [...state.sinhVien];
      state.sinhVien = temp.filter((sv) => sv.maSV !== action.payload);

      return { ...state };
    }
    case EDIT_STUDENT: {
      const temp = state.sinhVien.find((sv) => sv.maSV === action.payload);
      state.sinhVienSelected = temp;

      return { ...state };
    }
    case UPDATE_STUDENT: {
      const temp = state.sinhVien.map((sv) =>
        sv.maSV === action.payload.maSV ? action.payload : sv
      );
      state.sinhVien = temp;
      state.sinhVienSelected = null;
      return { ...state };
    }
    case SEARCH_NAME: {
      // console.log("reducer", state.sinhVien[0].hoTen.toLowerCase());
      if (action.payload !== "") {
        const filter = state.sinhVien.filter((sv) =>
          sv.hoTen.toLowerCase().includes(action.payload.toLowerCase())
        );
        console.log(filter);
        state.svSearch = filter;
      } else {
        console.log("none");
        state.svSearch = state.sinhVien;
      }
      return { ...state };
    }
    default:
      return state;
  }
};
