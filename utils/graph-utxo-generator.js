const { add, finalize, fontSize, rect, fillRect, label, labelRect, line, arrowLine } = require('./lib/tikzpicture.js');

const indicateLine = (x, x2, y, lineHeight, color, dotted) => {
    return () => {
        let script = '';
        script += line(x, y, x, y + lineHeight, color, true)().script;
        script += line(x, y + lineHeight, x2, y + lineHeight, color, true)().script;
        script += line(x2, y, x2, y + lineHeight, color, true)().script;
        return {
            script,
            props: { x, x2, y, lineHeight, color, dotted, center: { x: x + (x2 - x) / 2, y: y + lineHeight } },
        }
    }
}

const tree = (x, y, fullWidth, margin, captions, color, bottomTitle) => {
    const LINE_HEIGHT = 0.3;
    const MARGIN = 0.1;
    return () => {
        let script = '';
        const WIDTH = (fullWidth - 3 * margin) / 4;
        for (let i = 0; i < 4; ++i) {
            let title = 'N/A';
            if (typeof (captions) === 'string') {
                title = captions;
            } else if (captions.length != 4) {
                if (captions.length > 0) {
                    title = captions[0];
                }
            } else {
                title = captions[i];
            }
            script += labelRect(x + (WIDTH + margin) * i, y, WIDTH, WIDTH, title, color)().script;
        }
        const { script: s1, props: p1 } = indicateLine(x + WIDTH / 2, x + WIDTH / 2 + WIDTH + margin, y + WIDTH, LINE_HEIGHT, color, true)();
        const { script: s2, props: p2 } = indicateLine(x + WIDTH / 2 + (WIDTH + margin) * 2, x + WIDTH / 2 + (WIDTH + margin) * 3, y + WIDTH, LINE_HEIGHT, color, true)();
        script += s1;
        script += s2;
        const { script: s3, props: p3 } = indicateLine(p1.center.x, p2.center.x, p1.center.y, LINE_HEIGHT, color, true)();
        script += s3;
        if (bottomTitle) {
            script += label(x + fullWidth / 2, y - MARGIN, bottomTitle, color, 'north')().script;
        }
        return {
            script,
            props: { x, y, fullWidth, margin, captions, top: { ...p3.center } },
        }
    }
}

const block = (x, y, title, color) => {
    const WIDTH = 5;
    const HEIGHT = 5;
    const TITLE_MARGIN = 0.2;
    const ELEMENT_HEIGHT = 0.6;
    const ELEMENT_TOP_MARGIN = 1.5;
    const TREE_ELE_MARGIN = 0.1;
    const TREE2_OFFSET_Y = -1.5;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, color, true)().script;
        script += fontSize('small')().script;
        script += label(x + TITLE_MARGIN, y + HEIGHT - TITLE_MARGIN, title, color, 'north west')().script;
        script += fontSize('scriptsize')().script;
        const { script: previousScript, props: previousProps } = labelRect(x + TITLE_MARGIN, y + HEIGHT - ELEMENT_TOP_MARGIN, WIDTH - TITLE_MARGIN * 2, ELEMENT_HEIGHT, 'Previous Hash', color)();
        script += previousScript;
        const SUBELEMENT_WIDTH = (WIDTH - 3 * TITLE_MARGIN) / 2;
        const { script: s1, props: p1 } = labelRect(x + TITLE_MARGIN, y + HEIGHT - (ELEMENT_TOP_MARGIN + ELEMENT_HEIGHT + TITLE_MARGIN), SUBELEMENT_WIDTH, ELEMENT_HEIGHT, 'TX ROOT', color)();
        script += s1;
        const { script: s2, props: p2 } = labelRect(x + TITLE_MARGIN * 2 + SUBELEMENT_WIDTH, y + HEIGHT - (ELEMENT_TOP_MARGIN + ELEMENT_HEIGHT + TITLE_MARGIN), SUBELEMENT_WIDTH, ELEMENT_HEIGHT, 'STATE ROOT', color)();
        script += s2;
        script += fontSize('tiny')().script;
        const { script: ts1, props: tp1 } = tree(x + TITLE_MARGIN, y + TITLE_MARGIN, SUBELEMENT_WIDTH, TREE_ELE_MARGIN, 'TX', color)();
        script += ts1;
        const { script: ts2, props: tp2 } = tree(x + TITLE_MARGIN * 2 + SUBELEMENT_WIDTH, y + TREE2_OFFSET_Y, SUBELEMENT_WIDTH, TREE_ELE_MARGIN, ['A', 'B', 'C', 'D'], color, 'UTXO SET')();
        script += ts2;
        script += arrowLine(tp1.top.x, tp1.top.y, tp1.top.x, p1.bottom.y, color)().script;
        script += arrowLine(tp2.top.x, tp2.top.y, tp2.top.x, p2.bottom.y, color)().script;
        return {
            script,
            props: { x, y, width: WIDTH, height: HEIGHT, title, left: { x: x + TITLE_MARGIN, y: previousProps.left.y }, right: { x: x + WIDTH, y: previousProps.right.y } },
        }
    }
}

const BLOCK_MARGIN = 1;
const LINE_WIDTH = 1;

const TITLE_MARGIN = 0.2;
const BG_OFFSET_X = -1;
const BG_OFFSET_Y = -2.5;
const WIDTH = 13.5;
const HEIGHT = 9;

add(fillRect(BG_OFFSET_X, BG_OFFSET_Y, WIDTH, HEIGHT, 'lightgray!30'));

const b1props = add(block(0, 0, 'BLOCK 1', 'black'));
const b2props = add(block(b1props.width + BLOCK_MARGIN, 0, 'BLOCK 2', 'black'));

add(arrowLine(b1props.left.x - LINE_WIDTH, b1props.left.y, b1props.left.x, b1props.left.y, 'black'));
add(arrowLine(b2props.right.x, b2props.right.y, b2props.right.x + LINE_WIDTH, b2props.right.y, 'black'));
add(arrowLine(b1props.right.x, b1props.right.y, b2props.left.x, b2props.left.y, 'black'));

add(fontSize('tiny'));
add(label(BG_OFFSET_X + TITLE_MARGIN, HEIGHT + BG_OFFSET_Y - TITLE_MARGIN, 'UTXO data model', 'black', 'north west'));

console.log(finalize());
