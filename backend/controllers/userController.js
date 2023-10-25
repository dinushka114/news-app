import asyncHandler from 'express-async-handler';
import News from "../models/newsModel.js";

const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await News.find({ isPublished: true });
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

const addComment = asyncHandler(async (req, res) => {

    try {
        const { name, comment } = req.body;

        const articleId = req.params.id;

        const newsArticle = await News.findOne({ _id: articleId });

        const newComment = {
            user: name,
            comment
        }

        newsArticle.comments.push(newComment);
        const updatedArticle = await newsArticle.save();

        if (updatedArticle) {
            res.status(201).json({ message: "Commented" })
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    } catch (err) {
        console.log(err)
    }

})

export { getAllArticles, getArticleById, addComment };