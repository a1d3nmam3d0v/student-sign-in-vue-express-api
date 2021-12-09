let express = require('express')
let api_routes = require('./routes/api.js')
let path = require('path')

// Create web app
let app = express()

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

// So it can handle/process JSON req
app.use(express.json()) // and conv data to JS

app.use('/api', api_routes)
// this code runs IF that⤴ one doesnt
//  ⇊
app.use(function (req, res, next) {
	res.status(404).send('NOT FOUND') // 404 to all other req
})

app.use(function (err, res, next) {
	console.error(err.stack)
	res.status(500).send('SERV3R ERR0R')
})

// Start server running
let server = app.listen(process.env.PORT || 3000, function () {
	console.log('Express server running on port', server.address().port)
})
