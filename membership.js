const membershipJoin = document.querySelector(".membershipForm");
const passwordInput = document.querySelector(".password");
const passwordCheckInput = document.querySelector(".passwordCheck");


function submit(event) {
    event.preventDefault();
    console.dir(event);
    if (passwordInput.value === passwordCheckInput.value) {
        window.open("joinComplete.html", "_self");
    } else{
        alert("비밀번호를 다시 확인해주세요.");
    }
}

membershipJoin.addEventListener("submit", submit);


