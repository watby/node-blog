const db = require('../models');

class PostService {
	db;

	constructor(db) {
		this.db = db;
	}

	async getAllAsync() {
        let posts;
        try {
            posts = await this.db.posts.readPostsAsync();
        } catch (err) {
            throw ({status: 500, message: 'Database offline'});
        }

        return posts;
    }

    async getByIdAsync(id) {
        if (typeof id === 'undefined') {
            throw ({status: 400, message: 'No id provided'})
        }

        let post;
        try {
			const posts = await this.db.posts.readPostsAsync();
            post = posts.find(post => post.id === id);
        } catch (err) {
            throw ({status: 500, message: 'Database offline'})
        }

        if (!post) {
            throw ({status: 404, message: 'Post not found'});
        }

        return post;
    }

    async addAsync(data) {
		const posts = await this.db.posts.readPostsAsync();

        const post = {
            ...data,
            id: posts.length + 1
        };

		posts.push(post);

        await this.db.posts.writePostsAsync(posts);

        return post;
    }
}

module.exports = new PostService(db);
