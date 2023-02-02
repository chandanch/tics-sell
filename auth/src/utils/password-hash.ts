import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordHash {
	static async generateHash(password: string): Promise<string> {
		const salt = randomBytes(8).toString('hex');
		const hashBuffer = (await scryptAsync(password, salt, 64)) as Buffer;

		return `${hashBuffer.toString('hex')}.${salt}`;
	}

	static async compareHash(suppliedPassword: string, storedPassword: string) {
		const [storedPasswordHash, salt] = storedPassword.split('.');
		const suppliedPasswordHashBuffer = (await scryptAsync(
			suppliedPassword,
			salt,
			64
		)) as Buffer;

		return suppliedPasswordHashBuffer.toString('hex') === storedPasswordHash;
	}
}

PasswordHash.generateHash('dddd').then((data) => console.log(data));
