import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
	public static passwordHash = (password: string): Promise<string> => {
		return bcrypt.hash(password, 10);
	};

	public static passwordCompare = async (passwordInput: string, encryptedPassword: string): Promise<boolean> => {
		let result = await bcrypt.compare(passwordInput, encryptedPassword);
		return result;
	};

	public static generateToken = (id: number, username: string, password: string): string => {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'secret';
		const token = jwt.sign({ id, username, password }, secretKey);
		return token;
	};
}

export default Authentication;
