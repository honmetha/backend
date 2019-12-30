module.exports = (sequelize, DataTypes) => {
  let comment = sequelize.define("comment", {
    message: {
      type: DataTypes.STRING(255)
    },
    img: {
      type: DataTypes.STRING(500)
    }
  })

  return comment
}