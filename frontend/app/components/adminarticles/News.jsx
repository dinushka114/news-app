'use client'

import React, { useEffect } from 'react'
import AppContext from '../../../context/AppContext'
import { useContext } from 'react'
import TableHeader from "../tables/articletable/header/TableHeader"
import NewsTableRow from "../tables/articletable/tablerow/NewsTableRow"

const News = () => {

    const { newsArticles, setNewsArticles } = useContext(AppContext);

    const fetchNewsArticles = async () => {
        const response = await fetch("http://localhost:5000/api/admin/articles", {
            method: 'GET'
        })

        const res_json = await response.json();
        setNewsArticles(res_json);
    }

    useEffect(() => {
        fetchNewsArticles();
    }, [])



    return (
        <>
            <table className="min-w-full leading-normal">
                <TableHeader title={'Title'} content={'Content'} image={'Image'} isPublished={'Published or Draft'} updateNews={'Update'} deleteNews={'Delete'} />
                <tbody>
                    {
                        newsArticles.map((news, index) => {
                            return (
                                <NewsTableRow key={index} title={news.title} content={news.content} isPublished={news.isPublished} image={'http://localhost:5000/uploads/' + news.image} updateNews={''} deleteNews={news.news_id} />
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default News