module.exports = (sequelize, Sequelize) => {
  const Property = sequelize.define("property", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preview_image: {
      type: Sequelize.TEXT
    },
    cover_image: {
      type: Sequelize.TEXT
    },
    images: {
      type: Sequelize.TEXT
    },
    sale_price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    area: {
      type: Sequelize.FLOAT,
      allowNull: false
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
    latitude: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    },
    buil_area: {
      type: Sequelize.FLOAT
    },
    class: {
      type: Sequelize.STRING
    },
    vocation: {
      type: Sequelize.STRING
    },
    property_type: {
      type: Sequelize.STRING
    },
    script_model: {
      type: Sequelize.TEXT
    },
    enviroment_text: {
      type: Sequelize.STRING
    },
    ground_usage: {
      type: Sequelize.STRING
    },
    height_floors: {
      type: Sequelize.INTEGER
    },
    height_meters: {
      type: Sequelize.INTEGER
    },
    shared_value: {
      type: Sequelize.FLOAT
    },
    buildable_area: {
      type: Sequelize.FLOAT
    },
    sellable_area: {
      type: Sequelize.FLOAT
    },
    cus: {
      type: Sequelize.INTEGER
    },
    cas: {
      type: Sequelize.INTEGER
    },
    cos: {
      type: Sequelize.INTEGER
    }
  });

  return Property;
};