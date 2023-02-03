const { finalize, add, label, arrowLine, fontSize } = require('./lib/tikzpicture');
const { hashFunc } = require('./lib/common.js');

add(fontSize('tiny'));
const h1 = add(hashFunc(0, 0, ['plotter ID', 'nonce nr'], 'Shabal256()'));
const h2 = add(hashFunc(2.5, 0, ['hash $\\#8191$', 'plotter ID', 'nonce nr'], 'Shabal256()'));
const h3 = add(hashFunc(5, 0, ['hash $\\#8190$', 'hash $\\#8191$', 'plotter ID', 'nonce nr'], 'Shabal256()'));
add(arrowLine(h1.hashTitle.x, h1.hashTitle.y, h2.firstHash.x, h2.firstHash.y));
add(arrowLine(h2.hashTitle.x, h2.hashTitle.y, h3.firstHash.x, h3.firstHash.y));
add(label(7.4, 1, '\\dots', 'black'));
add(hashFunc(8, 0, ['hash $\\#n$', '\\dots', 'hash $\\#n127$', 'plotter ID', 'nonce nr'], 'Shabal256()'));
add(label(10.4, 1, '\\dots', 'black'));
add(hashFunc(11, 0, ['hash $\\#0$', '\\dots', 'hash $\\#8192$', 'plotter ID', 'nonce nr'], 'Shabal256()'));

console.log(finalize());
