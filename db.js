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

  const [Place1, Place2, Place3] = await Promise.all([
    Place.create({name: 'Bologna' }),
    Place.create({name: 'Pacific Grove'}),
    Place.create({name: 'NYC'}),
  ]);

  const [Person1, Person2, Person3] = await Promise.all([
    Person.create({name: 'Rob', placeId: Place1.id}),
    Person.create({name: 'Lourdes', placeId: Place2.id}),
    Person.create({name: 'Moe', placeId: Place3.id})
  ]);

  const [Thing1, Thing2, Thing3] = await Promise.all([
    Thing.create({name: 'laptop', personId: Person1.id}),
    Thing.create({name: 'coffee cup', personId: Person2.id}),
    Thing.create({name: 'hat', personId: Person3.id}),
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


