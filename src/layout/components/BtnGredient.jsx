import React, { useState } from 'react';

function BtnGredient({ onClick, children }) {

    return (
        <>
            <button onClick={onClick} className="btn rounded-[50px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#00D9FF] hover:to-[#a5cef3] transition-all ease-in-out duration-100">
                {children}
            </button>
        </>
    )
}

export default BtnGredient
