module.exports = (sequelize, DataTypes) => {

    let Student = sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })                                                                                                                                                                      


    // force: true drops table (every re-start re-makes the DB)
    // force: false keep table 
    Student.sync({ force: false }).then( () => { 
        console.log('synced student table')
    })

    return Student
}
