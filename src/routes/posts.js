const express = require('express');
const router = express.Router();

const postService = require('../services/postService');

router.get('/', async (req, res) => {
	let data;
	try {
		data = await postService.getAllAsync();
	} catch(err) {
		res.status(500).send({ message: err.message });
	}

	res.send(data);
});

router.get('/:id', async (req, res) => {
	let data;
	try {
		data = await postService.getByIdAsync(Number(req.params.id));
	} catch(err) {
		res.status(err.status).send({ message: err.message });
	}

	res.send(data);
});

router.post('/', async (req, res) => {
	let data;
	try {
		data = await postService.addAsync(req.body);
	} catch(err) {
		res.status(500).send({ message: err.message });
	}

	res.send(data);
});

module.exports = router;
