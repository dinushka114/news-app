'use client'

import React, { useState } from 'react'
import Label from '../label/Label'
import TextInput from '../input/textinput/TextInput'
import Button from '../button/button'
import { useRouter } from 'next/navigation'

const UserRegisterForm = () => {

    const router = useRouter();

    const [userData , setUserData] = useState({
        name:'',
        email:'',
        password:''
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch("http://localhost:5000/api/auth/register" , {
                method:'POST',
                body:JSON.stringify({
                    name:userData.name,
                    email:userData.email,
                    password:userData.password
                }),
                headers:{"Content-Type":"application/json"}
            })

            const res_json = await res.json();

            if(res.status!=201){
                alert(res_json.message)
            }else{
                router.push("/auth/user/login")
            }

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"name"} />
                <TextInput value={userData.name} onChange={(e)=>setUserData({...userData , name:e.target.value})} type={'text'} placeholder={'name'} />
            </div>

            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"email"} />
                <TextInput value={userData.email} onChange={(e)=>setUserData({...userData , email:e.target.value})} type={'email'} placeholder={'email'} />
            </div>

            <div className="mb-6 mt-6 md:mb-0 w-full">
                <Label lbl={"password"} />
                <TextInput value={userData.password} onChange={(e)=>setUserData({...userData , password:e.target.value})} type={'password'} placeholder={'password'} />
            </div>

            <div className='mb-6 mt-6 md:mb-0 w-full'>
                <Button type={'submit'} btnText={'Register'} color={'bg-custom-blue'} />
            </div>
        </form>
    )
}

export default UserRegisterForm