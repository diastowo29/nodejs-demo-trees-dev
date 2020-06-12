const Sequelize = require('sequelize')
const demoModel = require('./models/customer')
const rfidModel = require('./models/rfid')

const sequelize_db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,        
  },      
  ssl: true
})

// const sequelize_db = new Sequelize('postgres', 'postgres', 'R@hasia', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

const demo_table = demoModel(sequelize_db, Sequelize)
const rfid_table = rfidModel(sequelize_db, Sequelize)

sequelize_db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
    demo_table,
    rfid_table
}