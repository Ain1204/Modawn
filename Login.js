"use strict";

fetch("http://0.0.0.0/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      email: id,
      password: pw,
    }),
  })
  .then((response) => response.json())
  .then((data) => console.log(data));