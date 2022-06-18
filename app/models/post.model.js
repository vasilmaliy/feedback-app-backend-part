module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        created_data: {
            type: Sequelize.DATE,
        },
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
    });

    return Post;
};
