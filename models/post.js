module.exports = (sequelize, DataTypes) => {
  let post = sequelize.define("post", {
    message: {
      type: DataTypes.STRING(255)
    },
    img: {
      type: DataTypes.STRING(500)
    }
  })

  post.associate = models => {
    post.hasMany(models.comment, {foreignKey: "post_id"})
  }

  return post
}