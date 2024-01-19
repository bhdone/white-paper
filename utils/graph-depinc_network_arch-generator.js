const { finalize, add, label, rect, fillRect, line, arrowLine, fontSize } = require('./lib/tikzpicture');

const computer = (x, y, title) => {
    const WIDTH = 0.4;
    const HEIGHT = 0.2;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, 'gray')().script;
        script += label(x + WIDTH / 2, y, title, 'black', 'north')().script;
        return {
            script,
            props: { x, y, title, top: { x: x + WIDTH / 2, y: y + HEIGHT }, right: { x: x + WIDTH, y: y + HEIGHT / 2 } },
        }
    }
}

const block = (x, y, color) => {
    const WIDTH = 1.3;
    const HEIGHT = 1;
    const LINE_HEIGHT = 0.2;
    const LINE_MARGIN = 0.13;
    const HEIGHT_MARGIN = 0.2;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, color ? color : 'gray')().script;
        script += label(x + WIDTH / 2, y + HEIGHT, '$blk (...)$', 'black', 'north')().script;
        for (let i = 0; i < 3; ++i) {
            script += line(x + LINE_MARGIN, i * LINE_HEIGHT + y + HEIGHT_MARGIN, x + WIDTH - LINE_MARGIN, i * LINE_HEIGHT + y + HEIGHT_MARGIN, 'lightgray')().script;
        }
        return {
            script,
            props: { x, y, width: WIDTH, height: HEIGHT, left: { x, y: y + HEIGHT / 2 }, bottom: { x: x + WIDTH / 2, y } },
        }
    }
}

const blockChain = (x, y, n, highlightTopColor) => {
    const ROW_HEIGHT = 1.4;
    return () => {
        let script = '';
        let blkWidth = 0;
        let blkHeight = 0;
        let topBlkProps = null;
        for (let i = 0; i < n; ++i) {
            let color = 'gray';
            if (i === n - 1 && typeof (highlightTopColor) === 'string') {
                color = highlightTopColor;
            }
            const r = block(x, i * ROW_HEIGHT + y, color)();
            if (i === n - 1) {
                topBlkProps = r.props;
            }
            script += r.script;
            script += arrowLine(r.props.bottom.x, r.props.bottom.y - ROW_HEIGHT + r.props.height, r.props.bottom.x, r.props.bottom.y)().script;
            if (blkWidth === 0) {
                blkWidth = r.props.width;
            }
            if (blkHeight === 0) {
                blkHeight = r.props.height;
            }
        }
        script += label(x + blkWidth / 2, y - (ROW_HEIGHT - blkHeight), 'blks...', 'black', 'north')().script;
        return {
            script,
            props: { x, y, n, topBlkProps },
        }
    }
}

const colorNote = (x, y, color, title) => {
    return () => {
        const colorRectWidth = 0.2;
        let script = '';
        script += fillRect(x, y, colorRectWidth, colorRectWidth, color)().script;
        script += label(x + colorRectWidth, y + colorRectWidth / 2, title, 'black', 'west')().script;
        return {
            script,
            props: { x, y, color, title },
        }
    }
}

const WIDTH = 13;
const HEIGHT = 4;

add(fontSize('tiny'));

add(label(0, HEIGHT, 'P2P network', 'black', 'north west'));

const LINE_Y = 3.5;
add(line(0, LINE_Y, WIDTH, LINE_Y, 'lightgray'));
add(line(0, LINE_Y + 0.05, WIDTH, LINE_Y + 0.05, 'lightgray'));

const blockChainProps = add(blockChain(11, -2.2, 3, 'green'));

const computers = [
    { x: 0.5, y: 1, title: 'node 1' },
    { x: 2.5, y: 2, title: 'node 2' },
    { x: 4.5, y: 1.5, title: 'node 3' },
    { x: 6.5, y: 0.5, title: 'node 4' },
    { x: 8.5, y: 1, title: 'miner' },
]
const PADDING_WIDTH = 0.1;
for (const comp of computers) {
    let lineTitle = '';
    let color = '';
    let reverse = false;
    if (comp.title === 'miner') {
        lineTitle = 'TXs';
        color = 'red';
        reverse = true;
    } else {
        lineTitle = 'TXs';
        color = 'blue';
    }
    const r = add(computer(comp.x, comp.y, comp.title));
    add(arrowLine(r.top.x, r.top.y, r.top.x, LINE_Y, color, reverse));
    add(label(r.top.x, r.top.y + (LINE_Y - r.top.y) / 2, lineTitle, color, 'west'));
    if (comp.title === 'miner') {
        add(arrowLine(r.right.x + PADDING_WIDTH, r.right.y, blockChainProps.topBlkProps.left.x - PADDING_WIDTH, blockChainProps.topBlkProps.left.y, 'green'));
    }
}

const NOTE_Y = -2;
const NOTE_HEIGHT = 0.3;
add(colorNote(0, NOTE_Y, 'blue', 'Send transactions to P2P network'));
add(colorNote(0, NOTE_Y + NOTE_HEIGHT, 'red', 'Collect transactions from P2P network'));
add(colorNote(0, NOTE_Y + NOTE_HEIGHT * 2, 'green', 'Build new block from collected transactions'));

console.log(finalize());
