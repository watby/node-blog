const db = require('../models');

class PostService {
	getAll(){
		let data;
		try {
			data = db.posts;
		} catch(err) {
			throw ({ status: 500, message: 'Database offline' });
		}

		return data;
	}

	getById(id){
		if (typeof id === 'undefined') {
			throw ({ status: 400, message: 'No id provided' })
		}

		let post;
		try {
			post = db.posts.find(post => post.id === id);
		} catch(err){
			throw ({ status: 500, message: 'Database offline' })
		}
		
		if(!post){
			throw ({ status: 404, message: 'Post not found' });
		}

		return post;
	}

	insert(data){
		const post = {
			...data,
			id: db.posts.length + 1
		}

		db.posts.push(post);

		return post;
	}
}

module.exports = new PostService();