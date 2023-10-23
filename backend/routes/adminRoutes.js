import express from 'express';
import { createNewsArticle, deleteNewsArticle, getAllArticles, getArticleById, updateNewsArticle } from '../controllers/adminController.js';
import { checkAuth, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/articles', checkAuth, checkRole(['Admin']), getAllArticles);
router.get('/article/:id', checkAuth, checkRole(['Admin']), getArticleById)
router.post('/new-article', checkAuth, checkRole(['Admin']), createNewsArticle);
router.put('/update-article/:id', checkAuth, checkRole(['Admin']), updateNewsArticle);
router.delete('/delete-article/:id', checkAuth, checkRole(['Admin']), deleteNewsArticle);

export default router;

