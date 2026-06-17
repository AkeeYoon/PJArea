const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const asideMatch = html.match(/<aside[\s\S]*?<\/aside>/);
const aside = asideMatch[0];

const panels = ['panel-settings', 'panel-mapping', 'panel-optical', 'panel-output'];

for (let i = 0; i < panels.length; i++) {
    const p1 = panels[i];
    const p2 = panels[i+1];
    
    let regex;
    if (p2) {
        regex = new RegExp('<div id="' + p1 + '"[\\s\\S]*?(?=<div id="' + p2 + '")');
    } else {
        regex = new RegExp('<div id="' + p1 + '"[\\s\\S]*');
    }
    
    const contentMatch = aside.match(regex);
    if(contentMatch) {
        let content = contentMatch[0];
        if(!p2) {
            content = content.replace(/<\/aside>[\s\S]*/, '');
        }
        const open = (content.match(/<div\b/g) || []).length;
        const close = (content.match(/<\/div>/g) || []).length;
        console.log(p1, 'open:', open, 'close:', close);
    }
}
