import React, {useState} from 'react';
import './filters.css';
import './forms.css';
const Filters = () => {
    const [time, setTime] = useState(0);
  
    const handleTimeChange = (e) => {
      // Ви можете додати логіку валідації часу тут
      setTime(e.target.value);
    };
  
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
        <label htmlFor="time-input">Time:</label>
        <div className="time-input-container">
          <input
            className="filter-input"
            type="number"
            name="time-input"
            id="time-input"
            value={time}
            onChange={handleTimeChange}
            autoComplete="off"
            placeholder="Enter time"
          />
        </div>
      </div>

      <div className="filter-item area">
        <label htmlFor="area-select">Area</label>
        <select className="filter-select" name="area-select" id="area-select">
          <option className="filter-select-option" value="1">AMERICAN</option>
          <option className="filter-select-option" value="2">ITALIAN</option>
          <option className="filter-select-option" value="2">MEXICAN</option>
          <option className="filter-select-option" value="2">ASIAN</option>
          <option className="filter-select-option" value="2">INDIAN</option>
          <option className="filter-select-option" value="2">FRENCH</option>
          <option className="filter-select-option" value="2">CHINESE</option>
          <option className="filter-select-option" value="2">JAPANESE</option>
          <option className="filter-select-option" value="2">KOREAN</option>
          <option className="filter-select-option" value="2">SPANISH</option>
          <option className="filter-select-option" value="2">GERMAN</option>
          <option className="filter-select-option" value="2">GREEK</option>
          <option className="filter-select-option" value="2">BRITISH</option>
          <option className="filter-select-option" value="2">OTHER</option>
        </select>
      </div>

      <div className="filter-item ingredients">
        <label htmlFor="ingredients-select">Level</label>
        <select
          className="filter-select"
          name="ingredients-select"
          id="ingredients-select"
        >
          <option className="filter-select-option" value="1">EASY</option>
          <option className="filter-select-option" value="2">INTERMEDIATE</option>
          <option className="filter-select-option" value="2">HARD</option>
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
