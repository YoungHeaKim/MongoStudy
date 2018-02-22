# Noode.js를 사용하여 MongoDB와 연결하는 예시

## Express와 Mongoose를 통해 MongoDB를 연결

## 1. 프로젝트 생성 및 패키지 설치

### A. 프로젝트를 생성
`npm install --save express mongoose body-parser`  
위의 명령어를 사용하여 `express`와 `mongoose`, `body-parser`를 설치합니다.  
설치가 되면 ![](./images/mongoInstall.png) 이러한 상태가 되고 폴더안에 node_modules와 package.json, package-lock.json를 생성합니다.  

## 2. 서버 설정하기

### A. 디텍토리 구조
![](./images/d.png)
이러한 구조로 만들어 줍니다.  

### B. Express로 이용한 웹서버 생성
API 목록을 만들어 주어야하는데 [RESTful 웹서버](https://velopert.com/332)를 참고하여 만들면 됩니다.  
## 3. MongoDB 서버 연결

MongoDB 서버에 연결하는 방법은 App.js에서 다음과 같이 사용하면 된다.  
![](./images/require.png)
![](./images/connect.png)
위의 코드에서 `mongoose.coonnect()` 메소드로 서버에 접속을 할 수 있으며, 따로 설정 할 파라미터가 있다면 다음과 같이 설정을 하면됩니다. 자세한 설명은 [여기](http://mongoosejs.com/docs/connections.html)를 참고하세요.    
`mongoose.connect('mongodb://username:password@host:port/database?options...');`  

## 4. Schema & Model

### A. Schema
 
Schema는 document의 구조가 어떻게 생겼는지 알려주는 역할을 합니다.  
SQL에서의 table역할과 비슷하다고 생각하면 됩니다.  

위에서 만든 파일들 중에 models폴더안에 있는 book.js라는 파일에 밑에와 같이 작성을 해주면 됩니다.  
![](./images/book.png)

schema에 사용되는 SchemaType은 총 8종류가 있습니다. 자세한 사용법은 [여기](http://mongoosejs.com/docs/schematypes.html)를 참고하세요.  
1. String
2. Number
3. Date
4. Buffer
5. Boolean
6. Mixed
7. Objectid
8. Array

### B. model

model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는 프로그래밍 인터페이스를 정의합니다.  
위의 코드에서는 마지막 부분에 model을 사용해주었습니다.  
```js
mongoose.moodel('book', bookSchema);
```
위의 코드를 볼 때 첫번째 인자 'book'은 해당 document가 사용할 collection의 단수적 표현입니다. 즉. 위의 model에서는 'books' collection을 사용하게 됩니다. 이렇게 자동적으로 단수적 표현을 복수적 형태로 변환하여 그걸 collection의 이름으로 사용합니다. collection 이름을 plural 형태로 사용하는건 mongodb의 네이밍컨벤션 중 하나입니다.  
만약 collection 이름을 임의로 정하고 싶을 경우에는 schema를 만들때 밑에와 같이 따로 설정을 해야합니다.  
COLLECTION_NAME부분에 원하는 이름을 설정해주면 됩니다.  
`const dataSchema = new Schema({..}, { collection: 'COLLECTION_NAME' });`

## 5. CRUD (Create, Retrieve, Update, Delete)

CRUD는 Create, Retrieve, Update, Delete의 약자로서 데이터를 데이터베이스에 저장, 조회, 수정, 삭제하는 것을 의미합니다.  
전에 만들어 놓았던 routes폴더안에 있는 index.js파일 안에 작성을 하면됩니다.  
밑에서 사용하는 find, findOne, findById와 같은 메소드를 자세하게 설명한 곳을 알고 싶다면 [여기](http://mongoosejs.com/docs/api.html)를 확인하세요.  

### A. Create (POST, /api/books)

Create는 데이터를 데이터베이스에 저장하는 부분이므로 POST 요청을 사용하고 URI는 /api/books를 사용합니다.  
![](./images/create.png)

### B. Retrieve (GET, /api/books)

Retrieve는 데이터를 조회하는 부분이므로 GET 요청을 사용하고 URI는 /api/books를 사용하여 Create와 같은 URI를 사용하여 REST하게 API를 사용하였습니다.  

![](./images/Retrieve.png)

### C. Update (PUT, /api/books/:book_id)

Update는 원하는 데이터를 찾아 수정하는 부분으로 PUT 요청을 사용하고 URI는 /api/books/:book_id를 사용합니다.  

![](./images/update.png)

### D. Delete (DELETE, /api/books/:book_id)

Delete는 원하는 데이터를 찾아 삭제하는 부분으로 DELETE 요청을 사용하고 URI는 /api/books/:book_id를 사용합니다.  

![](./images/delete.png)