
/*
fetch("http://43.200.164.174:3000/api/user/login")
.then((response) => response.json())
.then((data) => console.log(data));
*/


fetch('http://43.200.164.174:3000/api/user/login', {
  method: "GET", // GET 요청으로 변경
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // GET 요청의 경우에는 body를 사용하지 않습니다.
})
.then(response => response.json())
.then(response => {
  if (response.token) {
    localStorage.setItem("token", response.token);
  } else {
    alert('아이디 / 비밀번호를 다시 입력해주세요!');
  }
});