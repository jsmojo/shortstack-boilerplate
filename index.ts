
let fs = require('fs');
var chalk = require('chalk');
let express = require('express');
let app = new express();
let port = process.env.PORT || 80;

console.log(chalk.blue("Running webapp..."));

//app.use(require('body-parser').urlencoded());
//app.use(require('body-parser').json());

//app.use(express.static(''));

//app.listen(port,()=>{
	console.log(chalk.blue(`App listening on port ${port}`));
//}) ;


