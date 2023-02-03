const { add, finalize, fontSize, fillRect, label, line, arrowLine } = require('./lib/tikzpicture.js');
const { hashPack } = require('./lib/common.js');

add(fontSize('tiny'));

const HEIGHT = 2.7;
const WIDTH = 13;
const MARGIN = 0.2;
const Y = 0.7;
const LINE_OFFSET_Y = 0.6;
const LINE_COLOR = 'blue';

add(fillRect(0, 0, WIDTH, HEIGHT, 'lightgray!30'));
add(label(0, HEIGHT, 'Unoptimized Plot File', 'black', 'north west'));

const props = add(hashPack(MARGIN, Y, 'Nonce $\\#0$', ['Scoop\\\\$\\#0$', '\\dots', 'Scoop\\\\$\\#403$', '\\dots', 'Scoop\\\\$\\#4095$']));
const props2 = add(hashPack(MARGIN * 2 + props.width, Y, 'Nonce $\\#0$', ['Scoop\\\\$\\#0$', '\\dots', 'Scoop\\\\$\\#403$', '\\dots', 'Scoop\\\\$\\#4095$']));

add(line(props.hashes[2].bottom.x, props.hashes[2].bottom.y, props.hashes[2].bottom.x, props.hashes[2].bottom.y - LINE_OFFSET_Y, LINE_COLOR));
add(line(props.hashes[2].bottom.x, props.hashes[2].bottom.y - LINE_OFFSET_Y, props2.hashes[2].bottom.x, props.hashes[2].bottom.y - LINE_OFFSET_Y, LINE_COLOR));
add(arrowLine(props2.hashes[2].bottom.x, props.hashes[2].bottom.y - LINE_OFFSET_Y, props2.hashes[2].bottom.x, props.hashes[2].bottom.y, LINE_COLOR));

console.log(finalize());
