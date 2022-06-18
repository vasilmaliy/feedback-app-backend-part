module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull:  false,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_data: {
            type: Sequelize.DATE
        }
    });

    return Comment;
};
