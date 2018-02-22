const mongoose = require('mongoose');

// Schema라는 것을 불러오기 위해 사용한다.
const Schema = mongoose.Schema;

// Schema 안에 어떠한 것들이 들어가는지 객체로 저장합니다. 
const bookSchema = new Schema ({
  title: String,
  authoor: String,
  published_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('book', bookSchema);