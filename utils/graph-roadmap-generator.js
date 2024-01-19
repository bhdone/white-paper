const { add, finalize, fontSize, arrowLine, rect, fillRect, label, labelRect, fillCircle } = require('./lib/tikzpicture.js');

const timePoint = (x, y, lineWidth, width, height, time, title, desc, color) => {
    const MARGIN = 0.2;
    return () => {
        let script = '';
        script += fontSize('normalsize')().script;
        script += arrowLine(x, y, x + lineWidth, y, color)().script;
        if (time) {
            script += label(x, y, time, color, 'east')().script;
        }
        script += rect(x + lineWidth, y - height / 2, width, height, color, true)().script;
        script += label(x + lineWidth + MARGIN, y + height / 2 - MARGIN, title, color, 'north west')().script;
        script += fontSize('tiny')().script;
        script += label(x + lineWidth + MARGIN, y - height / 2 + MARGIN, desc, color, 'south west')().script;
        return {
            script,
            props: { x, y, title, desc, color },
        }
    }
}

const roadMap = (entries) => {
    const ENTRY_OFFSET_Y = 1;
    const ENTRY_MARGIN = 0.3;
    const LINE_WIDTH = 3;
    const WIDTH = 5.5;
    return () => {
        let script = '';
        let y = ENTRY_OFFSET_Y;
        for (let i = 0; i < entries.length; ++i) {
            y += entries[i].height / 2;
            script += timePoint(0, y, LINE_WIDTH, WIDTH, entries[i].height, entries[i].time, entries[i].title, entries[i].desc, 'black')().script;
            y += entries[i].height / 2 + ENTRY_MARGIN;
        }
        script += arrowLine(0, 0, 0, y, 'black', true)().script;
        script += fillCircle(0, y, 0.1, 'black', '1pt')().script;
        return {
            script,
            props: null
        }
    }
}

const entries = [
    {
        time: 'Q1, 2023',
        title: '\\textbf{Chia consensus}',
        desc: 'In 2023, DEPINC will be compatible \\\\with Chia\'s old agreement documents \\\\for mining.',
        height: 2,
    },
    {
        title: '\\textbf{10000 peta bytes}',
        desc: 'Capacity size reaches \\\\10000 peta bytes, builds the \\\\stable currency system using \\\\capacity as standard, \\\\services for the application layer.',
        height: 2.5,
    },
    {
        title: '\\textbf{6000 peta bytes}',
        desc: 'Capacity size reaches \\\\6000 peta bytes, upgrades \\\\PoS consensus.',
        height: 2,
    },
    {
        title: '\\textbf{3000 peta bytes}',
        desc: 'Capacity size reaches \\\\3000 peta bytes, implements \\\\zero knowledge function, \\\\improves TPS.',
        height: 2.2,
    },
    {
        title: '\\textbf{Elastic economic model}',
        desc: 'When the whole network \\\\computing power enters a \\\\positive growth cycle, adds \\\\elastic economic model according \\\\to the community consensus',
        height: 2.5,
    },
    {
        time: 'Sep 4, 2018',
        title: '\\textbf{PoC experiment}',
        desc: 'DEPINC started conditional PoC \\\\experiment.',
        height: 1.7,
    },
    {
        time: 'Aug 3, 2018',
        title: '\\textbf{Genesis block}',
        desc: 'The DEPINC genesis block was \\\\mined. it initiated a new \\\\mining method, and first month \\\\of unconditional storage mining.',
        height: 2.2,
    }
]

add(roadMap(entries));

console.log(finalize());
