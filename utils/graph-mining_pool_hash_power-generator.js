let POOLS = [
    {
        name: "BTC.top",
        percent: 15.28,
    },
    {
        name: "BTC.com",
        percent: 13.19,
    },
    {
        name: "ViaBTC",
        percent: 13.19,
    },
    {
        name: "F2Pool",
        percent: 13.19,
    },
    {
        name: "Poolin",
        percent: 10.42,
    },
    {
        name: "AntPool",
        percent: 9.03,
    },
    {
        name: "Slush",
        percent: 4.17,
    },
    {
        name: "BitFury",
        percent: 3.47,
    },
    {
        name: "Huobi",
        percent: 2.78,
    },
    {
        name: "Bitcoin.com",
        percent: 2.78,
    },
    {
        name: "BitClub",
        percent: 2.78,
    },
    {
        name: "Dpool",
        percent: 2.08,
    },
    {
        name: "SigmaPool",
        percent: 0.69,
    },
    {
        name: "Other",
        percent: 0,
    },
];

const COLOR_NAMES = ["cyan", "magenta", "orange", "brown", "teal", "lime", "red", "green", "purple", "gray", "blue", "olive"];
const COLOR_OPACITIES = [60, 30];

const RADIUS = 5;

const percentToAngle = (percent) => {
    return percent / 100 * 360;
}

const angelToRadians = (angel) => {
    return angel / (180 / 3.141593);
}

const calcPositionX = (angel, r) => {
    return Math.cos(angelToRadians(angel)) * r;
}

const calcPositionY = (angel, r) => {
    return Math.sin(angelToRadians(angel)) * r;
}

const randomColorName = (lastName) => {
    let idx = Math.floor(Math.random() * COLOR_NAMES.length);
    if (COLOR_NAMES[idx] === lastName) {
        ++idx;
        if (idx >= COLOR_NAMES.length) {
            idx = 0;
        }
    }
    return COLOR_NAMES[idx];
}

const randomColorOpacity = () => {
    const idx = Math.floor(Math.random() * COLOR_OPACITIES.length);
    return COLOR_OPACITIES[idx];
}

const isColorTaken = (color, opacity) => {
    for (const pool of POOLS) {
        if (pool.color === color && pool.opacity === opacity) {
            return true;
        }
    }
    return false;
}

let lastColor = "";
let lastAngel = 0;
let percentLeft = 100;
console.log("\\begin{tikzpicture}");
console.log("    \\tiny");
for (const pool of POOLS) {
    if (pool.percent === 0) {
        pool.percent = Math.floor(percentLeft * 100) / 100;
    }
    const thisAngel = percentToAngle(pool.percent);
    const angel = thisAngel + lastAngel;
    const x = calcPositionX(lastAngel, RADIUS);
    const y = calcPositionY(lastAngel, RADIUS);
    let color = randomColorName(lastColor);
    let opacity = randomColorOpacity();
    while (isColorTaken(color, opacity)) {
        color = randomColorName(lastColor);
        opacity = randomColorOpacity();
    }
    // Output
    console.log(`    \\filldraw[${color}!${opacity}] (0,0) -- (${x},${y}) arc(${lastAngel}:${angel}:${RADIUS}) -- (0,0);`);
    pool.color = color;
    pool.opacity = opacity;
    // Info
    const infoAngel = lastAngel + thisAngel / 2;
    const infoStartX = calcPositionX(infoAngel, RADIUS);
    const infoStartY = calcPositionY(infoAngel, RADIUS);
    const infoEndX = calcPositionX(infoAngel, RADIUS + 1);
    const infoEndY = calcPositionY(infoAngel, RADIUS + 1);
    const infoToRight = infoAngel >= 0 && infoAngel <= 90 || infoAngel >= 270;
    const infoToTop = infoAngel < 180;
    const infoToX = infoToRight ? infoEndX + 0.5 : infoEndX - 0.5;
    const infoText = `${pool.name}, $${pool.percent}\\%$`;
    const infoTextPos = infoToTop ? "above" : "below";
    console.log(`    \\draw (${infoStartX},${infoStartY}) -- (${infoEndX},${infoEndY}) -- (${infoToX},${infoEndY}) node[${infoTextPos}]{${infoText}};`);
    // Next
    lastColor = color;
    lastAngel = angel;
    percentLeft -= pool.percent;
}
console.log("\\end{tikzpicture}");
