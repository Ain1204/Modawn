const form = document.querySelector("#debate-form-submit");

function submit(event) {
    event.preventDefault();
    window.open("debateList.html", "_self");
}

form.addEventListener("click", submit);