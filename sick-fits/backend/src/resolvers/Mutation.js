const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO check auth
		return await ctx.db.mutation.createItem({
			data: {
				...args
			},
			info
		});
	}
};

module.exports = Mutations;
