const { label, labelRect, rect } = require('./tikzpicture.js');


exports.hashPack = (x, y, scoopNum, hashList) => {
    const HASH_WIDTH = 1;
    const HASH_HEIGHT = 0.6;
    const MARGIN = 0.1;
    const TITLE_HEIGHT = 0.3;
    const WIDTH = MARGIN * 3 + HASH_WIDTH * 2;
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
