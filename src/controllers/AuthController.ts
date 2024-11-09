import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
	register = async (req: Request, res: Response): Promise<any> => {
		const service: AuthService = new AuthService(req);
		await service.register(res);
	};

	login = async (req: Request, res: Response): Promise<any> => {
		const service: AuthService = new AuthService(req);
		await service.login(res);
	};

	profile = async (req: Request, res: Response): Promise<any> => {
		const service: AuthService = new AuthService(req);
		await service.profile(res);
	};
}

export default new AuthController();
