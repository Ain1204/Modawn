const membershipJoin = document.querySelector(".membershipForm");
const passwordInput = document.querySelector(".password");
const passwordCheckInput = document.querySelector(".passwordCheck");
const passwordError = document.querySelector(".redHidden");


function submit(event) {
    event.preventDefault();
    console.dir(event);
    if (passwordInput.value === passwordCheckInput.value) {
        window.open("joinComplete.html", "_self");
    } 
}

function input() {
   if (passwordCheckInput.value !== passwordInput.value) {
    passwordError.style.display = "block";
   } else {
    passwordError.style.display = "none";
   }
}

membershipJoin.addEventListener("submit", submit);
passwordCheckInput.addEventListener("input", input);

