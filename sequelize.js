const Sequelize = require('sequelize')
const demoModel = require('./models/customer')

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

const demo_table = demoModel(sequelize_db, Sequelize)

sequelize_db.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
    })

module.exports = {
    demo_table
}