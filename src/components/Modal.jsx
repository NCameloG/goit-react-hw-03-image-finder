import React from 'react';

const Modal = ({ imageUrl, onClose }) => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.getElementById({onClose}).checked = true;
    }
  });
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
