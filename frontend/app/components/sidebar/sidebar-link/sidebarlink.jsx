import Link from 'next/link'
import React from 'react'
import SideBarBtn from '../sidebar-button/sidebarbtn'

const SideBarLink = ({ urlPath, btnName, icon }) => {
    return (
        <Link href={urlPath}>
            <li className="my-px">
                <SideBarBtn icon={icon} btnName={btnName} />
            </li>
        </Link>
    )
}

export default SideBarLink