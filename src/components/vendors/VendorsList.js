import React from "react";
import PropTypes from "prop-types";
import List from '../common/List';
import * as styles from './styles/styles.css';
const VendorList = ({ vendors, onClick, displayCount, loadMoreLabel }) => (
  <div className="form-group">
    <div>
      <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">*</th>
          <th scope="col">Title</th>
          <th scope="col">Is Game Live</th>
        </tr>
        </thead>
        <tbody>
          <List values = {vendors.slice(0, displayCount)}></List>            
        </tbody>
      </table>
    </div>
    <div className="form-group">
      {onClick ? <td><button type="button" onClick={onClick} className="btn btn-primary btn-lg"> {loadMoreLabel} </button></td> : null}
    </div>
  </div>
);

VendorList.propTypes = {
  vendors: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  displayCount: PropTypes.number,
};

export default VendorList;
