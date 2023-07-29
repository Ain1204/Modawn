
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 로그인 정보를 담은 객체 생성
    const loginData = {
        email: email,
        password: password
    };


    // 이메일과 비밀번호를 POST 요청으로 보냄
    fetch("http://43.200.164.174:3000/api/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData) // 객체를 JSON 문자열로 변환하여 전송
    })
    .then((response) => response.json())
    .then((response) => {
        if (response.success) { // 수정된 부분: success 값을 확인
            // 로그인 성공 시 토큰을 localStorage에 저장하고, 다음 페이지로 이동
            localStorage.setItem("token", response.data.token); // 수정된 부분: response.data.token으로 변경
            window.location.href = "Main.html"; // 로그인 성공 후 이동할 페이지
        } else {
            // 로그인 실패 시 에러 메시지 출력 또는 다른 처리
            console.log("로그인 실패");
        }
    })
    .catch((error) => {
        console.error("오류 발생:", error);
    });
}
