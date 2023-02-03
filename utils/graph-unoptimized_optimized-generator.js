const { add, finalize, fontSize, fillRect, label, line, arrowLine } = require('./lib/tikzpicture.js');
const { hashPack } = require('./lib/common.js');

add(fontSize('tiny'));

const HEIGHT = 4.4;
const WIDTH = 13;
const MARGIN = 0.2;
const Y = HEIGHT - 2;

add(fillRect(0, 0, WIDTH, HEIGHT, 'lightgray!30'));
add(label(0, HEIGHT, 'Unoptimized Plot File', 'black', 'north west'));

const props = add(hashPack(MARGIN, Y, 'Nonce $\\#0$', ['Scoop\\\\$\\#0$', '\\dots', 'Scoop\\\\$\\#403$', '\\dots', 'Scoop\\\\$\\#4095$']));
add(hashPack(MARGIN * 2 + props.width, Y, 'Nonce $\\#0$', ['Scoop\\\\$\\#0$', '\\dots', 'Scoop\\\\$\\#403$', '\\dots', 'Scoop\\\\$\\#4095$']));

add(label(0, Y - MARGIN, 'Optimized Plot File', 'black', 'north west'));

const opp1 = add(hashPack(MARGIN, MARGIN, 'Scoop $\\#403$', ['Nonce\\\\$\\#0$', 'Nonce\\\\$\\#1$', '\\dots']));
const opp2 = add(hashPack(MARGIN * 2 + opp1.width, MARGIN, 'Scoop $\\#404$', ['Nonce\\\\$\\#0$', 'Nonce\\\\$\\#1$', '\\dots']));

add(label(opp1.width + opp2.width + MARGIN * 3, opp1.height / 2, '\\dots'));

console.log(finalize());
