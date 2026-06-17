import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// replace some mb-6 with mb-4 md:mb-6
html = html.replace(/mb-6/g, 'mb-4 md:mb-6');
html = html.replace(/mb-4 md:mb-6 md:mb-4/g, 'mb-4 md:mb-6');
html = html.replace(/mb-4 md:mb-6 md:mb-8/g, 'mb-6 md:mb-8');
html = html.replace(/class="grid grid-cols-3 gap-2 mb-4 md:mb-6"/g, 'class="grid grid-cols-3 gap-1 md:gap-2 mb-4 md:mb-6"');

// And p-4 md:p-6 pb-6 md:pb-8 could be -> p-4 md:p-6 pb-4 md:pb-8
// Let's replace gap-4 with gap-3 md:gap-4
html = html.replace(/gap-4/g, 'gap-3 md:gap-4');
html = html.replace(/gap-3 md:gap-4 md:gap-2/g, 'gap-2 md:gap-4');
// Some specific things:
// mb-4 -> mb-3 md:mb-4
html = html.replace(/mb-4/g, 'mb-3 md:mb-4');
html = html.replace(/mb-3 md:mb-4 md:mb-6/g, 'mb-4 md:mb-6'); // clean up double replace
html = html.replace(/mb-3 md:mb-4 md:mb-3/g, 'mb-3 md:mb-4'); // clean up double replace

// p-6 overflow-y-auto... already p-4 md:p-6
html = html.replace(/tTarget_settings" class="p-4 md:p-6 pb-2/g, 'tTarget_settings" class="p-4 md:p-6 pb-0 md:pb-2');
html = html.replace(/<div class="space-y-4 md:space-y-6 mb-4 md:mb-6">/g, '<div class="space-y-3 md:space-y-6 mb-4 md:mb-6">');
html = html.replace(/<div class="space-y-4 md:space-y-6 mb-6 md:mb-8">/g, '<div class="space-y-3 md:space-y-6 mb-5 md:mb-8">');

// also replace pb-6 md:pb-8
html = html.replace(/pb-6/g, 'pb-4 md:pb-6');
html = html.replace(/pb-4 md:pb-6 md:pb-8/g, 'pb-6 md:pb-8');

fs.writeFileSync('index.html', html);

let js = fs.readFileSync('public/js/layoutManager.js', 'utf8');
js = js.replace(/gap-6/g, 'gap-4 md:gap-6');
fs.writeFileSync('public/js/layoutManager.js', js);

console.log("Done");
