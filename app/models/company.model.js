module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        rfc: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        logotype: {
            type: Sequelize.TEXT
        },
        employees_number: {
            type: Sequelize.INTEGER
        },
        phone_office: {
            type: Sequelize.STRING
        },
        phone_office_ext: {
            type: Sequelize.STRING
        },
        domain: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        street_num: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hood: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zip_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        investment_mount: {
            type: Sequelize.FLOAT
        },
        type: {
            type: Sequelize.STRING
        }
    });

    return Company;
};