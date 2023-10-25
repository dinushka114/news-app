'use client'

import { signIn, signOut } from "next-auth/react";
import Button from "../components/button/button";
import { useRouter } from "next/navigation";

export const LoginButton = () => {


    const router = useRouter();

    return (
        <Button type={'button'} btnText={'Login'} color={'bg-custom-blue'} onClick={signIn} />
    )
}

export const LogoutButton = () => {
    return (
        <Button type={'button'} btnText={'Logout'} color={'bg-red-700'} onClick={signOut} />
    )
}

export const customSignOut = async () => {
    try {

        await signOut();
        router.push('/auth/user/login');
    } catch (error) {

    }
}