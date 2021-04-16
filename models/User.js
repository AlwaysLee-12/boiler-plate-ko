const mongoose=require('mongoose');

//user에 관한 스키마 생성
const userSchema=mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type:String,
        trim:true, //공백 없애주는 역할 ex)lee 12@naver.com에서 공백 제거해서 
        		   //					lee12@naver.com으로 만듦
        unique:1
    },
    password:{
        type:String,
        maxlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{ //토큰 유효기간
        type:Number
    }
});

//user 스키마를 모델로 감싸줌
const User=mongoose.model('User',userSchema);

module.exports={User}
//다른 곳에서도 해당 모듈을 사용할 수 있음