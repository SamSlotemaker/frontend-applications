import React from 'react'

export default function ScrollButton({ scrollDirection }) {

    function handleScrollButtonDown() {
        let pageHeight = window.innerHeight;
        window.scrollBy(0, pageHeight);
    }

    function handleScrollButtonUp() {
        let pageHeight = window.innerHeight;
        window.scrollBy(0, -pageHeight);
    }

    return (
        <>
            {scrollDirection === 1 && <button className="scroll-button up" onClick={handleScrollButtonUp}>Up!</button>}
            {scrollDirection === 2 && <button className="scroll-button down" onClick={handleScrollButtonDown}>Next!</button>}
        </>
    )
}
