
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
  .then(response => response.json())
  .then(response => {
      if(response.token){
          localStorage.setItem("token", response.token);
      }else alert('아이디 / 비밀번호를 다시 입력해주세요!');
      
});