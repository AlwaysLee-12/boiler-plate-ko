import React from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(()=>{
        //서버에 GET 요청을 보내고, 그에 따른 응답을 콘솔 창에 전시
        axios.get('/api/hello')
        .then(response=>console.log(response.date));
    },[]);

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
