import React from 'react';
import './modalorder.css';
import './buttons.css';
import './forms.css';
import './modal-order.js'
const ModalOrder = ({ isOpen, onClose }) => {
  return (
    <div className={`modal-order ${isOpen ? '' : 'is-hidden'}`} data-order-popup>
      <div className="inner-container">
        <button className="close-btn" type="button" onClick={onClose}>
          <svg className="order-cls-icon" width="20" height="20">
            <use href="./img/sprite.svg#icon-x"></use>
          </svg>
        </button>

        <p className="title-order">Order now</p>

        <form className="form-order">
          <label className="field-order">
            <span className="sp-order">Name</span>
            <input type="text" name="name" className="input-order js-name" />
          </label>
          <label className="field-order">
            <span className="sp-order">Phone number</span>
            <input type="tel" name="phoneNumber" className="input-order js-number" />
          </label>
          <label className="field-order">
            <span className="sp-order">Email</span>
            <input type="email" name="email" className="input-order js-email" />
          </label>
          <label className="field-order">
            <span className="sp-order">Comment</span>
            <textarea name="comment" className="textarea-order input-order js-comment"></textarea>
          </label>
          <button
            type="submit"
            name="submit"
            className="btn btn-primary send-btn-order js-btn"
            disabled
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalOrder;
