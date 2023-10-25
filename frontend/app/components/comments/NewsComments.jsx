'use client'

import React, { useEffect, useState } from 'react'
import TextInput from '../input/textinput/TextInput'
import Label from '../label/Label'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import TextArea from '../input/textarea/TextArea'
import Button from '../button/button'


const NewsComments = ({ comments, id }) => {

    console.log(comments);

    const [sessionData, setSessionData] = useState(null);
    const [comment, setComment] = useState('')
    const [newsComments, setComments] = useState(comments);

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

    const onSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/user/article/add-comment/${id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: sessionData.session.user.name,
                comment
            })
        })


        if (response.status == 201) {
            setComments([...newsComments, { user: sessionData.session.user.name, comment: comment }])
        }

        const json_res = await response.json();
        setComment('')
    }


    return (
        <div className='mb-10'>
            <h1 className='text-xl font-semibold'>Add new comment {`(${comments.length})`}</h1>
            {/* <h1>{sessionData.session.user.name}</h1> */}
            {
                status === "loading" ? <span> You need <Link className='font-bold' href={'/auth/user/login'}>login</Link> to add a comment </span> : <>
                    <form onSubmit={onSubmit} className='mb-6'>
                        <div className="mb-6 mt-6 md:mb-0 w-full">
                            <Label lbl={"comment"} />
                            <TextArea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={'Comment'} />
                        </div>

                        <div className="mb-6 mt-6 md:mb-0 w-full">
                            <Button type={'submit'} btnText={'Add comment'} color={'bg-custom-blue'} />
                        </div>
                    </form>
                </>
            }

            {
                newsComments.map((cm, index) => {
                    return (
                        <div key={index} className='p-4 rounded-lg border border-bg-custom-blue mt-2'>
                            <p className='text-lg'>{cm.comment}</p>
                            <p className='text-sm font-semibold italic'>By - {cm.user}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default NewsComments