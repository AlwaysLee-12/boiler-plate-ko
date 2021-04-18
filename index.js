const express= require('express');
const app= express();
const port=5000;
const bodyParser=require('body-parser');  //body-parser 사용
const { User }= require('./models/User'); //User 모듈을 불러옴
const config=require('./config/key');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose= require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err));

app.get('/',(req,res)=>res.send('Hello World!'));

app.post('/register',(req,res)=>{
  //회원 가입 시 필요한 정보들을 client에서 가져와 데이터 베이스에 저장
  const user=new User(req.body);
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err}); //만약 저장시 에러가 발생하면, 클라이언트에게 json 형식으로 에러 메시지 전달
    return res.status(200).json({ //저장을 성공했다면, json 형식으로 저장 성공 메시지 전달
      success:true
    });
  });
});

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));



