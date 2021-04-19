const express= require('express');
const app= express();
const port=5000;
const bodyParser=require('body-parser');  //body-parser 사용
const { User }= require('./models/User'); //User 모듈을 불러옴
const config=require('./config/key');
const cookieParser=require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose= require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err));

app.get('/',(req,res)=>res.send('Hello World!!!'));

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

app.post('/login',(req,res)=>{
  //요청된 이메일이 데이터베이스에 존재하는지 확인
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없음"
      })
    }
    //요청된 이메일이 데이터베이스에 존재한다면, 비밀번호가 데이터베이스에 있는 것과 일치하는지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀림"});
      //비밀번호까지 일치하면, 토큰 생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        //토큰 저장. where? 쿠키, 로컬 스토리지, 세션(여기서는 쿠키에 저장)
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true, userId: user.id});
      })
    })
  })
  

  
})

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));



