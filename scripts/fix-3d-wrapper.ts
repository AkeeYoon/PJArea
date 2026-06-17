import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// revert the translate
html = html.replace(
    /-translate-y-12 md:-translate-y-24/g,
    ''
);

// introduce wrapper above max-w-[1200px]
html = html.replace(
    /<div class="relative w-full h-full max-w-\[1200px\] max-h-\[800px\] flex items-center justify-center overflow-visible"(.*?)>(.*?)<div id="scene-3d"/s,
    `<div class="w-full h-full flex items-center justify-center -mt-16 md:-mt-32">
        <div class="relative w-full h-full max-w-[1200px] max-h-[800px] flex items-center justify-center overflow-visible"$1>$2<div id="scene-3d"`
);

// add closing tag for the wrapper
html = html.replace(
    /<\/div>\s*<\/div>\s*<!-- \^\^\^ This closes opt-container-3d \^\^\^ -->/s,
    `        </div>
                    </div>
                </div>
                <!-- ^^^ This closes opt-container-3d ^^^ -->`
);

fs.writeFileSync('index.html', html);
console.log("Done");
