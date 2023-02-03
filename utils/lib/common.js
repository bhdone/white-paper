const { label, labelRect, rect, fillRect } = require('./tikzpicture.js');


exports.hashPack = (x, y, scoopNum, hashList) => {
    const HASH_WIDTH = 1;
    const HASH_HEIGHT = 0.6;
    const MARGIN = 0.2;
    const TITLE_HEIGHT = 0.3;
    const WIDTH = MARGIN * (hashList.length + 1) + HASH_WIDTH * hashList.length;
    const HEIGHT = HASH_HEIGHT + MARGIN * 3 + TITLE_HEIGHT;
    return () => {
        let script = '';
        let hashes = [];
        script += rect(x, y, WIDTH, HEIGHT, 'black')().script;
        for (let i = 0; i < hashList.length; ++i) {
            const hashProp = {
                x: x + MARGIN + i * (HASH_WIDTH + MARGIN),
                y: y + MARGIN,
                width: HASH_WIDTH,
                height: HASH_HEIGHT,
                top: {
                    x: x + MARGIN + i * (HASH_WIDTH + MARGIN) + HASH_WIDTH / 2,
                    y: y + MARGIN + HASH_HEIGHT,
                },
                bottom: {
                    x: x + MARGIN + i * (HASH_WIDTH + MARGIN) + HASH_WIDTH / 2,
                    y: y + MARGIN,
                },
            }
            script += labelRect(hashProp.x, hashProp.y, HASH_WIDTH, HASH_HEIGHT, hashList[i], 'black')().script;
            hashes.push(hashProp);
        }
        script += label(x + WIDTH / 2, y + MARGIN * 2 + HASH_HEIGHT + TITLE_HEIGHT / 2, scoopNum)().script;
        return {
            script,
            props: { x, y, width: WIDTH, height: HEIGHT, scoopNum, hashes },
        }
    }
}

exports.hashFunc = (x, y, insideShapes, hashTitle) => {
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
