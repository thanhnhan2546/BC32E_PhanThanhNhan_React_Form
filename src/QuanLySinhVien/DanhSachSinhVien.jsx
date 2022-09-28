import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudent,
  editStudent,
  searchName,
} from "../store/actions/sinhVienActions";

class DanhSachSinhVien extends Component {
  state = {
    search: "",
  };
  handleDelete = (maSV) => {
    this.props.dispatch(deleteStudent(maSV));
  };
  handleEdit = (maSV) => {
    this.props.dispatch(editStudent(maSV));
  };
  handleSearch = async (e) => {
    console.log(e.target.value);
    await this.setState({ search: e.target.value });
    this.props.dispatch(searchName(this.state.search));
  };
  componentDidMount() {
    this.props.dispatch(searchName(this.state.search));
  }
  render() {
    console.log(this.props);
    const { svSearch, sinhVien } = this.props;
    const renderSV = this.state.search === "" ? sinhVien : svSearch;
    return (
      <div className="container p-2 mx-auto ">
        <fieldset className="w-full space-y-1 ">
          <label htmlFor="Search" className="hidden">
            Search
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="button"
                title="search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none border dark:border-gray-700 focus:dark:border-violet-400"
              onChange={this.handleSearch}
            />
          </div>
        </fieldset>
        <h2 className="mb-4 text-2xl font-semibold leading-tight"></h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="dark:bg-gray-800 dark:text-gray-100">
              <tr className="text-left">
                <th className="p-3">Mã SV</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Email</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {renderSV.map((sv, i) => (
                <tr
                  key={i}
                  className="border-b border-opacity-20 dark:border-gray-700 "
                >
                  <td className="p-3">
                    <p>{sv.maSV}</p>
                  </td>
                  <td className="p-3">
                    <p>{sv.hoTen}</p>
                  </td>
                  <td className="p-3">
                    <p>{sv.SDT}</p>
                  </td>
                  <td className="p-3">
                    <p>{sv.email}</p>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      className="p-3 mr-3 font-semibold rounded-md bg-red-500 dark:text-white hover:bg-red-700"
                      onClick={() => this.handleDelete(sv.maSV)}
                    >
                      Xóa
                    </button>
                    <button
                      className="p-3 mr-3 font-semibold rounded-md bg-yellow-500 dark:text-white hover:bg-yellow-700"
                      onClick={() => this.handleEdit(sv.maSV)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.SinhVienReducer,
  };
};

export default connect(mapStateToProps)(DanhSachSinhVien);
