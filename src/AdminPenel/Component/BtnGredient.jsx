import React from 'react'

function BtnGredient({btnType,Icon}) {
    return (
        <button className="btn rounded-[50px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] hover:from-[#4f818b] hover:to-[#a5cef3] hover:transition-colors delay-200">
            <div className="iconContainer">
                {Icon}
            </div>
            <p>{btnType}</p>
        </button>
    )
}

export default BtnGredient