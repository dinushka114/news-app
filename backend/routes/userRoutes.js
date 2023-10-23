import express from 'express';
import { addComment, getAllArticles, getArticleById } from '../controllers/userController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/articles', getAllArticles);
router.get('/article/:id', getArticleById);
router.post('/article/add-comment/:id', checkAuth, addComment);

export default router;