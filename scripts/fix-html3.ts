import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Extract panel-output
const outputPanelRegex = /<div id="panel-output"[\s\S]*?<\/div>[\s\n]*<\/div>[\s\n]*<\/div>/;
const match = html.match(outputPanelRegex);
if(match) {
    let outputHtml = match[0];
    html = html.replace(match[0], '');
    
    // Inject it into `aside`, right before closing `</aside>`
    html = html.replace(/<\/aside>/, outputHtml + '\n        </aside>');
}

// 2. Inject Camera Zoom Slider
const rotYSlider = `<label class="block">
                                <div class="flex justify-between text-[9px] text-on-surface/40 mb-1">
                                    <span class="uppercase">Rotate Y (Pan)</span>
                                    <span id="txt-cam-rotY" class="text-primary font-bold">60°</span>
                                </div>
                                <input type="range" id="slider-cam-rotY" class="slider-custom w-full" min="-180" max="180" value="60">
                            </label>`;

const zoomSlider = `                            <label class="block">
                                <div class="flex justify-between text-[9px] text-on-surface/40 mb-1">
                                    <span class="uppercase">Zoom (Scale)</span>
                                    <span id="txt-cam-zoom" class="text-primary font-bold">1x</span>
                                </div>
                                <input type="range" id="slider-cam-zoom" class="slider-custom w-full" min="0.1" max="3" step="0.1" value="1">
                            </label>`;
if (html.includes(rotYSlider)) {
    html = html.replace(rotYSlider, rotYSlider + '\n' + zoomSlider);
}

fs.writeFileSync('index.html', html);
console.log('Fixed HTML layout');
