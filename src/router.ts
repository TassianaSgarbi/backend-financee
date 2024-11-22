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
import { DeleteCategoryController } from './controllers/category/DeleteCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';
import { DetailExpenseController } from './controllers/expense/DetailExpenseController';
import { PayExpenseController } from './controllers/expense/PayExpenseController';
import { DeleteExpenseController } from './controllers/expense/DeleteExpenseService';
import { EditUserController } from './controllers/user/EditUserController';



const router = Router();

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.put('/user/edit', isAuthenticated, new EditUserController().handle)

router.post('/expense', isAuthenticated,  new AddExpenseController().handle)

router.get('/expenses', isAuthenticated, new ListExpensesController().handle)

router.get('/expense/detail', isAuthenticated, new DetailExpenseController().handle)

router.get('/category/expenses', isAuthenticated, new ListByCategoryController().handle)

router.put('/expense/status', isAuthenticated, new PayExpenseController().handle)

router.delete('/delete-expense', isAuthenticated, new DeleteExpenseController().handle)

router.post('/category', isAuthenticated,  new CreateCategoryController().handle)

router.get('/categories', isAuthenticated,  new ListCategoryController().handle)

router.delete('/delete-category', isAuthenticated, new DeleteCategoryController().handle)

router.put('/category/edit', isAuthenticated, new EditCategoryController().handle)

export { router }