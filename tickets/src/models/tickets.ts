import mongoose from 'mongoose';

/**
 * @desc represents the properties of a ticket which is used to generate the ticket document
 */
interface TicketAttrs {
	title: string;
	price: number;
	userId: string;
}

/**
 * @desc represents the mongo db document
 */
interface TicketDocument extends mongoose.Document {
	title: string;
	price: number;
	userId: string;
}

/**
 * @desc represents a mongoose model and consists of all properties & methods(instance or statics)
 */
interface TickerModel extends mongoose.Model<TicketDocument> {
	build(ticket: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

ticketSchema.statics.build = (ticketAttrs: TicketAttrs) => {
	return new Ticket(ticketAttrs);
};

const Ticket = mongoose.model<TicketDocument, TickerModel>(
	'Ticket',
	ticketSchema
);

export { Ticket };
