const path = require("path");
const fs = require("fs-extra");

fs.emptyDirSync(path.join(process.cwd(), "dist"));
fs.outputFile(
    path.join(process.cwd(), "components", "index.json"),
    JSON.stringify(fs.readdirSync(path.join(process.cwd(), "posts"), { withFileTypes: true })
	.filter(x => x.isDirectory())
	.map(x => x.name), null, 2),
	'utf-8'
);