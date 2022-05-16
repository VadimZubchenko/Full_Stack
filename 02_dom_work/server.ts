import express, { Request, Response } from "express";
//const res = require("express/lib/response");

const app = express();
// käytetään asenettu porti tai default 3000
let port = process.env.PORT || 3000;

//asennetaan käytettäväksi public:ssa olevaa dataa
app.use(express.static("public"));
//app.get("/", function(req: Request, res: Response){
//  res.send('Hello World!')

//});
app.listen(port);

console.log("Server is running in port: " + port);
