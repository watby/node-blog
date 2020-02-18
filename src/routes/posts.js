const express = require('express');
const router = express.Router();

const postService = require('../services/postService');

router.get('/', (req, res) => {
	let data;
	try {
		data = postService.getAll();
	} catch(err) {
		res.status(500).send({ message: err.message });
	}

	res.send(data);
})

router.get('/:id', (req, res) => {
	let data;
	try {
		data = postService.getById(Number(req.params.id));
	} catch(err) {
		res.status(err.status).send({ message: err.message });
	}

	res.send(data);
})

router.post('/', (req, res) => {
	let data;
	try {
		data = postService.insert(req.body);
	} catch(err) {
		res.status(500).send({ message: err.message });
	}

	res.send(data);
})

module.exports = router;