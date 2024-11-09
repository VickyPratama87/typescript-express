import { Request } from 'express';
const db = require('../db/models');

class TodoService {
	credential: {
		id: number;
	};
	body: Request['body'];
	params: Request['params'];

	constructor(req: Request) {
		this.credential = req.app.locals.credential;
		this.body = req.body;
		this.params = req.params;
	}

	getAllTodos = async () => {
		const todos = await db.todo.findAll({
			where: {
				user_id: this.credential.id,
			},
			attributes: ['id', 'description', 'createdAt', 'updatedAt'],
		});

		return todos;
	};

	addTodo = async () => {
		const { description } = this.body;

		const todo = await db.todo.create({
			user_id: this.credential.id,
			description,
		});

		return todo;
	};

	getTodoById = async () => {
		const { id } = this.params;

		const todo = await db.todo.findOne({
			where: {
				user_id: this.credential.id,
				id,
			},
		});

		return todo;
	};

	updateTodo = async () => {
		const { id } = this.params;
		const { description } = this.body;

		const todo = await db.todo.update(
			{
				description,
			},
			{
				where: {
					user_id: this.credential.id,
					id,
				},
			}
		);

		return todo;
	};

	deleteTodo = async () => {
		const { id } = this.params;

		const todo = await db.todo.destroy({
			where: {
				user_id: this.credential.id,
				id,
			},
		});

		return todo;
	};
}

export default TodoService;
