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
        let tag = '';
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

exports.labelRect = (x, y, width, height, title, color) => {
    return () => {
        let script = '';
        script += exports.rect(x, y, width, height, color, true)().script;
        script += exports.label(x, y, title, color, 'south west')().script
        return {
            script,
            props: { x, y, width, height, title, color }
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

exports.fillRect = (x, y, width, height, color) => {
    return () => {
        let tag = '';
        if (color) {
            tag = color;
        }
        return {
            script: `\\filldraw[${tag}] (${x},${y}) rectangle (${x + width},${y + height});`,
            props: { x, y, width, height, color },
        }
    }
}

exports.line = (x, y, x2, y2, color) => {
    return () => {
        let tag = '';
        if (color) {
            tag = color;
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
