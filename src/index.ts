import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config as dotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import Routes from './routers';

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.plugins();
		this.routes();
		dotenv();
	}

	protected plugins(): void {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(compression());
	}

	protected routes(): void {
		this.app.use(Routes.UserRoutes);
		this.app.use(Routes.AuthRoutes);
		this.app.use(Routes.TodoRoutes);
	}
}

const port: number = 3000;
const app = new App().app;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(process.env.NODE_ENV);
});
