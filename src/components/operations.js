import { useEffect } from 'react';
export const user_logout=(u_id)=>{
    const url = 'http://pradnyaconsultant.in:3000/logout'
    const data = {
      userid:u_id
    };
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data),
    };
    console.log(url)
    fetch(url, options).then((response)=>response.json()).then((actualData)=>{
      console.log(actualData)
      if(!actualData.error)
      {
        console.log(actualData)
        if(actualData.message === 'Logged Out')
        {
          console.log("Logging out ...")
          localStorage.removeItem('sessionid')
          window.location.href='/login'
        }
      }
    }).catch((err)=>{
      console.log(err.message)
    })
  }

export const useCheckSession = () => {

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionID = localStorage.getItem('sessionid');
      console.log(sessionID)
      if (!sessionID) {
        if (window.location.pathname != '/login'){
          window.location.href = '/login';
        }
      }else{
        if (window.location.pathname == '/login'){
          window.location.href='/map'
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [window.location]);
};
