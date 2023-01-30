import mongoose from 'mongoose';
import { PasswordHash } from '../utils/password-hash';

// Describes all properties required to an create user
interface IUserCreate {
	email: string;
	password: string;
}

/**
 * @description Describes all the properties and methods(instance or statics)
 * that the User Mongoose Model must have
 */
interface IUserCreateModel extends mongoose.Model<IUser> {
	build(user: IUserCreate): IUser;
}

/**
 * @description Describes all the properties that the User Document must have
 */
interface IUser extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.__v;
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

userSchema.statics.build = (user: IUserCreate) => {
	return new User(user);
};

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashedPassword = await PasswordHash.generateHash(
			this.get('password')
		);
		this.set('password', hashedPassword);
	}

	done();
});

const User = mongoose.model<IUser, IUserCreateModel>('User', userSchema);

export { User };
