module.exports = (sequelize, type) => {
    return sequelize.define('order-master', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        id_kartu: type.STRING(510),
        nama_kartu: type.STRING(510),
        order: type.STRING(510),
        status: type.STRING(510)
    })
}