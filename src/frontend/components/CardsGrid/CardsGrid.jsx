import React, {useState} from 'react';
import './cardsgrid.css';
import './buttons.css';
import PopUp from '../PopUp/PopUp';

const CardsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="cards-grid">
      <PopUp currentPage={currentPage} handlePageChange={handlePageChange} />

    </div>
  );
};

export default CardsGrid;