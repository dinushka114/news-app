'use client'

import React from 'react'
import Button from '../button/button'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const Header = () => {

    const customSignOut = async () => {
        await signOut({
            callbackUrl:'/auth/user/login'
        });
    }

    return (
        <header className="header py-4">
            <div className="header-content flex items-center flex-row">
                <div className='ml-2'>
                    <div className="w-full">
                        <Link href={'/admin/dashboard/create'}>
                            <Button type={'button'} color={'bg-custom-blue'} btnText={'New'} />
                        </Link>
                    </div>
                </div>
                <div className='flex ml-auto'>
                    <Button type={'button'} color={'bg-red-700'} btnText={'Logout'} onClick={customSignOut} />
                </div>
            </div> <br />
            <hr />
        </header>
    )
}

export default Header