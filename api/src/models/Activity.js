const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            }
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM('Winter', 'Spring', 'Summer', 'Autumn'),

        }
    }, { timestamps: false });
};