const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const { validate, ValidationError, Joi } = require('express-validation')
var cookieParser = require('cookie-parser')
// app.use(express.json());

const AuthController = require('./controllers/auth')
const BookController = require('./controllers/book')
const checkAuth = require('./middlewares/checkAuth')
const addBook = require("./services/BookService")

const app = express();
const port = 3001

app.use(bodyParser.json())  
app.use(cookieParser())

const cors = require('cors');
 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/auth', AuthController)
app.use('/books', BookController)


app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  console.log(err)
  return res.status(500).json({})
})
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ error: err.message });
// });

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/Library');
    console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`);
    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
mongoDB();
// app.use(express.json());
// app.post('/api/books', async (req, res) => {
//   try {
//     book = addBook(req.body);
//     res.status(201).json(book);
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });



app.listen(port, () => { console.log("server is working"); });