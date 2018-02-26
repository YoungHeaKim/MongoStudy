// model을 book을 사용하므로 파라미터에 book을 추가시켜주어야 한다.
module.exports = function (app, Book) {
  
  // Get All Books
  app.get('/api/books', function (req, res) {
    // find메소드를 사용하여 원하는 데이터를 찾아주고 파라미터를 통해 원하는 값을 불러올 수 있습니다.
    // 파라미터를 사용하지 않을 경우에는 모든 데이터를 조회합니다.
    Book.find(function (err, books) {
      // 만약 데이터베이스에 오류가 발생하면 status code 500과 함께 에러가 발생합니다.
      if (err) return res.status(500).send({ error: 'database failure' });
      // 원하는 값을 json의 형태로 return해줍니다.  
      res.json(books);
    })
  });

  // Get Single Book
  app.get('/api/books/:book_id', function (req, res) {
    // findOne 메소드를 사용하여 원하는 데이터 하나만 찾을 수 있습니다.
    Book.findOne({_id: req.params.book_id}, function (err, book) {
      // 만약 에러가 발생시 status code 500과 함께 error: err를 띄워줍니다.
      if (err) return res.status(500).json({error: err});
      // 만약 찾는 책이 아닌 경우 status code 404와 함께 error: 'book not found'를 띄워줍니다.
      if (!book) return res.status(404).json({erroor: 'book not found'});
      res.json(book);
    })
  });
  
  // Get Book By Author
  app.get('/api/books/auuthor/:author', function (req, res) {
    // find 메소드를 사용하여 원하는 작가의 책들을 찾기위해 첫번쨰 인자에는 작가의 이름을 찾는 query를 짜주었고 두번째 인자에서는 title과 날짜만 나오면되기 때문에 projection을 작성해주었습니다.
    // 만약 proojection을 작성하지 않을 경우 모든 정보가 나옵니다.  
    Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1}, function (err, books) {
      if (err) return res.status(500).json({error: err});
      // 찾는 책의 길이가 0 즉 없는 경우에는 404에러를 뜨워줍니다.
      if (books.length === 0) return res.status(404).json({error: 'book not found'});
      res.json(books);
    })
  });

  // Create Book
  app.post('/api/books', function (req, res) {
    const book = new Book();

    // 새로운 책의 이름과 작가, 날짜를 데이터에 저장해야하기 떄문에 입력을 받습니다. 
    book.title = req.body.name;
    book.author = req.body.author;
    book.published_date = new Date(req.body.published_date);

    // .save메소드는 데이터를 데이터베이스에 저장합니다. err을 통하여 오류처리가 가능합니다.
    // 데이터 저장에 성공하면 result:1을 반환하고 실패하면 result: 0을 반환합니다.
    book.save(function (err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return; 
      }
      
      res.json({ result: 1});
    });
  });

  // Update The Book
  app.put('/api/books/:book_id', function (req, res) {
    // findeById메소드를 사용하여 id를 찾아옵니다.  
    Book.findById(req.params.book_id, function (err, book) {
      if (err) return res.status(500).json({error: 'database failure'});
      if (!book) return res.status(404).json({error: 'book not found'});

      // 원하는 책을 불러온 후 정보를 수정한 데이터 값을 새로 할당해줍니다.  
      if (req.body.title) book.title = req.body.title;
      if (req.body.author) book.author = req.body.author;
      if (req.body.published_date) book.published_date = req.body.published_date;
      
      // save메소드를 사용하여 다시 데이터베이스에 저장해줍니다.
      book.save(function (err) {
        if (err) res.status(500).json({error: 'failed to update'})
        res.json({message: 'book update'});
      })
    })
  });

  // Delete Book
  app.delete('/api/books/:book_id', function (req, res) {
    Book.remove({ _id: req.params.book_id }, function (err, output) {
      if (err) return res.status(500).json({ error: "database failure"});

      /* 이런식으로 성공을 했을 경우 성공을 했다는 것을 띄워주어도 되지만 그냥 단순한 삭제이기 떄문에 204를 띄워 주어도 됩니다.
      if(!output.result.n) return res.status(404).json({ error: "book not found" });
      res.json({ message: "book delted" });
      */
      res.status(204).end();
    })
  });

}