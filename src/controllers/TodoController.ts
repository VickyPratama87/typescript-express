import { Request, Response } from 'express';
import IController from './ControllerInterface';
import TodoService from '../services/TodoService';

class TodoController implements IController {
	getAll = async (req: Request, res: Response): Promise<any> => {
		const service: TodoService = new TodoService(req);
		const todos = await service.getAllTodos();

		return res.status(200).json({
			status: 'Success',
			message: 'Todo list',
			data: todos,
		});
	};

	create = async (req: Request, res: Response): Promise<any> => {
		const service: TodoService = new TodoService(req);
		const todoData = await service.addTodo();

		return res.status(201).json({
			status: 'Success',
			message: 'Todo created successfully',
			data: todoData,
		});
	};

	read = async (req: Request, res: Response): Promise<any> => {
		const service: TodoService = new TodoService(req);
		const todo = await service.getTodoById();

		return res.status(200).json({
			status: 'Success',
			message: 'Todo detail',
			data: todo,
		});
	};

	update = async (req: Request, res: Response): Promise<any> => {
		const service: TodoService = new TodoService(req);
		await service.updateTodo();

		return res.status(200).json({
			status: 'Success',
			message: 'Todo updated successfully',
		});
	};

	delete = async (req: Request, res: Response): Promise<any> => {
		const service: TodoService = new TodoService(req);
		await service.deleteTodo();

		return res.status(200).json({
			status: 'Success',
			message: 'Todo deleted successfully',
		});
	};
}

export default new TodoController();
