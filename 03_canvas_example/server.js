const express = require("express");
//alustetaan express
const app = express();
// turvallisuuden vuouksi käytetään asenettu porti, jos ei sitten default 3000
let port = process.env.PORT || 3000;

// vain 2 comment app.use tai app.config asennetaan käytettäväksi publikissa olevaa dataa
// esim. express.static() serves static files in public
//Create a new middleware function to serve files from within a given root directory. 
//The file to serve will be determined by combining req.url with the provided root directory. 
//When a file is not found, instead of sending a 404 response, 
//this module will instead call next() to move on to the next middleware, allowing for stacking and fall-backs.
app.use(express.static("public")); // express(Express middleware) are functions that have access to the ketju => request => respons => next

app.listen(port);


console.log("Server is running in port: " + port);
