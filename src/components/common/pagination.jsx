import React from "react";
import _ from 'lodash'; 
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {itemsCount, pageSize, onPageChange, currentPage} = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1); 

  if (pagesCount === 1) return null;
 
  // [1,...pagesCount].map()

  return (
    <nav>
      <ul className="pagination">

        {pages.map(pageNum => (
          <li key={pageNum} 
            className={pageNum === currentPage ? 'page-item active':'page-item'} 
          >
            <a onClick={ () => onPageChange(pageNum)} 
              className="page-link"
            >
              {pageNum}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
