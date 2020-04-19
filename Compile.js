const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildpath = path.resolve(__dirname, 'build');
fs.removeSync(buildpath);
const donatePath = path.resolve(__dirname, 'Contract', 'contract.sol');
const source = fs.readFileSync(donatePath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildpath);
console.log(output);
for (let contract in output) {
    fs.outputJsonSync(path.resolve(buildpath, contract.replace(':', '') + '.json'), output[contract]);

}

