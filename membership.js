const membershipJoin = document.querySelector(".membershipForm");
const passwordInput = document.querySelector(".password");
const passwordCheckInput = document.querySelector(".passwordCheck");
const passwordError = document.querySelector(".redHidden");
const debateClick = document.querySelector("#debate-list");
const usernameInput = document.querySelector(".username");
const nicknameInput = document.querySelector(".nickname");
const emailInput = document.querySelector(".email");

function input() {
   if (passwordCheckInput.value !== passwordInput.value) {
    passwordError.style.display = "block";
    passwordCheckInput.classList.add("redBorder");
   } else {
    passwordError.style.display = "none";
    passwordCheckInput.classList.remove("redBorder");
   }
}

function submit(event) {
    event.preventDefault();

    const url = "http://43.200.164.174:3000/api/user/register";
    const username = usernameInput.value;
    const nickname = nicknameInput.value;
    const id = emailInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;
    
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            name: username,
            nickname: nickname,
            email: id,
            password: password,
            confirmPassword: passwordCheck
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            console.log(data);
            alert("성공!");
        } else {
            throw new Error("서버 응답에 오류가 있습니다.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("서버 응답 처리에 실패했습니다.");
    });

}

membershipJoin.addEventListener("submit", submit);
passwordCheckInput.addEventListener("input", input);

