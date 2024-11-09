import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const authValidate = [
	check('username').isString(),
	check('password').isLength({ min: 6 }),
	(req: Request, res: Response, next: NextFunction): any => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).send({ errors: errors.array() });
		}

		return next();
	},
];
