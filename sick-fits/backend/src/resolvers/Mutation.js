const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO check auth
		return await ctx.db.mutation.createItem({
			data: {
				...args
			},
			info
		});
	},

	updateItem(parent, args, ctx, info) {
		const updates = {...args };
		delete updates.id;

		return ctx.db.mutation.updateItem({
			data: updates,
			where: {
				id: args.id
			},
			info
		});
	},

	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		const item = await ctx.db.query.item({ where }, `{ id title }`);
		// TODO check auth

		return ctx.db.mutation.deleteItem({ where }, info);
	}
};

module.exports = Mutations;
