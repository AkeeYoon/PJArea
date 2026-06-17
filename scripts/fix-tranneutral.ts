import fs from 'fs';

function fixTranneutral(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/tranneutral/g, 'translate');
    fs.writeFileSync(filePath, content);
}

fixTranneutral('public/js/main.js');
fixTranneutral('public/js/mappingEngine.js');
fixTranneutral('public/js/opticalEngine.js');
fixTranneutral('index.html');
console.log('Fixed tranneutral typo.');
