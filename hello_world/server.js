const express = require("express");

const app = express();
// käytetään asenettu porti tai default 3000
let port = process.env.PORT || 3000;

//asennetaan käytettäväksi publicissa olevaa dataa
app.use(express.static("public"));

app.listen(port);

console.log("Server is running in port: " + port);
