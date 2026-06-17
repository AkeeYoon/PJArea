import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// The optical info is still there
html = html.replace(/<div class="flex items-center gap-6 hidden" id="header-info-optical">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

// Also let's clean up any empty lines like "<!-- Center Info (Mapping Mode) -->\n         "
html = html.replace(/<!-- Center Info \(Mapping Mode\) -->\s*/, '');
html = html.replace(/<!-- Center Info \(Optical Mode\) -->\s*/, '');


// One thing to note: on mobile, our bottom bar overlaps the sidebar. We added pb-[60px] md:pb-0 to main.
// Also panel-settings needs to be verified.
// The user says "this looks good".

fs.writeFileSync('index.html', html);
console.log('Cleaned header');
