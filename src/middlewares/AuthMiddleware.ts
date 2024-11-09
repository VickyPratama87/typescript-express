import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
			status: 'Failed',
			message: 'Unauthorized',
		});
	}

	let secretKey = process.env.JWT_SECRET_KEY || 'secret';
	const token: string | any = req.headers.authorization?.split(' ')[1];

	try {
		const credential: string | object = jwt.verify(token, secretKey);

		if (credential) {
			req.app.locals.credential = credential;
			return next();
		}

		return res.status(400).json({
			status: 'Failed',
			message: 'Token invalid',
		});
	} catch (error) {
		return res.send(error);
	}
};
