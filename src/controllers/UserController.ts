import { Request, Response } from 'express';
import IController from './ControllerInterface';

let data: any[] = [
	{ id: 1, name: 'Vicky', email: 'vicky@gamil.com' },
	{ id: 2, name: 'Meysa', email: 'meysa@gamil.com' },
	{ id: 3, name: 'Puput', email: 'puput@gamil.com' },
	{ id: 4, name: 'Cholid', email: 'cholid@gamil.com' },
	{ id: 5, name: 'Salome', email: 'salome@gamil.com' },
];

class UserController implements IController {
	getAll(req: Request, res: Response): any {
		return res.send(data);
	}

	create(req: Request, res: Response): any {
		const { id, name, email } = req.body;
		data.push({ id, name, email });

		return res.send('Success Created Data');
	}

	read(req: Request, res: Response): any {
		const { id } = req.params;
		let person = data.find((item) => item.id == id);

		return res.send(person);
	}

	update(req: Request, res: Response): any {
		const { id } = req.params;
		const { name, email } = req.body;

		let person = data.find((item) => item.id == id);
		person.name = name;
		person.email = email;

		return res.send('Success Updated Data');
	}

	delete(req: Request, res: Response): any {
		const { id } = req.params;
		let person = data.filter((item) => item.id != id);

		return res.send(person);
	}
}

export default new UserController();
