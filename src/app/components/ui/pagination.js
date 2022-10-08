import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Pagination } from "antd";

const PaginationMod = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      {/*<nav>*/}
      {/*  <ul className="pagination">*/}
      {/*    {pages.map((page) => (*/}
      {/*      <li*/}
      {/*        className={"page-item" + (page === currentPage ? " active" : "")}*/}
      {/*        key={"page_" + page}*/}
      {/*      >*/}
      {/*        <button*/}
      {/*          className="page-link border-light bg-transparent text-secondary d-flex flex-column"*/}
      {/*          onClick={() => onPageChange(page)}*/}
      {/*        >*/}
      {/*          {page}*/}
      {/*        </button>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</nav>*/}
    </>
  );
};
PaginationMod.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationMod;
