import React, { useEffect } from 'react';

const Modal = ({ imageUrl, onClose }) => {
  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
