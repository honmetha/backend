module.exports = (sequelize, DataTypes) => {
  let user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(100)
    },
    password: {
      type: DataTypes.STRING(255)
    },
    firstname: {
      type: DataTypes.STRING(255)
    },
    lastname: {
      type: DataTypes.STRING(255)
    },
    profilepic: {
      type: DataTypes.STRING(500)
    }
  })

  user.associate = models => {
    user.hasMany(models.post, {
      foreignKey: "user_id"
    })
    user.hasMany(models.comment, {
      foreignKey: "user_id"
    })
    user.belongsToMany(models.user, {
      foreignKey: "request_to_id",
      as: 'request_to',
      through: models.friend
    })
    user.belongsToMany(models.user, {
      foreignKey: "request_from_id",
      as: 'request_from',
      through: models.friend
    })
  }

  return user
}