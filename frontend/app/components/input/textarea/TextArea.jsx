import React from 'react'

const TextArea = ({ placeholder , value , onChange }) => {
    return (
        <textarea value={value} onChange={onChange} rows={10} className='appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' placeholder={placeholder}></textarea>
    )
}

export default TextArea