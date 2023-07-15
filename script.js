"use strict";
let account = document.querySelectorAll('.account');

const id = document.getElementById('id')
const password = document.getElementById('pw')
const loginbtn = document.getElementById("login-form-submit");
const idLength = id.value.length;//id의 값
let errStack = 0;

function check(form)
{
    if(form.userid.value=="emily")
    {
        if(form.userpassword.value >= 8)
        {
        window.open('index.html',"_self")
        }
        else 
        {
            alert("Error Userpasswod");
            errStack ++;
        }
    }
    else 
    {
        alert("Error Userid");
        errStack ++;
    }
    if (errStack >= 5) {
        alert('비밀번호를 5회 이상 틀리셨습니다. 비밀번호 찾기를 권장드립니다.')
    }

}


