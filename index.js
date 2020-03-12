// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();

server.listen(4000, () => {
	console.log("Server is listening on port 4000");
});

server.use(express.json());
server.use(cors());

// HANDLER, GET - "/"
server.get('/', (request, response) => {
	response.send('Server... is go');
});

// HANDLER, GET - "/api/users"
server.get('/api/users', (request, response) => {
	db.find()
		.then(users => {
			response.status(200).json(users);
		})
		.catch(error => {
			response.status(500).json({success: false, error});
		})
});

// HANDLER, GET - "/api/users/:id"
server.get('/api/users/:id', (request, response) => {
	db.findById(request.params.id)
		.then(user => {
			user ? (
				response.status(200).json(user)
			) : (
				response.status(404).json({success: false, message: 'User not found'})
			)
		})
		.catch(error => {
			response.status(500).json({success: false, error});
		})
});