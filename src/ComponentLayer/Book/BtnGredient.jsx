import React from 'react';

function BtnGredient({onClick,children,color ,hover }) {

    return (
        <>
            <button onClick={onClick} className={`btn rounded-[50px] border-none shadow-lg bg-gradient-to-r ${color} ${hover} transition-all ease-in-out duration-100`}>
                {children}
            </button>
            
        </>
    )
}

export default BtnGredient
