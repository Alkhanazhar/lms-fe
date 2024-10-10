import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, studentName }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-modal__overlay">
            <div className="delete-modal__content">
                <h5 className="delete-modal__title">Delete Confirmation</h5>
                <p>Are you sure you want to delete <strong>{studentName}</strong>?</p>
                <div className="delete-modal__actions">
                    <button className="delete-modal__btn delete-modal__btn--danger" onClick={onDelete}>
                        Delete
                    </button>
                    <button className="delete-modal__btn delete-modal__btn--secondary" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
