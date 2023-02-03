const { add, finalize, fontSize, label, rect, arrowLine } = require('./lib/tikzpicture.js');
const { hashFunc } = require('./lib/common.js');

const plotFile = (x, y) => {
    const WIDTH = 2;
    const HEIGHT = 2;
    const MARGIN = 0.1;
    const CONTENTS = [
        'Scoop \\#403',
        'Nonce \\#32',
        'Nonce \\#34',
        'Nonce \\#35',
        '\\dots',
    ];
    const ITEM_HEIGHT = 0.2;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, 'black')().script;
        script += label(x, y + HEIGHT + MARGIN, 'Plot file', 'black', 'south west')().script;
        let startY = HEIGHT - MARGIN;
        for (let i = 0; i < CONTENTS.length; ++i) {
            script += label(x + MARGIN, startY - (MARGIN + ITEM_HEIGHT) * i, CONTENTS[i], 'blue', 'north west')().script;
        }
        return {
            script,
            props: { x, y, width: WIDTH, height: HEIGHT },
        }
    }
}

const threeArrows = (x, y) => {
    const MARGIN = 0.3;
    const WIDTH = 1.5;
    const HEIGHT = 0.1;
    return () => {
        let script = '';
        for (let i = 0; i < 3; ++i) {
            const currY = y + i * (MARGIN + HEIGHT);
            script += arrowLine(x, currY, x + WIDTH, currY)().script;
        }
        return {
            script,
            props: { x, y, height: HEIGHT * 3, width: WIDTH },
        }
    }
}

const MARGIN = 0.2;
const ARROW_WIDTH = 1;

add(fontSize('tiny'));

const plotFileProps = add(plotFile(0, 0));
const threeArrowsProps = add(threeArrows(plotFileProps.width + MARGIN, 0.5));
const hashProps = add(hashFunc(plotFileProps.width + MARGIN * 2 + threeArrowsProps.width, 0.2, ['Scoop', 'GenSig'], 'Shabal256'));
const arrowProps = add(arrowLine(hashProps.hashTitle.x, hashProps.hashTitle.y, hashProps.hashTitle.x + ARROW_WIDTH, hashProps.hashTitle.y));

add(label(arrowProps.x2, arrowProps.y2, '$\\frac{Target}{BaseTarget}=DeadLine$', 'blue', 'west'));

console.log(finalize());
