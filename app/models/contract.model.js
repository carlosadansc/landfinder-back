module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("contract", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        sign_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        url_doc: {
            type: sequelize.TEXT,
            allowNull: false,
        },
        signed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Contract;
};