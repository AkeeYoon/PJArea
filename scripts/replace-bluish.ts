import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// Replace remaining slate with neutral (which is a true gray, no blue tint)
html = html.replace(/slate/g, 'neutral');

// Replace any remaining text-blue-
html = html.replace(/blue/g, 'primary'); // e.g. text-blue-500 -> text-primary-500 (which isn't valid if not generated, maybe I should just replace blue-500 with primary)
html = html.replace(/primary-500/g, 'primary'); // fix the above

// Also let's check `public/js` files too.
function replaceInFile(filePath) {
    if(!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/slate/g, 'neutral');
    content = content.replace(/blue/g, 'primary');
    content = content.replace(/primary-[0-9]+/g, 'primary');
    fs.writeFileSync(filePath, content);
}

replaceInFile('public/js/main.js');
replaceInFile('public/js/mappingEngine.js');
replaceInFile('public/js/opticalEngine.js');

fs.writeFileSync('index.html', html);
console.log('Replaced bluish colors');
