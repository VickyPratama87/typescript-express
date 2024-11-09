import BaseRoutes from './BaseRoutes';
import TodoController from '../controllers/TodoController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { todoValidate } from '../middlewares/TodoValidator';

class TodoRoutes extends BaseRoutes {
	public routes(): void {
		const BaseUrl = '/api/v1/todo';
		this.router.get(`${BaseUrl}/`, authMiddleware, TodoController.getAll);
		this.router.post(`${BaseUrl}/`, authMiddleware, todoValidate, TodoController.create);
		this.router.get(`${BaseUrl}/:id`, authMiddleware, TodoController.read);
		this.router.put(`${BaseUrl}/:id`, authMiddleware, todoValidate, TodoController.update);
		this.router.delete(`${BaseUrl}/:id`, authMiddleware, TodoController.delete);
	}
}

export default new TodoRoutes().router;
