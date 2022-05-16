"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//const res = require("express/lib/response");
const app = (0, express_1.default)();
// käytetään asenettu porti tai default 3000
let port = process.env.PORT || 3000;
//asennetaan käytettäväksi public:ssa olevaa dataa
app.use(express_1.default.static("public"));
//app.get("/", function(req: Request, res: Response){
//  res.send('Hello World!')
//});
app.listen(port);
console.log("Server is running in port: " + port);
