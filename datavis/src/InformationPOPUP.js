import React from 'react'


function removeAnimation(e) {
    e.target.style.animation = 0;
}

export default function InformationPopup({ children }) {

    return (
        <div className="information-popup">
            <div onMouseEnter={removeAnimation}>i</div>
            <div>
                {children}
            </div>
        </div>
    )
}
