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
}

membershipJoin.addEventListener("submit", submit);
passwordCheckInput.addEventListener("input", input);

