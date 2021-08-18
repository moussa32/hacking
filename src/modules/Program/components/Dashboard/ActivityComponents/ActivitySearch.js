import React from "react";
import { FaSearch } from "react-icons/fa";

const ActivitySearch = ({ searchValue, handleSearchValue }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="input-group-append position-relative">
          <FaSearch size={"1.4rem"} className="custom-input-icon" />
        </div>
        <input type="text" name="search" placeholder="بحث ...." value={searchValue} onChange={handleSearchValue} className="form-control activity-search-input custom-input input-with-icon bg-black border-0 rounded p-4" id="search" />
      </div>
    </div>
  );
};

export default ActivitySearch;
