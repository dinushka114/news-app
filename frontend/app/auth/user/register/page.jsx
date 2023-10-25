import UserRegisterForm from '../../../components/forms/UserRegisterForm'
import React from 'react'
import Navbar from '../../../components/nav/Navbar'

const UserRegister = () => {
  return (
    <>
      <Navbar />
      <div className='w-screen flex justify-center items-center'>
        <div className="p-4 mt-20 bg-white rounded-md text-black w-[600px] shadow-lg">

          <h1 className='text-2xl font-semibold'>Register</h1>

          <UserRegisterForm />

        </div>

      </div>
    </>
  )
}

export default UserRegister