import React from 'react'

const Button = ({ btnText, color, onClick, type }) => {
    return (
        <button type={type} onClick={onClick} className={`w-32 custom_button ${color} p-3 text-white  rounded-lg text-xs`}>
            {btnText}
        </button>
    )
}

export default Button