// require 부분
const express = require('express');
const bodyParser = require('body-parser');
// MongoDB와 연결하기 위해 mongoose를 require해주는 부분
const mongoose = require('mongoose');
// Model을 불러오는 부분
const Book = require('./models/book')

const app = express();

// router를 불러오는 부분
const router = require('./routes')(app, Book);

// port번호를 설정해주는 부분
const port = process.env.PORT || 2701;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Server와 연결시켜주는 부분
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  // 연결이 되었을때 띄워주는 콘솔
  console.log("Connected to mongod server");
})

mongoose.connect('mongidb://localhost/mongodb_tutorial');

const server = app.listen(port, function () {
  console.log("Express server has started on Port " + port)  
});