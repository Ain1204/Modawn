const membershipJoin = document.querySelector(".membershipForm");
const passwordInput = document.querySelector(".password");
const passwordCheckInput = document.querySelector(".passwordCheck");


function submit(event) {
    event.preventDefault();
    if (passwordInput.value === passwordCheckInput.value) {
        window.open("joinComplete.html", "_self");
    }
}

function input() {
   if (passwordCheckInput.value !== passwordInput.value) {
    passwordError.style.display = "block";
    passwordCheckInput.classList.add("redBorder");
   } else {
    passwordError.style.display = "none";
    passwordCheckInput.classList.remove("redBorder");
   }
}

membershipJoin.addEventListener("submit", submit);
passwordCheckInput.addEventListener("input", input);

