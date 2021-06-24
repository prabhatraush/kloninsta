import React from 'react'
import './Modal.css';

function Modal(props) {

    const {closeModal} = props;

    return (
        <div className="model_bck">
            <div className="modal_container">
                <div className="modal_header">
                    <img
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                    />
                    <span className="closeBtn" onClick={closeModal}>×</span>
                </div>
                <div className="modal_body">
                   {props.children}
                </div>
                
            </div>
        </div>
    )
}

export default Modal
