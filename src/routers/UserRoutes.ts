import BaseRoutes from './BaseRoutes';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

class UserRoutes extends BaseRoutes {
	public routes(): void {
		const BaseUrl = '/api/v1/users';
		this.router.get(`${BaseUrl}/`, authMiddleware, UserController.getAll);
		this.router.post(`${BaseUrl}/`, UserController.create);
		this.router.get(`${BaseUrl}/:id`, UserController.read);
		this.router.put(`${BaseUrl}/:id`, UserController.update);
		this.router.delete(`${BaseUrl}/:id`, UserController.delete);
	}
}

export default new UserRoutes().router;
