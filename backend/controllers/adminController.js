import asyncHandler from 'express-async-handler';
import News from '../models/newsModel.js';


const createNewsArticle = asyncHandler(async (req, res) => {

    const newNewsArticle = await News.create({ ...req.body });

    if (newNewsArticle) {
        res.status(201).json({ message: "New article created" })
    } else {
        res.status(401);
        throw new Error('Something went wrong');
    }

})

const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await News.find();
    res.status(200).json(articles);
})

const getArticleById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const newsArticle = await News.findOne({ _id: id });

    if (newsArticle) {
        res.status(200).json(newsArticle)
    } else {
        res.status(404);
        throw new Error('News artile not found');
    }

})

const updateNewsArticle = asyncHandler(async (req, res) => {

    // get the news article id from url params
    const id = req.params.id;

    // fetch the news article of given id
    const newsArticle = await News.findById(id);

    if (newsArticle) {
        newsArticle.title = req.body.title;
        newsArticle.content = req.body.content;
        newsArticle.isPublished = req.body.isPublished;

        const updatedNewsArticle = await newsArticle.save();

        res.status(201).json({
            message: "News article updated"
        })

    } else {
        res.status(404);
        throw new Error('News article not found');
    }

})

const deleteNewsArticle = asyncHandler(async (req, res) => {
    // get the news article id from url params
    const id = req.params.id;

    const isDeleted = await News.deleteOne({ _id: id });

    if (isDeleted.deleteCount == 1) {
        res.status(201).json({
            message: "News article deleted"
        })
    } else {
        res.status(404);
        throw new Error('News article not found');
    }


})


export { createNewsArticle, updateNewsArticle, deleteNewsArticle, getArticleById, getAllArticles };