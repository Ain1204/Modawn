
/*
fetch("http://43.200.164.174:3000/api/user/login")
.then((response) => response.json())
.then((data) => console.log(data));
*/

fetch('http://43.200.164.174:3000/api/user/login', {
      method : "POST",
      headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
      },
      body : JSON.stringify({
            email : id,
          password : password,
      })
  })
  .then(res => res.json())
  .then(res => {
      if(res.token){
          localStorage.setItem("token", res.token)
      }else{
          window.alert(res.msg)
      }
});