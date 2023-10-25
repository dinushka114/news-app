import express from 'express';
import { createNewsArticle, deleteNewsArticle, getAllArticles, getArticleById, updateNewsArticle } from '../controllers/adminController.js';
import { checkAuth, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/articles', getAllArticles);
router.get('/article/:id', getArticleById)
router.post('/new-article', createNewsArticle);
router.put('/update-article/:id', updateNewsArticle);
router.delete('/delete-article/:id', deleteNewsArticle);

export default router;

