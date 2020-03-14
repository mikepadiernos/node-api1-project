// implement your API here
const express = require('express');
const cors = require('cors');
const id = require('shortid');
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

// HANDLER, POST - "/api/users"
server.post('/api/users', (request, response) => {
	const info = request.body;
	console.log("Users Info: ", info);

	db.insert(info)
		.then(user => {
			info.name && info.bio ? (
			response.status(201).json({success: true, user})
			) : (
				response.status(400).json({success: false, message: 'Please, provide name & bio.'})
			)
		})
		.catch(error => {
			response.status(500).json({success: false, message: 'User not saved', error})
		})
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

// HANDLER, DELETE - "/api/users/:id"
server.delete('/api/users/:id', (request, response) => {
	const {id} = request.params;

	db.remove(id)
		.then(user => {
			user ? (
				response.status(204).end()
				) : (
					response.status(404).json({ success: false, message: 'User not found' })
			)
		})
		.catch(error=> {
			response.status(500).json({ success: false, message: 'User can not be removed', error });
		});
});

// HANDLER, PUT - "/api/users/:id"
server.put('/api/users/:id', (request, response) => {
	const {id} = request.params;
	const info = request.body;

	db.update(id, info)
		.then( user => {
			console.log("User Update: ", user);
			info.name && info.bio && user ? (
				response.status(200).json({success: true, user})
			) : (
				response.status(404).json({success: false, message: 'User not found'})
			);
			console.log("Name: ", info.name);
		})
		.catch(error=> {
			response.status(500).json({ success: false, message: 'User can not be updated', error });
		});
});