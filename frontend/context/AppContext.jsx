'use client'
import { createContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {

    const [newsArticles, setNewsArticles] = useState([])

    const addNewsArticle = (id, title, content, image, isPublished) => {
        setNewsArticles((prev) => [...prev, { id, title, content, image, isPublished }])
    }

    const deleteNewsArticle = (id) => {
        const filteredNewsArticle = newsArticles.filter(news => news.news_id !== id);
        setNewsArticles(filteredNewsArticle)
    }

    const getSingleNewsArticle = (id) => {
        const article = newsArticles.find(news => news.news_id === id);
        return article;
    }


    return (

        <AppContext.Provider value={{ newsArticles, setNewsArticles, addNewsArticle, deleteNewsArticle , getSingleNewsArticle }}>{children}</AppContext.Provider>
    )
}


export default AppContext;