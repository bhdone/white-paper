const { add, finalize, fontSize, arrowLine, label } = require('./lib/tikzpicture.js');
const { hashFunc } = require('./lib/common.js');

add(fontSize('tiny'));
const hashProps = add(hashFunc(0, 0, ['GenSig', 'BlockHeight'], 'Shabal256'));

const LINE_WIDTH = 1;
const lineProps = add(arrowLine(hashProps.hashTitle.x, hashProps.hashTitle.y, hashProps.hashTitle.x + LINE_WIDTH, hashProps.hashTitle.y, 'blue'));
add(label(lineProps.x2, lineProps.y2, '32-byte Generation Hash', 'black', 'west'));

console.log(finalize());
