/*
const form = document.querySelector("#debate-form-submit");

function submit(event) {
    event.preventDefault();
    window.open("debateList.html", "_self");
}

form.addEventListener("click", submit);
*/

fetch("http://43.200.164.174:3000/api/user/register",{
	method : "POST",
   	body : JSON.stringify({
            name : username,
            nickname : nickname,
            email : id,
            password: password,
            confirmPassword : passwordCheck,
        })
})
.then(res => res.json())
.then(res => console.log(res))