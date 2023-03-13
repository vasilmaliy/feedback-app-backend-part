const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Post = db.post;
const Vote = db.vote;
const User = db.user;
const Comment = db.comment;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();

}).catch(err => {
  console.log(err);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/data.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Post.create({
    id: 1,
    created_data: '2018-01-01T08:00:00.000Z',
    title: 'Громадське обговорення',
    content: 'Пропонуємо до громадського обговорення проєкти освітньо-наукових програм та навчальних планів за спеціальностями "Педіатрія", "Громадське здоров\'я", "Біологія" для підготовки докторів філософії.',
    votes: 0,
  })

  Post.create({
    id: 2,
    created_data: '2019-01-01T08:00:00.000Z',
    title: 'Використання атомно-силового мікроскопу NanoScope IIIa Dimension 3000',
    content: 'В рамках обміну досвідом з провідними науковцями України було здійснено екскурсію до Інституту фізики напівпровідників ім. В.Є. Лашкарьова НАН України. Екскурсію проведено канд. завідувачем лабораторією «Комплекс скануючої зондової мікроскопії»',
    votes: 0,
  })

  Post.create({
    id: 3,
    created_data: '2022-01-01T08:00:00.000Z',
    title: 'У Львівській політехніці засідання круглого столу відкрив Міністр освіти',
    content: 'Планується, що в перший рік роботи заклад 120 найкращих студентів (6 напрямів по 20 здобувачів освіти), а через декілька років їх кількість збільшиться до 600 осіб.',
    votes: 0,
  })

  User.create({
    username: 'malko',
    email: 'vasil.maliy14@gmail.com',
    password: bcrypt.hashSync('12341234', 8)
  })

  Comment.create({
    text: 'first comment',
    created_data: '2022-01-01T08:00:00.000Z',
    userId: 1,
    userName: 'malko',
    postId: 1
  })

  Comment.create({
    text: 'доре зроблено',
    created_data: '2022-01-01T08:00:00.000Z',
    userId: 1,
    userName: 'malko',
    postId: 1
  })

  // User.findOne({where: {username: 'malko'}})
  // .then( user => User.destroy(user))

  // let n = await User.destroy({where: {username: 'malko'}});
  // console.log(`number of deleted rows: ${n}`);

}