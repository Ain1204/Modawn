"use strict";

fetch("http://43.200.164.174:3000/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      email: id,
      password: pw,
    }),
  })
  .then((response) => response.json())
  .then((response)=>{
    console.log(response.data)
 	  localStorage.setItem('token', response.token);
  })
;
