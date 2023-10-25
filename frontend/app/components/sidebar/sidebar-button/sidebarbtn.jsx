import Image from 'next/image'
import React from 'react'

const SideBarBtn = ({ icon, btnName }) => {
    return (
        <div className='button_container hover:bg-custom-blue rounded-lg p-3'>
            <a
                href="#"
                className="flex flex-row items-center h-10 rounded-lg text-custom-text-gray "
            >
                <Image src={icon} alt="icon" />
                <span className="ml-3">{btnName}</span>
            </a>
        </div>
    )
}

export default SideBarBtn