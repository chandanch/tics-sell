import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordHash {
	static async generateHash(password: string): Promise<string> {
		const salt = randomBytes(8).toString('hex');
		const hashBuffer = (await scryptAsync(password, salt, 64)) as Buffer;

		return `${hashBuffer.toString('hex')}.${salt}`;
	}

	static decodeHash(suppliedPassword: string, storedPassword: string) {}
}

PasswordHash.generateHash('dddd').then((data) => console.log(data));
