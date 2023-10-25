import React from 'react'

const Label = ({ lbl }) => {
    return (
        <div className='mb-2'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name' htmlFor={lbl}>{lbl}</label>
        </div>
    )
}

export default Label