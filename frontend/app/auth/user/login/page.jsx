import UserLoginForm from "../../../components/forms/UserLoginForm"
import Navbar from '../../../components/nav/Navbar'
import React from 'react'

const UserLogin = () => {
    return (
        <>
            <Navbar />
            <div className='w-screen flex justify-center items-center '>
                <div className="p-4 mt-20 bg-white rounded-md text-black w-[500px]">

                    <h1 className='text-2xl font-semibold'>Login</h1>

                    <UserLoginForm />

                </div>

            </div>
        </>
    )
}

export default UserLogin