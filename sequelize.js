const Sequelize = require('sequelize')
const demoModel = require('./models/customer')
const rfidModel = require('./models/rfid')

var sequelize_db;

if (process.env.DATABASE_URL === undefined) {
	sequelize_db = new Sequelize('postgres', 'postgres', 'R@hasia', {
	  host: 'localhost',
	  dialect: 'postgres'
	});
} else {
	sequelize_db = new Sequelize(process.env.DATABASE_URL, {
	  dialectOptions: {
	    ssl: {
	      require: true,
	      rejectUnauthorized: false,
	    },
	    keepAlive: true,        
	  },      
	  ssl: true
	})
}


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