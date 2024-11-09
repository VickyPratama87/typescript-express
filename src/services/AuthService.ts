import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';

class AuthService {
	credential: number;
	body: Request['body'];

	constructor(req: Request) {
		this.body = req.body;
		this.credential = req.app.locals.credential;
	}

	register = async (res: Response) => {
		const { username, password } = this.body;
		const hashedPassword: string = await Authentication.passwordHash(password);

		const createdUser = await db.user.create({
			username,
			password: hashedPassword,
		});

		return res.status(201).json({
			message: 'Register Success',
			data: createdUser,
		});
	};

	login = async (res: Response) => {
		// Get username and password from req.body
		let { username, password } = this.body;

		const user = await db.user.findOne({
			where: {
				username,
			},
		});

		// check password
		let isPasswordMatch = await Authentication.passwordCompare(password, user.password);

		// generate token
		if (!isPasswordMatch) {
			return res.status(400).json({
				status: 'Failed',
				message: 'Username or password is incorrect',
			});
		} else {
			let token = Authentication.generateToken(user.id, username, user.password);
			return res.status(200).json({
				message: 'Login Success',
				token,
			});
		}
	};

	profile = async (res: Response) => {
		const dataProfile = this.credential;
		return res.status(200).json({
			message: 'My Profile',
			data: dataProfile,
		});
	};
}

export default AuthService;
