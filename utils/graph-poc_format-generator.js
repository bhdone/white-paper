const { add, finalize, arrowLine, fontSize, fillRect, label, labelRect, rect } = require('./lib/tikzpicture.js');

const scoop = (x, y, scoopNum, hash1Num, hash2Num) => {
    const HASH_WIDTH = 1;
    const HASH_HEIGHT = 0.6;
    const MARGIN = 0.1;
    const TITLE_HEIGHT = 0.3;
    const WIDTH = MARGIN * 3 + HASH_WIDTH * 2;
    const HEIGHT = HASH_HEIGHT + MARGIN * 3 + TITLE_HEIGHT;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, 'black')().script;
        script += labelRect(x + MARGIN, y + MARGIN, HASH_WIDTH, HASH_HEIGHT, hash1Num, 'black')().script;
        script += labelRect(x + MARGIN + HASH_WIDTH + MARGIN, y + MARGIN, HASH_WIDTH, HASH_HEIGHT, hash2Num, 'black')().script;
        script += label(x + WIDTH / 2, y + MARGIN * 2 + HASH_HEIGHT + TITLE_HEIGHT / 2, scoopNum)().script;
        return {
            script,
            props: {
                x, y, width: WIDTH, height: HEIGHT, scoopNum, hash1Num, hash2Num,
                hash1Top: { x: x + MARGIN + HASH_WIDTH / 2, y: y + MARGIN + HASH_HEIGHT },
                hash2Top: { x: x + MARGIN + HASH_WIDTH + MARGIN + HASH_WIDTH / 2, y: y + MARGIN + HASH_HEIGHT },
                hash1Bottom: { x: x + MARGIN + HASH_WIDTH / 2, y: y + MARGIN },
                hash2Bottom: { x: x + MARGIN + HASH_WIDTH + MARGIN + HASH_WIDTH / 2, y: y + MARGIN },
            },
        }
    }
}

add(fontSize('tiny'));

const WIDTH = 13;
const HEIGHT = 4;
const MARGIN = 0.2;
const TITLE_HEIGHT = 0.4;
add(fillRect(0, 0, WIDTH, HEIGHT, 'lightgray!30'));
add(label(0, HEIGHT, 'Nonce POC1', 'black', 'north west'));

const spd0 = add(scoop(MARGIN, MARGIN, 'Scoop $\\#0$', 'Hash\\\\$\\#0$', 'Hash\\\\$\\#8191$'));
const spd1 = add(scoop(MARGIN * 2 + spd0.width, MARGIN, 'Scoop $\\#2$', 'Hash\\\\$\\#0$', 'Hash\\\\$\\#8189$'));

const spu0 = add(scoop(MARGIN, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#0$', 'Hash\\\\$\\#0$', 'Hash\\\\$\\#1$'));
const spu1 = add(scoop(MARGIN * 2 + spd0.width, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#1$', 'Hash\\\\$\\#2$', 'Hash\\\\$\\#3$'));

const spd4094 = add(scoop(WIDTH - MARGIN * 2 - spd0.width * 2, MARGIN, 'Scoop $\\#4094$', 'Hash\\\\$\\#8188$', 'Hash\\\\$\\#3$'));
const spd4095 = add(scoop(WIDTH - MARGIN - spd0.width, MARGIN, 'Scoop $\\#4095$', 'Hash\\\\$\\#8190$', 'Hash\\\\$\\#1$'));

const spu4094 = add(scoop(WIDTH - MARGIN * 2 - spd0.width * 2, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#4094$', 'Hash\\\\$\\#8188$', 'Hash\\\\$\\#8189$'));
const spu4095 = add(scoop(WIDTH - MARGIN - spd0.width, HEIGHT - spd0.height - MARGIN - TITLE_HEIGHT, 'Scoop $\\#4095$', 'Hash\\\\$\\#8190$', 'Hash\\\\$\\#8191$'));

add(arrowLine(spu0.hash2Bottom.x, spu0.hash2Bottom.y, spd4095.hash2Top.x, spd4095.hash2Top.y, 'green'));
add(arrowLine(spu4094.hash2Bottom.x, spu4094.hash2Bottom.y, spd0.hash2Top.x, spd0.hash2Top.y, 'red'));
add(arrowLine(spu1.hash2Bottom.x, spu1.hash2Bottom.y, spd4094.hash2Top.x, spd4094.hash2Top.y, 'blue'));
add(arrowLine(spu4095.hash2Bottom.x, spu4095.hash2Bottom.y, spd1.hash2Top.x, spd1.hash2Top.y, 'orange'));

add(label(WIDTH / 2, HEIGHT / 2, '\\dots'));

console.log(finalize());
