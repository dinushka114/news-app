'use client'

import Link from 'next/link'
import React, { useEffect , useState } from 'react'
import { useSession } from 'next-auth/react'
import { LogoutButton } from '../../auth/auth'

const Navbar = () => {
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const getUserName = async () => {
            const response = await fetch("/api", {
                method: "GET"
            })

            const res_json = await response.json();
            setSessionData(res_json)
        }
        getUserName();
    }, [])


    const { status } = useSession({
        required: true,
        onUnauthenticated() {

        }
    })

    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex container flex-wrap items-center justify-between mx-auto p-4">

                <Link href={'/'} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WNN</Link>

                <div className="w-full md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            status === "loading" ? <> <li>
                                <Link href={'/auth/user/login'} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Login</Link>
                            </li>

                                <li>
                                    <Link href={'/auth/user/register'} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                                </li></> : <li>
                                <LogoutButton />
                            </li>
                        }


                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar