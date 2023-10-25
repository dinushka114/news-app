import React from 'react'

const TextInput = ({ type, placeholder, onChange , value }) => {
    return (
        <input onChange={onChange} value={value} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type={type} placeholder={placeholder} />
    )
}

export default TextInput