import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent, updateStudent } from "../store/actions/sinhVienActions";

class FormDangKy extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      SDT: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      SDT: "",
      email: "",
    },
  };
  handleForm = (e) => {
    // console.log(e.target.validity);
    const {
      value,
      minLength,
      maxLength,
      name,
      title,
      validity: { patternMismatch, tooShort, valueMissing },
    } = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
    valueMissing &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: "",
        },
      });

    tooShort &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: "",
        },
      });
    patternMismatch &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: "",
        },
      });
  };
  handleBlur = (e) => {
    const {
      minLength,
      maxLength,
      name,
      title,
      validity: { patternMismatch, tooShort, valueMissing },
    } = e.target;

    valueMissing &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: `${title} không được trống`,
        },
      });
    let max = "";
    maxLength !== -1 && (max = "và nhiều nhất là " + maxLength);
    tooShort &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: `${title} phải ít nhất ${minLength}  ${max} ký tự`,
        },
      });
    patternMismatch &&
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: `${title} không hợp lệ `,
        },
      });
  };
  handleSubmit = (e) => {
    // console.log(e.target.checkValidity());
    e.preventDefault();
    // console.log("values", this.state.values);
    if (!e.target.checkValidity()) {
      return;
    }
    // console.log(this.props.sinhVienSelected);
    if (this.props.sinhVienSelected) {
      this.props.dispatch(updateStudent(this.state.values));
    } else {
      this.props.dispatch(addStudent(this.state.values));
    }
    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        SDT: "",
        email: "",
      },
      errors: {
        maSV: "",
        hoTen: "",
        SDT: "",
        email: "",
      },
    });
  };

  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (
      nextProps.sinhVienSelected &&
      nextProps.sinhVienSelected.maSV !== currentState.values.maSV
    ) {
      currentState.values = nextProps.sinhVienSelected;
    }
    return currentState;
  };

  render() {
    const { maSV, hoTen, SDT, email } = { ...this.state.values };
    // console.log(maSV);
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div>
          <div className="p-5 dark:bg-gray-800 text-white text-2xl">
            THÔNG TIN SINH VIÊN
          </div>
          <div className="grid grid-cols-2 gap-2 ">
            <div className="p-2">
              <label className="block text-xl font-medium mb-1 text-gray-500">
                Mã SV
              </label>
              <input
                // disabled={maSV === "" ? false : true}
                required
                minLength={4}
                maxLength={16}
                title="Mã Sinh viên"
                name="maSV"
                type="text"
                value={maSV}
                className="border sm:text-sm rounded focus:ring-inset dark:border-gray-700  focus:ring-violet-400 w-full h-8 p-3"
                onChange={(e) => {
                  this.handleForm(e);
                }}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500">{this.state.errors.maSV}</span>
            </div>
            <div className="p-2">
              <label className="block text-xl font-medium mb-1 text-gray-500">
                Họ tên
              </label>
              <input
                required
                minLength={4}
                pattern="^([a-zA-Z]+\s)*[a-zA-Z]+$"
                title="Họ tên"
                name="hoTen"
                type="text"
                value={hoTen}
                className="border sm:text-sm rounded focus:ring-inset dark:border-gray-700  focus:ring-violet-400 w-full h-8 p-3"
                onChange={(e) => {
                  this.handleForm(e);
                }}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500">{this.state.errors.hoTen}</span>
            </div>
            <div className="p-2">
              <label className="block text-xl font-medium mb-1 text-gray-500">
                Số điện thoại
              </label>
              <input
                required
                minLength={4}
                maxLength={20}
                pattern="^\d+$"
                title="Số điện thoại"
                name="SDT"
                type="text"
                value={SDT}
                className="border sm:text-sm rounded focus:ring-inset dark:border-gray-700  focus:ring-violet-400 w-full h-8 p-3"
                onChange={(e) => {
                  this.handleForm(e);
                }}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500">{this.state.errors.SDT}</span>
            </div>
            <div className="p-2">
              <label className="block text-xl font-medium mb-1 text-gray-500">
                Email
              </label>
              <input
                required
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                title="Email"
                name="email"
                type="text"
                value={email}
                className="border sm:text-sm rounded focus:ring-inset dark:border-gray-700  focus:ring-violet-400 w-full h-8 p-3"
                onChange={(e) => {
                  this.handleForm(e);
                }}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500">{this.state.errors.email}</span>
            </div>
            <div className="p-2">
              {!this.props.sinhVienSelected ? (
                <button
                  type="submit"
                  className="p-3 mr-3 font-semibold rounded-md bg-green-500 dark:text-white hover:bg-green-700"
                >
                  Thêm Sinh viên
                </button>
              ) : (
                <button
                  type="submit"
                  className="p-3 mr-3 font-semibold rounded-md bg-blue-500 dark:text-white hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.SinhVienReducer,
  };
};

export default connect(mapStateToProps)(FormDangKy);
