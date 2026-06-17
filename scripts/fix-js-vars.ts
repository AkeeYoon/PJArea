import fs from 'fs';

function fixVarInJS(filePath) {
    if(!fs.existsSync(filePath)) return;
    let js = fs.readFileSync(filePath, 'utf-8');
    js = js.replace(/var\(--color-primary\)/g, '#00FFC8');
    js = js.replace(/var\(--color-surface-high\)/g, '#20201f');
    js = js.replace(/var\(--color-outline-variant\)/g, '#484847');
    js = js.replace(/var\(--color-surface-lowest\)/g, '#000000');
    js = js.replace(/var\(--color-surface-container\)/g, '#1a1a1a');
    js = js.replace(/var\(--color-surface\)/g, '#0e0e0e');
    js = js.replace(/var\(--color-secondary\)/g, '#D1FF00');
    js = js.replace(/var\(--color-tertiary\)/g, '#00E5FF');
    fs.writeFileSync(filePath, js);
}

fixVarInJS('public/js/main.js');
fixVarInJS('public/js/mappingEngine.js');
fixVarInJS('public/js/opticalEngine.js');

console.log('Fixed CSS vars in JS contexts');
