import React, {useState} from 'react';
import './cardsgrid.css';
import './buttons.css';
import PopUp from '../PopUp/PopUp';

const CardsGrid = () => {
  // Assuming totalPages is the total number of pages you have
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="cards-grid">
      <PopUp currentPage={currentPage} handlePageChange={handlePageChange} />
      <div className="pag-wrap">
        <div className="btns-back">
          <div className="pag-start-btn pag-btn">
            <svg className="pag-arrow pag-arrow1">
              <use href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
            <svg className="pag-arrow pag-arrow2">
              <use className="arrow" href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
          </div>
          <div className="pag-back-btn pag-btn">
            <svg className="pag-back-arrow">
              <use href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
          </div>
        </div>
        <div className="btns-pages">
          <div className="pag-page-btn pag-btn">...</div>
        </div>
        <div className="btns-forward">
          <div className="pag-forward-btn pag-btn">
            <svg className="pag-back-arrow">
              <use href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
          </div>
          <div className="pag-forward-btn pag-btn">
            <svg className="pag-arrow pag-arrow1">
              <use href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
            <svg className="pag-arrow pag-arrow2">
              <use className="arrow" href="./img/sprite.svg#pagination-arrow"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsGrid;
