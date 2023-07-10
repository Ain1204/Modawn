"use strict";

function check(form)
{
    if(form.userid.value=="emily")
    {
        if(form.userpassword.value=="140930")
        {
        window.open('index.html',"_self")
        }
        else 
        {
            alert("Error Userpasswod");
        }
    }
    else 
    {
        alert("Error Userid");
    }

}

