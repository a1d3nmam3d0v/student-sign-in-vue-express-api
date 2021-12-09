let express = require('express')
let db = require('../models') 
let Student = db.Student


let router = express.Router()


router.get('/students', function (req, res, next) { 			      //fetches student data
	Student.findAll( {order: ['present','name']}).then( students => { // and converts
		return res.json(students)                   				  // into json
	}).catch( err => next(err))
})


router.post('/students', function (req, res, next) {
	Student.create(req.body).then( (data) => { // req.body contains json from Vue client in the req 
		return res.status(201).send('ok') // always send response (201 = created)
	}).catch(err => {
		// User errors:
		// respond w/ 400 Bad Request err code, include err msgs
		if (err instanceof db.sequelize.ValidationError) {
			let messages = err.errors.map((e) => e.message)
			return res.status(400).json(messages)
		}
		//otherwise, unexpected (server err) 
		return next(err)
	})
})

// patch = edit a student
router.patch('/students/:id', function (req, res, next) {
	let studentID = req.params.id 
	let updatedStudent = req.body 
	Student.update(updatedStudent, { where: { id: studentID }})
		.then( (rowsModified) => {
			
			let numberOfRowsModified = rowsModified[0] 
												// # of rows change
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
				return next(err) // passed on to err handler
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

// 404 Not Found server is unable to do the req
// Error 500 server err
// Successful msgs start with 200 
// Returning json code = success = 200 = numeric code reply not necessary
// Status code 201 something is created 

//curl http://127.0.0.1:3000/api/students all students
