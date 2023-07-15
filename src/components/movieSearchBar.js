import React, { useState } from "react";
import { YearPicker } from "react-dropdown-date";

/**
 * Search bar with text inputs for strings and year drop-down picker.
 * @param props
 * @returns {JSX.Element}
 * @constructor SearchBar
 */
export default function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [innerDate, setInnerDate] = useState("");

  return (
    <div className="searchBar">
      Movies Containing
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={(e) => setInnerSearch(e.target.value)}
      />
      In Year
      <YearPicker
        className="yearPicker"
        defaultValue={"Any Year"}
        start={1990}
        end={2023}
        reverse
        value={innerDate.year}
        onChange={(year) => {
          setInnerDate((prev) => ({ ...prev, year }));
        }}
        id={"year"}
        optionClasses={"option"}
      />
      <button
        className="card_btn"
        id="search-button"
        type="button"
        onClick={() =>
          props.setSearch({
            searchString: innerSearch,
            searchDate: `${innerDate.year}`,
          })
        }
      >
        {" "}
        Search{" "}
      </button>
    </div>
  );
}
