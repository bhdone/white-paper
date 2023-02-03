const COUNTRIES_DATA = [
    { name: "United States", energy: 2.7 },
    { name: "Russian Federation", energy: 11.600000000000001 },
    { name: "Canada", energy: 20.200000000000003 },
    { name: "Germany", energy: 20.4 },
    { name: "France", energy: 24.099999999999998 },
    { name: "United Kingdom", energy: 35.5 },
    { name: "Italy", energy: 36.6 },
    { name: "Australia", energy: 46.7 },
    { name: "Netherlands", energy: 98.8 },
    { name: "Czech Republic", energy: 165.5 }];

COUNTRIES_DATA.sort((a, b) => {
    return a.energy > b.energy ? -1 : 1;
});

const WIDTH = 13;
const LINE_HEIGHT = 0.5;
const BAR_HEIGHT = 0.3;
const LINE_BAR_SUB = LINE_HEIGHT - BAR_HEIGHT;
const MAX_PERCENT = 180;
const NAME_WIDTH = 2;
const EACH_10_PERCENNNNNT_WIDTH = (WIDTH - NAME_WIDTH) / (MAX_PERCENT / 10);
const MAX_Y = LINE_HEIGHT * COUNTRIES_DATA.length - LINE_BAR_SUB / 2;

console.log("\\begin{tikzpicture}");
console.log("    \\tiny");
console.log(`    \\draw (${NAME_WIDTH},${-LINE_BAR_SUB}) -- (${NAME_WIDTH},${MAX_Y});`);
console.log(`    \\draw (${NAME_WIDTH - 0.2},${-LINE_BAR_SUB}) -- (${WIDTH},${-LINE_BAR_SUB});`);
for (let i = 0; i < Math.floor(MAX_PERCENT / 10); ++i) {
    const x = i * EACH_10_PERCENNNNNT_WIDTH + NAME_WIDTH;
    console.log(`    \\draw[lightgray!30] (${x},${-LINE_BAR_SUB}) -- (${x},${MAX_Y});`);
    if (i % 2 === 0) {
        console.log(`    \\draw (${x},${-LINE_BAR_SUB * 2}) node{$${i * 10}\\%$};`);
    }
}
for (let i = 0; i < COUNTRIES_DATA.length; ++i) {
    const progX = NAME_WIDTH;
    const progY = i * LINE_HEIGHT;
    const progX2 = NAME_WIDTH + EACH_10_PERCENNNNNT_WIDTH * (COUNTRIES_DATA[i].energy / 10);
    const progY2 = progY + BAR_HEIGHT;
    console.log(`    \\filldraw[red!70](${progX},${progY}) rectangle (${progX2},${progY2});`);
    console.log(`    \\draw (${progX - 0.1},${progY + BAR_HEIGHT / 2}) node[anchor=east] {${COUNTRIES_DATA[i].name}};`);
    const midLineY = LINE_BAR_SUB / 2 + BAR_HEIGHT + progY;
    console.log(`    \\draw (${NAME_WIDTH},${midLineY}) -- (${NAME_WIDTH - 0.2},${midLineY});`);
}
console.log("\\end{tikzpicture}");
