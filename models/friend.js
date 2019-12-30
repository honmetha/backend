module.exports = (sequelize, DataTypes) => {
  let friend = sequelize.define("friend", {
    status: {
      type: DataTypes.ENUM('REQUEST', 'FRIEND')
    }
  })

  return friend
}