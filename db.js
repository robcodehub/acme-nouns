const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_nouns');

const Person = conn.define('person', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true
  }
});
 const Place = conn.define('place', {
   id: {
     primaryKey: true,
     type: Sequelize.UUID,
     defaultValue: Sequelize.UUIDV4
   },
   name: {
     type: Sequelize.STRING,
     allowNull: false,
     notEmpty: true,
     unique: true
   }
 });
 const Thing = conn.define('thing', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true
  }
});

Person.belongsTo(Place);
Thing.belongsTo(Person);
Place.hasMany(Person);
Person.hasMany(Thing);


const syncAndSeed = async() => {
  await conn.sync({ force: true });
  const [Person1, Person2, Person3] = await Promise.all([
    Person.create({name: 'Rob'}),
    Person.create({name: 'Lourdes'}),
    Person.create({name: 'Moe'})
  ]);


};


module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing
  }
}


