'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Label from '../label/Label'
import TextInput from '../input/textinput/TextInput'
import Button from '../button/button'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'

import AppContext from '../../../context/AppContext'
import { useContext } from 'react'
import 'react-quill/dist/quill.snow.css';
import { API } from '../../../constants';
import Heading from '../text/Heading';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


const AdminUpdateNews = () => {

    const { id } = useParams()
    const router = useRouter()

    const { getSingleNewsArticle } = useContext(AppContext);
    const [image, setImage] = useState(null)
    const [newsData, setNewsData] = useState({
        title: '',
        content: '',
        isPublished: '',
        image: null
    })
    const [content, setContent] = useState('')

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };


    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

    const handleEditorChange = (newContent) => {
        setContent(newContent)
    };


    useEffect(() => {
        const news_article = getSingleNewsArticle(id);
        setImage(`${API}/uploads/` + news_article.image)
        setNewsData({ ...newsData, title: news_article.title, image: news_article.image })
        setContent(news_article.content)
    }, [])

    function handleChange(e) {
        console.log(e.target.files);
        setNewsData({ ...newsData, image: e.target.files[0] });
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (newsData.isPublished == "") {
            alert("Check publish or deaft")
        }

        let pubOrNot = newsData.isPublished === "pub" ? true : false;

        const formData = new FormData();
        formData.append("title", newsData.title);
        formData.append("content", content);
        formData.append("isPublished", pubOrNot);
        formData.append("image", newsData.image);

        try {
            const response = await fetch(`${API}/api/admin/update-article/${id}`, {
                method: "PUT",
                body: formData
            })

            const json_response = await response.json();
            console.log(json_response)

            if (response.status == 201) {
                router.push("/admin/dashboard")
            }
        } catch (err) {
            alert(err.message)
        }


    }

    return (
        <form onSubmit={onSubmit}>
            <Heading text={'Update'} />

            <div className="w-full mb-6 mt-6 md:mb-0">
                <Label lbl={"Image"} />
                <input type="file" accept="image/*" onChange={handleChange} className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-custom-blue file:text-white
                            hover:file:bg-blue-600
                            "/>
            </div>


            {
                image && <>
                    <Image alt='news image' src={image} className='w-1/5 mt-4 ' width={100} height={100} />
                </>
            }

            <div className="w-full mb-6 mt-6 md:mb-0">
                <Label lbl={"Title"} />
                <TextInput type={'text'} value={newsData.title} onChange={(e) => setNewsData({ ...newsData, title: e.target.value })} placeholder={'News title'} />
            </div>

            <div className="w-full mb-6 mt-6 md:mb-0">
                <Label lbl={"Content"} />
                <div className="h-full">
                    <QuillEditor
                        value={content}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        className="mt-10 h-[70%] bg-white"
                    />
                </div>

            </div>

            <div className="w-full mb-6 mt-6 md:mb-0">
                <Label lbl={"Publish"} />
                <div className="flex items-center mt-2">
                    <input value="pub" onChange={(e) => setNewsData({ ...newsData, isPublished: e.target.value })} id="default-checkbox" name='pub-or-draft' type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">Mark as publish</label>
                    <input value="draft" onChange={(e) => setNewsData({ ...newsData, isPublished: e.target.value })} id="default-checkbox" name='pub-or-draft' type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">Mark as draft</label>
                </div>
            </div>

            <div className="w-full mb-6 mt-6 md:mb-0">
                <Button type={'submit'} btnText={'Update'} color={'bg-custom-blue'} />
            </div>
        </form>
    )
}

export default AdminUpdateNews