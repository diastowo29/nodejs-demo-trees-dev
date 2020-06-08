module.exports = (sequelize, type) => {
    return sequelize.define('demo-customer', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING(510),
        telephone: type.STRING(510),
        address: type.STRING(510),
        email: type.STRING(510),
        facebook: type.STRING(510),
        twitter: type.STRING(510),
        customer_id: type.STRING(510),
        username: type.STRING(510),
        trx: type.STRING(510),
        product_code: type.STRING(510),
        product_price: type.STRING(510)
    })
}