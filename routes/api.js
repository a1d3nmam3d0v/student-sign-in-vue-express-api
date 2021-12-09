let express = require('express')
let db = require('../models') 
let Student = db.Student

let router = express.Router()

router.get('/students', function (req, res, next) { 			 
	Student.findAll( {order: ['present','starID']}).then( students => {
		return res.json(students) //	↖ sorted by present, starID             				  
	}).catch( err => next(err)) 
})

router.post('/students', function (req, res, next) {
	Student.create(req.body).then( (data) => { // req.body contains JSON from Vue client 
		return res.status(201).send('ok')	// 201 response = created
	}).catch(err => {
		// User errors:
		// respond w/ 400 Bad Request err code, include err msgs
		if (err instanceof db.sequelize.ValidationError) {
			let messages = err.errors.map((e) => e.message)
			return res.status(400).json(messages)
		}
		return next(err) // otherwise, unexpected (Server err)
	})
})
// patch = edit
router.patch('/students/:id', function (req, res, next) {
	let studentID = req.params.id 
	let updatedStudent = req.body 
	Student.update(updatedStudent, { where: { id: studentID }})
		.then( (rowsModified) => {
			
			let numberOfRowsModified = rowsModified[0] 
												// # of rows change-
			if (numberOfRowsModified == 1) {	// if 1 row is changed
				return res.send('OKAY')			// no error
			}
			// If student not found: 
			else {
				return res.status(404).json(['STUDENT WITH THAT ID NOT FOUND'])
			}
		})
		// If validation err = bad req (no name, starID etc)
		.catch(err => { 
			if (err instanceof db.sequelize.ValidationError) {
				let messages = err.errors.map(e => e.message)
				return res.status(400).json(messages)
				// otherwise, its an unexpected err
			} else {
				return next(err) // pass on to err handler
		}
	})  
})
router.delete('/students/:id', function (req, res, next) {
	let studentID = req.params.id
	Student.destroy( { where: { id: studentID }})
		.then((rowsDeleted) => {
			if (rowsDeleted == 1) {
				return res.send('OKAY')
			} else {
				return res.status('400').json(['NOT FOUND'])
			}
		})
		.catch(err => next(err)) // Unexpected errorz
})
module.exports = router 
// any code below this⤴ line = ignored

// types of requests:
// get - tells server to fetch something
// post - creates data
// patch - modifies data
// delete - deletes data

// 404 Not Found- server is unable to do the req
// Error 500- server err
// Successful msgs start with 200 
// Returning JSON code = Success = 200 = Numeric code reply not necessary

//curl http://127.0.0.1:3000/api/students (all students)
