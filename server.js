let express = require('express')
let api_routes = require('./routes/api.js') 

// Create web app
let app = express()

// so it can handle json req, conv data to js
app.use(express.json()) // so that it can process the "body" of data it gets if its json

app.use('/api', api_routes) 
// this code runs IF that⤴ one doesnt
//  ⇊ 
app.use(function (req, res, next) {
    res.status(404).send('NOT FOUND') // 404 resp to all other req
})

app.use(function (err, res, next){
    console.error(err.stack)
    res.status(500).send('SERV3R ERR0R')
})
 
// start server running
let server = app.listen(process.env.PORT || 3000, function () {
    console.log('Express server running on port', server.address().port)
})