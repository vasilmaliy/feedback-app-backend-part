module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull:  false,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_data: {
            type: Sequelize.DATE
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Comment;
};
