const { add, finalize, arrowLine, fontSize, fillRect, label, labelRect, rect } = require('./lib/tikzpicture.js');
const { hashPack } = require('./lib/common.js');

add(fontSize('tiny'));

const WIDTH = 13;
const HEIGHT = 4;
const MARGIN = 0.2;
const TITLE_HEIGHT = 0.4;
add(fillRect(0, 0, WIDTH, HEIGHT, 'lightgray!30'));
add(label(0, HEIGHT, 'Nonce PoS1', 'black', 'north west'));

const spd0 = add(hashPack(MARGIN, MARGIN, 'Scoop $\\#0$', ['Hash\\\\$\\#0$', 'Hash\\\\$\\#8191$']));
const spd1 = add(hashPack(MARGIN * 2 + spd0.width, MARGIN, 'Scoop $\\#2$', ['Hash\\\\$\\#0$', 'Hash\\\\$\\#8189$']));

const spu0 = add(hashPack(MARGIN, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#0$', ['Hash\\\\$\\#0$', 'Hash\\\\$\\#1$']));
const spu1 = add(hashPack(MARGIN * 2 + spd0.width, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#1$', ['Hash\\\\$\\#2$', 'Hash\\\\$\\#3$']));

const spd4094 = add(hashPack(WIDTH - MARGIN * 2 - spd0.width * 2, MARGIN, 'Scoop $\\#4094$', ['Hash\\\\$\\#8188$', 'Hash\\\\$\\#3$']));
const spd4095 = add(hashPack(WIDTH - MARGIN - spd0.width, MARGIN, 'Scoop $\\#4095$', ['Hash\\\\$\\#8190$', 'Hash\\\\$\\#1$']));

const spu4094 = add(hashPack(WIDTH - MARGIN * 2 - spd0.width * 2, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#4094$', ['Hash\\\\$\\#8188$', 'Hash\\\\$\\#8189$']));
const spu4095 = add(hashPack(WIDTH - MARGIN - spd0.width, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#4095$', ['Hash\\\\$\\#8190$', 'Hash\\\\$\\#8191$']));

add(arrowLine(spu0.hashes[1].bottom.x, spu0.hashes[1].bottom.y, spd4095.hashes[1].top.x, spd4095.hashes[1].top.y, 'green'));
add(arrowLine(spu4094.hashes[1].bottom.x, spu4094.hashes[1].bottom.y, spd0.hashes[1].top.x, spd0.hashes[1].top.y, 'red'));
add(arrowLine(spu1.hashes[1].bottom.x, spu1.hashes[1].bottom.y, spd4094.hashes[1].top.x, spd4094.hashes[1].top.y, 'blue'));
add(arrowLine(spu4095.hashes[1].bottom.x, spu4095.hashes[1].bottom.y, spd1.hashes[1].top.x, spd1.hashes[1].top.y, 'orange'));

add(label(WIDTH / 2, HEIGHT / 2, '\\dots'));

console.log(finalize());
