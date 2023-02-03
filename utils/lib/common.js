const { label, labelRect, rect, fillRect, line, circle, fillCircle, fillArc, arrowLine } = require('./tikzpicture.js');

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

exports.people = (x, y, name, color, fillColor, bkColor) => {
    const R = 0.5;
    const R2 = 0.4;
    const R3 = 0.35;
    const R_BODY = 0.8;
    const BODY_OFFSET = -1;
    const TITLE_OFFSET_Y = - 0.3;
    return () => {
        let script = '';
        script += fillArc(0, 180, R_BODY, { x: x + R_BODY, y: y + BODY_OFFSET }, fillColor)().script;
        script += fillCircle(x, y, R, bkColor)().script;
        script += fillCircle(x, y, R2, 'black!50')().script;
        script += fillCircle(x, y, R3, color)().script;
        script += label(x, y + BODY_OFFSET, name, 'black', 'north')().script;
        return {
            script,
            props: {
                x, y, name, color, fillColor, bkColor,
                top: { x, y: y + R },
                bottom: { x, y: y + BODY_OFFSET + TITLE_OFFSET_Y },
                left: { x: x - R_BODY, y },
                right: { x: x + R_BODY, y },
            },
        }
    }
}

exports.titleLine = (x, y, x2, y2, title, color, reverse) => {
    return () => {
        let script = '';
        script += arrowLine(x, y, x2, y2, color, reverse)().script;
        script += label((x2 - x) / 2 + x, y, title, color, 'south')().script;
        return {
            script,
            props: { x, y, x2, y2, title, color, reverse },
        }
    }
}

exports.disk = (x, y, color) => {
    const WIDTH = 1.3;
    const HEIGHT = 0.25;
    const MARGIN = 0.1;
    const MARGIN_DOT = 0.2;
    const DOT_R = 0.04;
    return () => {
        let script = '';
        script += rect(x, y, WIDTH, HEIGHT, color, true)().script;
        script += circle(x + WIDTH - MARGIN_DOT, y + HEIGHT / 2, DOT_R, color)().script;
        script += line(x + MARGIN, y + HEIGHT / 2, x + WIDTH - MARGIN * 2 - MARGIN_DOT, y + HEIGHT / 2)().script;
        return {
            script,
            props: { x, y, width: WIDTH, height: HEIGHT },
        }
    }
}

exports.localStorage = (x, y, n, color) => {
    const MARGIN = 0.03;
    return () => {
        let { script, props } = exports.disk(x, y, color)();
        for (let i = 1; i < n; ++i) {
            script += exports.disk(x, y + i * (props.height + MARGIN), color)().script;
        }
        return {
            script,
            props: { x, y, n, width: props.width, height: n * props.height },
        }
    }
}

exports.computer = (x, y, color) => {
    const WIDTH = 1;
    const HEIGHT= 1.9;
    const OFFSET = 0.6;
    const MARGIN = 0.15;
    const LINE_HEIGHT = 0.08;
    return () => {
        let script = '';
        script += fillRect(x - WIDTH / 2, y - HEIGHT / 2 + OFFSET, WIDTH, HEIGHT, 'lightgray!30', true)().script;
        script += rect(x - WIDTH / 2, y - HEIGHT / 2 + OFFSET, WIDTH, HEIGHT, 'black', true)().script;
        script += circle(x, y, 0.04, color)().script;
        const X = x + MARGIN - WIDTH / 2;
        const X2 = X + WIDTH - MARGIN * 2;
        for (let i = 2; i < 7; ++i) {
            script += line(X, (i + 1) * LINE_HEIGHT * 2 + y, X2, (i + 1) * LINE_HEIGHT * 2 + y, color)().script;
        }
        return {
            script,
            props: { x, y, color },
        }
    }
}
