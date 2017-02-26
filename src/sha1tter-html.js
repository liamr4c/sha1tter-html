const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const handlebars = require("handlebars");

// Load Constant Dependencies
const one = fs.readFileSync(path.resolve(__dirname, "one.txt"));
const two = fs.readFileSync(path.resolve(__dirname, "two.txt"));

// Command Line Friendliness
let program = require("commander");
program
	.version("0.0.1") //TODO: change
	.option("-o, --output-one [file]", "Where to output first file. Default ./one.html. Not nessessarily the data used in the first SHAttered paper", "./one.html")
	.option("-t, --output-two [file]", "Where to output second file. Default ./two.html. Not nessessarily the data used in the second SHAttered paper", "./two.html")
	.option("-g, --one-data [file]", "File to get data to be displayed in first file. If not specified, the text \"one\" will be used", "")
	.option("-e, --two-data [file]", "File to get data to be displayed in second file. If not specified, the text \"two\" will be used", "")
	.option("-t, --template [file]", "File to load as template.", path.resolve(__dirname, "template.html"))
	.parse(process.argv)

// Process Data
let twodata = "one";
let onedata = "two";

if (program.oneData !== ""){
	onedata = fs.readFileSync(program.oneData);
	onedata = onedata.toString("base64");
}
if (program.twoData !== ""){
	twodata = fs.readFileSync(program.twoData);
	twodata = twodata.toString("base64");
}

// Template Stuff
const tpl = fs.readFileSync(program.template);
const tplcompile = handlebars.compile(tpl.toString());
const template_str = tplcompile({one:onedata,two:twodata});
const template = new Buffer(template_str);

//Sanity Check
if (crypto.createHash("sha1").update(Buffer.concat([one, template])).digest("hex") !== crypto.createHash("sha1").update(Buffer.concat([two, template])).digest("hex")){
	console.log("SOMETHING WRONG HAPPENED!!!")
} else {
	console.log("The files will have sha-1 hash:",crypto.createHash("sha1").update(Buffer.concat([two, template])).digest("hex"))
}


// Write
fs.writeFileSync(program.outputOne, Buffer.concat([one, template]), "utf-8")
fs.writeFileSync(program.outputTwo, Buffer.concat([two, template]), "utf-8")
