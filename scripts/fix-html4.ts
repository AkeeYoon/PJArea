import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

const startIdx = html.indexOf('<div id="view-mapping"');
const endIdx = html.indexOf('</aside>');
if (startIdx !== -1 && endIdx !== -1) {
    const blockToMove = html.substring(startIdx, endIdx);
    
    // Remove the block from its current location inside aside
    html = html.substring(0, startIdx) + '\n        ' + html.substring(endIdx);
    
    const sectionStart = '<section class="flex-1 relative overflow-hidden mapping-grid">';
    const strayDivs = /<section class="flex-1 relative overflow-hidden mapping-grid">[\s\n]*<\/div>[\s\n]*<\/div>/;
    
    if (strayDivs.test(html)) {
        html = html.replace(strayDivs, sectionStart + '\n' + blockToMove);
    } else {
        html = html.replace(sectionStart, sectionStart + '\n' + blockToMove);
    }
}

fs.writeFileSync('index.html', html);
console.log('Restored viewport elements to their correct location in main layout');

