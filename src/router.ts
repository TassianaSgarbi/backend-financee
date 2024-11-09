import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { AddExpenseController } from './controllers/expense/AddExpenseController';
import { ListExpensesController } from './controllers/expense/ListExpensesController';
import { ListByCategoryController } from './controllers/expense/ListByCategoryController';

const router = Router();

router.post('/users', new CreateUserController().handle)

router.get('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.post('/category', isAuthenticated,  new CreateCategoryController().handle)

router.get('/categories', isAuthenticated,  new ListCategoryController().handle)

router.post('/expense', isAuthenticated,  new AddExpenseController().handle)

router.get('/expenses', isAuthenticated, new ListExpensesController().handle)

router.get('/category/expenses', isAuthenticated, new ListByCategoryController().handle)

export { router }