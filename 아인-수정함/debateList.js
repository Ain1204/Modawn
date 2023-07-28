const p = document.querySelector(".p");
const button = document.querySelector(".good");
const wrapper = document.querySelector(".btnWrapper");

function countClicks() {
    clickCounter++;
    wrapper.classList.add("heartRed");
    
    const path = document.querySelector(".path");
    path.setAttribute("fill", "#EB6962");
    p.innerHTML = clickCounter;
}

let clickCounter = parseInt(localStorage.getItem("clickCounter")) || 0;

button.addEventListener("click", countClicks)
