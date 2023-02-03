const DATA_PATH = "data/btc_energy_consumption-2017_2022.csv";
const ROWS = [0, 50, 100, 150, 200, 250];
const COMPARE_TIMEPOINTS = [{ dateStr: "2018-10-05" }, { dateStr: "2018-12-20" }, { dateStr: "2022-01-20" }, { dateStr: "2022-10-10" }];
const ROW_HEIGHT = 0.7;
const WIDTH = 12;
const HEIGHT = (ROWS.length - 1) * ROW_HEIGHT;
const NUM_OF_TIMEPOINTS = 10;
const TIMEPOINT_WIDTH = WIDTH / NUM_OF_TIMEPOINTS;
const MAX_POWER = 250;
const TOTAL_POINTS = 300;
const FOOTER_MARGIN = 2.5;

const parseDateStr = (str) => {
    const pattern = /(\d+)-(\d+)-(\d+)/g;
    const res = pattern.exec(str);
    if (!res) {
        // Cannot parse date string
        return null;
    }
    const year = parseInt(res[1]);
    const month = parseInt(res[2]);
    const day = parseInt(res[3]);
    return new Date(year, month, day);
}

const getData = () => {
    const fs = require('fs');
    let data = [];
    let range = {
        first: null,
        last: null,
    };
    const lines = fs.readFileSync(DATA_PATH, 'utf-8').split("\n");
    for (let i = 0; i < lines.length; ++i) {
        const rows = lines[i].split(',');
        const date = parseDateStr(rows[0]);
        if (date) {
            if (!range.first) {
                range.first = date;
            }
            if (!range.last) {
                range.last = date;
            }
            if (range.first.getTime() > date.getTime()) {
                range.first = date;
            }
            if (range.last.getTime() < date.getTime()) {
                range.last = date;
            }
            data.push({
                date,
                estimated: rows[1],
                minimum: rows[2],
            });
        }
    }
    return { data, range };
}

const formatNum = (n) => {
    const numFor = Intl.NumberFormat('en-US');
    return numFor.format(n);
}

const genDrawScript = (data, color, getValue, doMark) => {
    let drawScript = `    \\draw[${color},line width=1pt]`;
    let dataIdx = 0;
    let markPositions = [];
    const durationOfEachPoint = (range.last.getTime() - range.first.getTime()) / TOTAL_POINTS;
    const widthOfEachPoint = WIDTH / TOTAL_POINTS;
    for (let i = 0; i < TOTAL_POINTS; ++i) {
        const date = new Date(range.first.getTime() + durationOfEachPoint * i);
        while (data[dataIdx].date.getTime() < date.getTime()) {
            ++dataIdx;
        }
        // Now draw the point
        const x = widthOfEachPoint * i;
        const val = getValue(data[dataIdx]);
        const y = val / MAX_POWER * HEIGHT;
        if (i > 0) {
            drawScript += " -- ";
        }
        // Compare time points
        if (doMark) {
            let mark = false;
            for (let j = 0; j < COMPARE_TIMEPOINTS.length; ++j) {
                const timepoint = COMPARE_TIMEPOINTS[j];
                if (!timepoint.marked) {
                    const timepointDate = parseDateStr(timepoint.dateStr);
                    if (date.getTime() > timepointDate.getTime()) {
                        mark = true;
                        timepoint.marked = true;
                        break;
                    }
                }
            }
            if (mark) {
                // Save position for later
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear() % 100;
                const val2 = Math.floor(val * 1000);
                const valStr = formatNum(val2);
                const text = `${valStr} ${month},${year}`;
                markPositions.push({ x, y, text });
            }
        }
        drawScript += ` (${x},${y})`;
    }
    drawScript += ";";
    return { drawScript, markPositions };
}

const genFootNote = (x, y, color, text) => {
    return `\\filldraw[${color}] (${x},${y}) node[black,anchor=west,xshift=0.2cm,yshift=0.02cm] {${text}} rectangle (${x + 0.1},${y + 0.1});`
}

console.log(`\\begin{tikzpicture}`);
console.log(`    \\tiny`);

// Left marks
for (let i = 0; i < ROWS.length; ++i) {
    const row = formatNum(ROWS[i] * 1000);
    const y = i * ROW_HEIGHT;
    console.log(`    \\draw[lightgray!30] (0,${y}) node[black,anchor=east] {${row}} -- (${WIDTH},${y});`);
}

// Time points
const { data, range } = getData();
const duration = range.last.getTime() - range.first.getTime();
const durationEachTimePoint = duration / NUM_OF_TIMEPOINTS;
for (let i = 1; i < NUM_OF_TIMEPOINTS; ++i) {
    const millionSecondsOfTheTimePoint = i * durationEachTimePoint + range.first.getTime();
    const timepointDate = new Date(millionSecondsOfTheTimePoint);
    const month = timepointDate.toLocaleString('default', { month: 'short' });
    const year = timepointDate.getFullYear() % 100;
    const x = i * TIMEPOINT_WIDTH;
    console.log(`    \\draw[lightgray!30] (${x},-0.1) node[black,anchor=north] {${month},${year}} -- (${x},0);`);
}

// Data line: minimum power
const minimum = genDrawScript(data, 'red!30', (dataObj) => {
    return dataObj.minimum;
});
console.log(minimum.drawScript);

// Data line: estimated power
const estimate = genDrawScript(data, 'red', (dataObj) => {
    return dataObj.estimated;
}, true);
console.log(estimate.drawScript);

// Marked position
for (let i = 0; i < estimate.markPositions.length; ++i) {
    const { x, y, text } = estimate.markPositions[i];
    console.log(`    \\draw[->,lightgray] (${x},${y}) -- (${x},${y + 0.5}) node[black,anchor=south west,xshift=-0.3cm,yshift=0.04cm] {${text}};`);
}

// Footer
console.log('    ' + genFootNote(FOOTER_MARGIN, -1, 'red', 'Estimated TWh per Year'));
console.log('    ' + genFootNote(FOOTER_MARGIN + 4, -1, 'red!30', 'Minimum TWh per Year'));

console.log(`\\end{tikzpicture}`);
