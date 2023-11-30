import React from 'react';
import './filters.css';
import './forms.css';
const Filters = () => {
  return (
    <div className="filters">
      <div className="filter-item search">
        <label htmlFor="filter-search">Search</label>
        <input
          className="filter-search"
          type="text"
          name="filter-search"
          id="filter-search"
          autoComplete="off"
          placeholder="Enter text"
        />
        <svg className="search-icon" width="18" height="18">
          <use href="../img/sprite.svg#search-dandruff"></use>
        </svg>
      </div>

      <div className="filter-item time">
        <label htmlFor="time-select">Time</label>
        <select className="filter-select" name="time-select" id="time-select">
          <option className="filter-select-option" value="1">40 min</option>
          <option className="filter-select-option" value="2">10 min</option>
        </select>
      </div>

      <div className="filter-item area">
        <label htmlFor="area-select">Area</label>
        <select className="filter-select" name="area-select" id="area-select">
          <option className="filter-select-option" value="1">French</option>
          <option className="filter-select-option" value="2">Italian</option>
        </select>
      </div>

      <div className="filter-item ingredients">
        <label htmlFor="ingredients-select">Ingredients</label>
        <select
          className="filter-select"
          name="ingredients-select"
          id="ingredients-select"
        >
          <option className="filter-select-option" value="1">Tomato</option>
          <option className="filter-select-option" value="2">Cucumber</option>
        </select>
      </div>

      <div className="reset-container">
        <button type="button" className="reset-filters js-reset-filters">
          <svg width="16" height="16">
            <use href="./img/sprite.svg#cross-close-modal"></use>
          </svg>
          Reset the filter
        </button>
      </div>
    </div>
  );
};

export default Filters;
