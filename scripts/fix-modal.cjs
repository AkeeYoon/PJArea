const fs = require('fs');
let html = fs.readFileSync('PJArea_V2.1_Portable.html', 'utf8');

// The main issue is that the scrollable container inside the modal needs flex-1 min-h-0
// to be able to shrink within its flex column parent and trigger scrolling.
let changed = false;

const target = 'class="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 md:space-y-6"';
const replacement = 'class="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 md:space-y-6 flex-1 min-h-0"';

if (html.includes(target)) {
    html = html.replace(target, replacement);
    changed = true;
    console.log('Patched modal scrollable area with flex-1 min-h-0');
} else if (html.includes(replacement)) {
    console.log('Modal already patched');
} else {
    console.log('Target string not found, layout might be different.');
}

if (changed) {
    fs.writeFileSync('PJArea_V2.1_Portable.html', html);
    console.log('File updated successfully.');
}
