import BaseRoutes from './BaseRoutes';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authValidate } from '../middlewares/AuthValidator';

class AuthRoutes extends BaseRoutes {
	public routes(): void {
		const BaseUrl = '/api/v1/auth';
		this.router.post(`${BaseUrl}/register`, authValidate, AuthController.register);
		this.router.post(`${BaseUrl}/login`, authValidate, AuthController.login);
		this.router.get(`${BaseUrl}/logout`, AuthController.logout);
		this.router.get(`${BaseUrl}/profile`, authMiddleware, AuthController.profile);
	}
}

export default new AuthRoutes().router;
