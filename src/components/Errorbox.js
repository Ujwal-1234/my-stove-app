import React from 'react';
import './an.css';

const Errorbox = ({ isOpen, onClose, children }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Errorbox;
