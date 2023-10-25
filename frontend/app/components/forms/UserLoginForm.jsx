'use client'

import React, { useState } from 'react'
import Label from '../label/Label'
import TextInput from '../input/textinput/TextInput'
import Button from '../button/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const UserLoginForm = () => {

    const[signError , setError] = useState('');

    const {error} = useSearchParams();
    

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: ''

    })

    const onSubmit = async (e) => {
        e.preventDefault();

        if (userData.role != "") {
            if(userData.role=="User"){
                signIn("credentials", {
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                    callbackUrl: '/'
                })
            }else{
                signIn("credentials", {
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                    callbackUrl: '/admin/dashboard'
                })
            }
    
        }else{
            alert("Select the role")
        }
    }

    return (
        <form onSubmit={onSubmit}>
            {
                signError && "Error"
            }
            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"email"} />
                <TextInput value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type={'email'} placeholder={'email'} />
            </div>

            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"password"} />
                <TextInput value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type={'password'} placeholder={'password'} />
            </div>

            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"I am"} />
                <select className='bg-white appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
                    <option value={""}>Select the role</option>
                    <option value={"Admin"}>Admin</option>
                    <option value={"User"}>User</option>
                </select>
            </div>


            <div className='mb-6 mt-6 md:mb-0 w-full'>
                <Button type={'submit'} btnText={'Login'} color={'bg-custom-blue'} />
            </div>
        </form>
    )
}

export default UserLoginForm