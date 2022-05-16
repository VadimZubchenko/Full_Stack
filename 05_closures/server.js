const express = require("express");
//alustetaan express
const app = express();
// turvallisuuden vuouksi käytetään asenettu porti, jos ei sitten default 3000
let port = process.env.PORT || 3000;

// vain 2 comment app.use tai app.config asennetaan käytettäväksi publicissa olevaa dataa
app.use(express.static("public")); // express(midlleway) on ketju => request => respons => next

app.listen(port);

console.log("Server is running in port: " + port);
