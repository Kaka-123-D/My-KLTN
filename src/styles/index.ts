import { createGlobalStyle } from "styled-components";
import { colors } from "core/assets";
import "antd/dist/antd.css";

const StyleGlobal = createGlobalStyle<any>`
  html, body {
      font-family: Roboto, sans-serif, "Segoe UI";
      margin: 0;
  }
  iframe:first-of-type {
      display: none;
  }
  hr {
    border: none;
    border-top: 1px solid #bdbdbd;
    height: 0px;
  }
  .ant-picker-range {
    width: 100%;
    height: 56px;
}
  .ant-carousel {
    max-width: 100%;
  }
  .tableCus {
  width: 100%;
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }
  .ant-table {
    border-radius: 5px;
  }
  .ant-table.ant-table-bordered > .ant-table-container {
    border-left: 1px solid #d6d6d6;
  }
  .ant-table-container {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  table {
    border-top: 1px solid #d6d6d6 !important;
    border-radius: 5px 5px 0 0 !important;
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    border-right: 1px solid #d6d6d6;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 5px;
  }
  .ant-table-thead > tr > th {
    border-bottom: 1px solid #d6d6d6;
    background: #e9ebee;
    padding: 7.5px 7.5px;
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td {
    border-right: 1px solid #d6d6d6;
  }
  .ant-table-tbody > tr > td {
    border-right: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    padding: 12.5px 12.5px;
  }
  tbody > tr:nth-child(2n) {
    background: #f8f8f8;
    .ant-table-cell-fix-right {
      background: #f8f8f8;
    }
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 5px;
  }
  .ant-table-thead .ant-checkbox-inner {
    border: 1.5px solid #3b3b3b;
    background: #e9ebee;
  }
  .ant-table-tbody .ant-checkbox-inner {
    border: 1.5px solid #3b3b3b;
    background: #e9ebee;
  }
  .ant-checkbox-inner {
    border-radius: 4px;
    width: 20px;
    height: 20px;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${colors.mainColor};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${colors.mainColor};
    color: white;
    border: 1.5px solid ${colors.mainColor};
  }
  .ant-checkbox-inner::after {
    left: 24.5%;
  }
  .ant-checkbox-checked::after {
    border: none;
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    width: 0;
    height: 0;
    background: none;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: ${colors.mainColorRGB};;
  }
  .ant-table-cell-row-hover {
    background: rgba(54, 135, 151, 0.3) !important;
  }
  .ant-table-cell-fix-right {
    background: #fff;
  }
}
.table--rowSelect {
  tbody > tr {
    cursor: pointer;
  }
}
.tablePaginationCustom {
  border-bottom: 1px solid #d6d6d6;
  border-right: 1px solid #d6d6d6;
  border-left: 1px solid #d6d6d6;
  border-radius: 0 0 5px 5px;
  height: 44px;
  overflow: hidden !important;
  .MuiToolbar-root {
    min-height: 44px !important;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding-left: 10px;
    padding-right: 0;
    background-color: #e9ebee;
    .MuiTablePagination-spacer {
      flex: none;
    }
    .MuiTablePagination-displayedRows {
      order: 1;
      margin-bottom: 0;
      flex: 1;
      color: #888888;
    }
    .MuiTablePagination-selectLabel {
      order: 2;
      margin-bottom: 0;
      color: #888888;
    }
    .MuiInputBase-root {
      order: 3;
      color: #888888;
    }
    .MuiTablePagination-actions {
      order: 4;
    }
  }
}
`;
export default StyleGlobal;
