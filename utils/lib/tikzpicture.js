const makeLine = (str) => {
    return str + "\r\n";
}

let g_script = '';

// TODO a prop manager

const propToString = (prop) => {
    if (typeof (prop) === 'object') {
        return `${prop.name}=${prop.value}`;
    }
    return prop;
}

const propAdd = (script, prop) => {
    if (!script || script.length === 0) {
        return propToString(prop);
    }
    return script + ',' + propToString(prop);
};

exports.label = (x, y, title, color, anchor) => {
    return () => {
        let tag = propAdd(null, { name: 'align', value: 'left' });
        if (color) {
            tag = propAdd(tag, color);
        }
        if (anchor) {
            tag = propAdd(tag, { name: 'anchor', value: anchor });
        }
        return {
            script: `\\node[${tag}] at (${x},${y}) {${title}};`,
            props: { x, y, title, color, anchor },
        }
    }
}

exports.labelRect = (x, y, width, height, title, color, bgColor, round) => {
    const MARGIN = 0.1;
    return () => {
        let script = '';
        if (bgColor) {
            script += exports.fillRect(x, y, width, height, bgColor, round)().script;
        } else {
            script += exports.rect(x, y, width, height, color, round)().script;
        }
        script += exports.label(x + width / 2, y + height / 2, title, color)().script
        return {
            script,
            props: {
                x, y, width, height, title, color,
                left: { x, y: y + height / 2 },
                right: { x: x + width, y: y + height / 2 },
                top: { x: x + width / 2, y: y + height },
                bottom: { x: x + width / 2, y },
                topLeft: { x: x + MARGIN, y: y + height - MARGIN },
                topRight: { x: x + width - MARGIN, y: y + height - MARGIN },
                bottomLeft: { x: x + MARGIN, y: y + MARGIN },
                bottomRight: { x: x + width - MARGIN, y: y + MARGIN }
            }
        }
    }
}

exports.rect = (x, y, width, height, color, round) => {
    return () => {
        let tag = '';
        if (color) {
            tag = propAdd(tag, color);
        }
        if (round) {
            tag = propAdd(tag, 'rounded corners');
        }
        return {
            script: `\\draw[${tag}] (${x},${y}) rectangle (${x + width},${y + height});`,
            props: { x, y, width, height, color, round },
        }
    }
}

exports.fillRect = (x, y, width, height, color, round) => {
    return () => {
        let tag = '';
        if (color) {
            tag = color;
        }
        if (round) {
            tag = propAdd(tag, 'rounded corners');
        }
        return {
            script: `\\filldraw[${tag}] (${x},${y}) rectangle (${x + width},${y + height});`,
            props: { x, y, width, height, color },
        }
    }
}

exports.line = (x, y, x2, y2, color, dotted) => {
    return () => {
        let tag = '';
        if (color) {
            tag = color;
        }
        if (dotted) {
            tag = propAdd(tag, 'dotted');
        }
        return {
            script: `\\draw[${tag}] (${x},${y}) -- (${x2},${y2});`,
            props: { x, y, x2, y2, color },
        }
    }
}

exports.arrowLine = (x, y, x2, y2, color, reverse) => {
    return () => {
        let tag = '';
        if (reverse) {
            tag = propAdd(null, 'stealth-');
        } else {
            tag = propAdd(null, '-stealth');
        }
        if (color) {
            tag = propAdd(tag, color);
        }
        return {
            script: `\\draw[${tag}] (${x},${y}) -- (${x2},${y2});`,
            props: { x, y, x2, y2, color, reverse },
        }
    }
}

exports.circle = (x, y, r, color, lineWidth) => {
    return () => {
        let tag = '';
        if (color) {
            tag = propAdd(tag, color);
        }
        if (lineWidth) {
            tag = propAdd(tag, { name: 'line width', value: lineWidth });
        }
        return {
            script: `\\draw[${tag}] (${x},${y}) circle (${r});`,
            props: { x, y, r },
        }
    }
}

exports.fillCircle = (x, y, r, color, lineWidth) => {
    return () => {
        let tag = '';
        if (color) {
            tag = propAdd(tag, color);
        }
        if (lineWidth) {
            tag = propAdd(tag, { name: 'line width', value: lineWidth });
        }
        return {
            script: `\\filldraw[${tag}] (${x},${y}) circle (${r});`,
            props: { x, y, r },
        }
    }
}

exports.fillArc = (from, to, radius, pt, color) => {
    return () => {
        let tag = '';
        if (color) {
            tag = propAdd(tag, color);
        }
        let script = `\\filldraw[${tag}] (${pt.x},${pt.y}) arc (${from}:${to}:${radius});`;
        return {
            script,
            props: { from, to, radius, center: pt, color },
        }
    }
}

exports.add = (callback) => {
    const { script, props } = callback();
    g_script += makeLine(script);
    return props;
}

exports.fontSize = (size) => {
    return () => {
        return {
            script: "\\" + size,
            props: { size },
        }
    }
}

exports.finalize = () => {
    return makeLine('\\begin{tikzpicture}') + g_script + makeLine('\\end{tikzpicture}');
}
