import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// padding
html = html.replace(/<div class="p-6 pb-2" id="tutTarget_settings">/g, '<div class="p-4 md:p-6 pb-2" id="tutTarget_settings">');
html = html.replace(/<div class="p-6 overflow-y-auto hide-scrollbar space-y-6">/g, '<div class="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 md:space-y-6">');
html = html.replace(/<div class="p-6 pb-2  hidden" id="tutTarget_2">/g, '<div class="p-4 md:p-6 pb-2 hidden" id="tutTarget_2">');
html = html.replace(/<div class="p-6 pb-2 " id="tutTarget_3">/g, '<div class="p-4 md:p-6 pb-2" id="tutTarget_3">');
html = html.replace(/<div class="p-6">/g, '<div class="p-4 md:p-6">');
html = html.replace(/<div id="tutTarget_4" class="-m-6 p-6 mb-2 rounded border border-transparent tutorial-target-box">/g, '<div id="tutTarget_4" class="-m-4 md:-m-6 p-4 md:p-6 mb-2 rounded border border-transparent tutorial-target-box">');
html = html.replace(/<div id="optTutTarget_1" class="-m-6 p-6 mb-4 rounded border border-transparent tutorial-target-box">/g, '<div id="optTutTarget_1" class="-m-4 md:-m-6 p-4 md:p-6 mb-4 rounded border border-transparent tutorial-target-box">');
html = html.replace(/<div id="optTutTarget_3" class="p-6 ">/g, '<div id="optTutTarget_3" class="p-4 md:p-6">');

// space-y and gaps
html = html.replace(/<div class="space-y-6 mb-8">/g, '<div class="space-y-4 md:space-y-6 mb-6 md:mb-8">');
html = html.replace(/<div class="space-y-6 mb-6">/g, '<div class="space-y-4 md:space-y-6 mb-4 md:mb-6">');
html = html.replace(/<div id="optTutTarget_2" class="grid grid-cols-2 gap-4 mb-2">/g, '<div id="optTutTarget_2" class="grid grid-cols-2 gap-2 md:gap-4 mb-2">');

fs.writeFileSync('index.html', html);
console.log("Done");
