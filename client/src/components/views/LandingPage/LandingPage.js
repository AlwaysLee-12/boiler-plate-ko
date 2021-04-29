import React, { useEffect, useState } from "react";
import axios from 'axios';

function LandingPage() {
    //서버에 GET 요청을 보내고, 그에 따른 응답을 콘솔 창에 전시
    useEffect(() => {
        axios.get('/api/hello')
        .then(response=>{console.log(response)});
    }, [])

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
