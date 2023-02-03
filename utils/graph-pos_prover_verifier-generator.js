const { add, finalize, fontSize, rect, label } = require('./lib/tikzpicture.js');

const { people, titleLine, localStorage } = require('./lib/common.js');

const PEOPLE_DIST = 6;
const DESC_COLOR = 'gray';

const p1Props = add(people(0, 0, 'Verifier', 'lightgray!30', 'blue!50', 'white'));
const p2Props = add(people(PEOPLE_DIST, 0, 'Prover', 'lightgray!30', 'red!50', 'white'));

const LINE_OFFSET = 1.5;
const LINE_2ND_Y = -0.6;

add(fontSize('tiny'));

add(titleLine(LINE_OFFSET, 0, PEOPLE_DIST - LINE_OFFSET, 0, '2. challenge', DESC_COLOR));
add(titleLine(LINE_OFFSET, LINE_2ND_Y, PEOPLE_DIST - LINE_OFFSET, LINE_2ND_Y, '4. Proof of Space', DESC_COLOR, true));

const START_X = 7.5;
const LEN = 2;

add(titleLine(START_X, 0, START_X + LEN, 0, '1. initial space', DESC_COLOR));
add(titleLine(START_X, LINE_2ND_Y, START_X + LEN, LINE_2ND_Y, '3. get proof', DESC_COLOR, true));

add(label(p1Props.x, p1Props.y - 2, '5. verify proof', DESC_COLOR));
add(localStorage(p2Props.x + 4.3, -1.1, 5, 'black'));

const MARGIN = 0.5;
const TITLE_MARGIN = 0.1;

add(rect(p1Props.left.x - MARGIN, -2.5, 13.5, 4, 'lightgray', true));
add(label(p1Props.left.x - MARGIN + TITLE_MARGIN, 1.5 - TITLE_MARGIN, 'Proof of Space', 'black', 'north west'));

console.log(finalize());
