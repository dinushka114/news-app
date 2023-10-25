import NewsComments from '../../components/comments/NewsComments';
import React from 'react'
import Navbar from '../../components/nav/Navbar';
import ReactHtmlParser from "react-html-parser";
import { API } from "../../../constants";

async function fetchArticle(id) {
    const response = await fetch(
        `${API}/api/user/article/${id}`,
        {
            cache: 'no-cache',
        }
    );

    const newsArticles = await response.json();
    return newsArticles;
}


const NewsArticle = async ({ params: { id } }) => {

    const article = await fetchArticle(id);
    return (
        <div>
            <Navbar />
            <header>
                <div class="w-full bg-cover bg-center" style={{ backgroundImage: `url(${API}/uploads/${article.image})`, height: '32rem' }}>
                    <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                        <div class="text-center">
                            <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">{article.title} <span class="underline text-blue-400 text-sm">by admin</span></h1>
                        </div>
                    </div>
                </div>
            </header>

            <div className='container mx-auto px-4 py-5'>
                <span className='font-bold'>{article.createdAt.substr(0, 10)}</span> <br />
                <p className='mt-4'>{ReactHtmlParser(article.content)}</p>

                <hr className='mt-10 mb-10' />

                <NewsComments comments={article.comments} id={id} />

            </div>
        </div>


    )
}

export default NewsArticle