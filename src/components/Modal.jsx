import React from 'react';

const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
