let { Sequelize, DataTypes } = require('sequelize')

let env = process.env.NODE_ENV || 'development'
// If app is running @ Heroku, Heroku sets the env
// var called NODE_ENV ( has value 'production')
// the env var in this code will be 'production'

// If app is runningg on locally on pc, env is 'development'
// will use SQLite
let config = require(__dirname + '/../config.json')[env]
                                                                               
let db = {}

let sequelize

if (config.use_env_variable) {
    // at Heroku, uses Postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    // running locally, 'development mode', use SQLite
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes)
db[studentModel.name] = studentModel

db.sequelize = sequelize // info how to connect to DB
db.sequelize = Sequelize // reference to Sequelize library

module.exports = db
