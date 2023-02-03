const { finalize, add, label, labelRect, rect, fillRect, line, arrowLine, fontSize } = require('./lib/tikzpicture');

const hashFunc = (x, y, insideShapes, hashTitle) => {
    const WIDTH = 1.5;
    const MARGIN_WIDTH = 0.1;
    const ITEM_HEIGHT = 0.4;
    const ROW_HEIGHT = ITEM_HEIGHT + MARGIN_WIDTH;
    const HASH_HEIGHT = 0.35;
    return () => {
        let script = '';
        script += fillRect(x, y, WIDTH + MARGIN_WIDTH * 2, ROW_HEIGHT * insideShapes.length + MARGIN_WIDTH * 2 + HASH_HEIGHT, 'lightgray!30')().script;
        script += label(x + MARGIN_WIDTH, y + insideShapes.length * ROW_HEIGHT + MARGIN_WIDTH, hashTitle, 'black', 'south west')().script;
        for (let i = 0; i < insideShapes.length; ++i) {
            script += labelRect(x + MARGIN_WIDTH, i * ROW_HEIGHT + y + MARGIN_WIDTH, 1.5, ITEM_HEIGHT, insideShapes[i], 'black')().script;
        }
        return {
            script,
            props: {
                x, y, insideShapes, hashTitle,
                hashTitle: { x: x + WIDTH + 0.1, y: y + ROW_HEIGHT * insideShapes.length + MARGIN_WIDTH + HASH_HEIGHT / 2 },
                firstHash: { x, y: y + ITEM_HEIGHT / 2 + MARGIN_WIDTH },
            },
        }
    }
}
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
