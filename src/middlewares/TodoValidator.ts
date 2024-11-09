import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const todoValidate = [
	check('description').isString(),
	(req: Request, res: Response, next: NextFunction): any => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).send({ errors: errors.array() });
		}

		return next();
	},
];
