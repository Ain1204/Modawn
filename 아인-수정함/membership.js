/*
const form = document.querySelector("#debate-form-submit");

function submit(event) {
    event.preventDefault();
    window.open("debateList.html", "_self");
}

form.addEventListener("click", submit);
*/
function registerUser() {
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 회원가입 정보를 객체로 만들기
    const userData = {
        name: username,
        nickname: nickname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };

    fetch("http://43.200.164.174:3000/api/user/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // 객체 데이터를 문자열로 변환하여 전달
    })
    .then((response) => {
        console.log(response);
        if (response.status === 201) {
            // 회원가입 성공 시 Login.html로 이동
            window.location.href = "joinComplete.html";
        } else {
            // 회원가입 실패 시 에러 메시지 출력 또는 다른 처리
            console.log("회원가입에 실패하였습니다.");
        }
    })
    .catch((error) => {
        console.error("오류 발생:", error);
    });
}

const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#confirmPassword");
const passwordError = document.querySelector(".redHidden");

function input() {
    if (passwordCheckInput.value !== passwordInput.value) {
     passwordError.style.display = "block";
     passwordCheckInput.classList.add("redBorder");
    } else {
     passwordError.style.display = "none";
     passwordCheckInput.classList.remove("redBorder");
    }
 }

 passwordCheckInput.addEventListener("input", input);
