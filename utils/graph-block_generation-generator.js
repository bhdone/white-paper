const { add, fontSize, labelRect, circle, finalize, arrowLine, line, label, rect, fillRect } = require('./lib/tikzpicture.js');

const MARGIN = 0.3;
const WIDTH = 13;
const HEIGHT = 8;
const MAIN_COLOR = 'black';
const DOT_R = 0.05;

add(fontSize('tiny'));

add(fillRect(-MARGIN, -6, WIDTH, HEIGHT, 'lightgray!30'));
add(label(-MARGIN, 2, 'Generate a new block', MAIN_COLOR, 'north west'));

const blockProps = add(labelRect(0, 0, 2, 1, 'Previous block', MAIN_COLOR));
add(circle(blockProps.bottomRight.x, blockProps.bottomRight.y, DOT_R, MAIN_COLOR));

const CH_WIDTH = 1.6;
const CH_HEIGHT = 0.4;
const challengeProps = add(labelRect((blockProps.width - CH_WIDTH) / 2, -1, CH_WIDTH, CH_HEIGHT, 'Challenge', MAIN_COLOR, 'red!50'));

add(circle(challengeProps.topRight.x, challengeProps.topRight.y, DOT_R, MAIN_COLOR));
add(circle(challengeProps.bottomRight.x, challengeProps.bottomRight.y, DOT_R, MAIN_COLOR));
add(arrowLine(blockProps.bottomRight.x, blockProps.bottomRight.y, challengeProps.topRight.x, challengeProps.topRight.y, MAIN_COLOR));

add(line(challengeProps.bottomRight.x, challengeProps.bottomRight.y, challengeProps.bottomRight.x + 1, challengeProps.bottomRight.y));
add(line(challengeProps.bottomRight.x + 1, challengeProps.bottomRight.y - 1, challengeProps.bottomRight.x + 1, challengeProps.bottomRight.y + 1));
add(arrowLine(challengeProps.bottomRight.x + 1, challengeProps.bottomRight.y - 1, challengeProps.bottomRight.x + 2, challengeProps.bottomRight.y - 1));
add(arrowLine(challengeProps.bottomRight.x + 1, challengeProps.bottomRight.y + 1, challengeProps.bottomRight.x + 2, challengeProps.bottomRight.y + 1));

const PROVER_WIDTH = 2;
const PROVER_HEIGHT = 1;

const OP_WIDTH = 2;
const OP_HEIGHT = 0.4;

const ptVDF = { x: challengeProps.bottomRight.x + 2, y: challengeProps.bottomRight.y - 1 };
const ptPOS = { x: challengeProps.bottomRight.x + 2, y: challengeProps.bottomRight.y + 1 };

const posProps = add(labelRect(ptPOS.x, ptPOS.y - PROVER_HEIGHT / 2, PROVER_WIDTH, PROVER_HEIGHT, 'Find PoS', MAIN_COLOR, 'blue!50'));
const vdfProps = add(labelRect(ptVDF.x, ptVDF.y - PROVER_HEIGHT / 2, PROVER_WIDTH, PROVER_HEIGHT, 'VDF', MAIN_COLOR, 'green!50'));

const OP_LINE_WIDTH = 4.5;
const MARGIN_LINE_DESC = 0.2;

const opArr1Props = add(arrowLine(posProps.right.x, posProps.right.y, posProps.right.x + OP_LINE_WIDTH, posProps.right.y, MAIN_COLOR));
add(label(posProps.right.x + OP_LINE_WIDTH / 2, posProps.right.y + MARGIN_LINE_DESC, "calculate ``required\\_iterations''", MAIN_COLOR));
const op1Props = add(labelRect(opArr1Props.x2, opArr1Props.y2 - OP_HEIGHT / 2, OP_WIDTH, OP_HEIGHT, 'Waiting VDF', MAIN_COLOR, 'black!20'));

const opArr2Props = add(arrowLine(vdfProps.right.x, vdfProps.right.y, vdfProps.right.x + OP_LINE_WIDTH, vdfProps.right.y, MAIN_COLOR));
add(label(vdfProps.right.x + OP_LINE_WIDTH / 2, vdfProps.right.y + MARGIN_LINE_DESC, "running delay function", MAIN_COLOR));
const op2Props = add(labelRect(opArr2Props.x2, opArr2Props.y2 - OP_HEIGHT / 2, OP_WIDTH, OP_HEIGHT, 'Ready', MAIN_COLOR, 'black!20'));

add(arrowLine(op1Props.bottom.x, op1Props.bottom.y, op2Props.top.x, op2Props.top.y, MAIN_COLOR));

add(line(op2Props.bottom.x, op2Props.bottom.y, op2Props.bottom.x, op2Props.bottom.y - 1, MAIN_COLOR));
add(line(op2Props.bottom.x, op2Props.bottom.y - 1, op2Props.bottom.x - 4, op2Props.bottom.y - 1, MAIN_COLOR));
const finalPtProps = add(arrowLine(op2Props.bottom.x - 4, op2Props.bottom.y - 1, op2Props.bottom.x - 4, op2Props.bottom.y - 2, MAIN_COLOR));
add(labelRect(finalPtProps.x2 - PROVER_WIDTH / 2, finalPtProps.y2 - PROVER_HEIGHT, PROVER_WIDTH, PROVER_HEIGHT, 'New block', MAIN_COLOR, 'white!30'));

console.log(finalize());
