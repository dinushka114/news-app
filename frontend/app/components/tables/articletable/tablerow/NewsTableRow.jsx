'use client'

import Image from 'next/image'
import React from 'react'
import Button from '../../../button/button'

import AppContext from "../../../../../context/AppContext"
import { useContext } from 'react'
import { useRouter } from 'next/navigation'


const StudentTableRow = ({ title, content, image, isPublished, updateNews, deleteNews }) => {

    const { deleteNewsArticle } = useContext(AppContext);

    const router = useRouter();

    const toUpdatePage=(id)=>{
        router.push(`/admin/dashboard/update/${id}`)
    }

    const deleteSingleNews = async (id) => {
        deleteNewsArticle(id)

        const response = await fetch(`http://localhost:5000/api/admin/delete-article/${id}`, {
            method: 'DELETE'
        })

        const res_json = await response.json();
        console.log(res_json);
    }

    return (
        <tr className='text-center'>
            <td className="px-2 py-2 border-b  border-gray-200 bg-white text-sm">
                {title}
            </td>
            <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{content.substr(0, 25)}</p>
            </td>
            <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap"><Image src={image} alt='image' width={100} height={80} /></p>
            </td>

            <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-6 py-3 font-semibold text-green-900 leading-tight"
                >
                    <span
                        aria-hidden
                        className={`absolute inset-0 ${isPublished ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-xl`}
                    ></span>
                    <span className="relative">{isPublished ? 'PUBLISHED' : 'DRAFT'}</span>
                </span>
            </td>
            <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                <Button btnText={'Update'} color={'bg-green-700'} onClick={()=>toUpdatePage(deleteNews)} />
            </td>

            <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                <Button btnText={'Delete'} color={'bg-red-700'} onClick={() => deleteSingleNews(deleteNews)} />
            </td>
        </tr>
    )
}

export default StudentTableRow