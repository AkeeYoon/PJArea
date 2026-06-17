import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

// Inject slider reference
js = js.replace("const sliderCamY = document.getElementById('slider-cam-rotY');", "const sliderCamY = document.getElementById('slider-cam-rotY');\n    const sliderCamZoom = document.getElementById('slider-cam-zoom');");

// Event bindings
const bindingsToReplace = `    sliderCamX.addEventListener('input', (e) => { OpticalState.camRotX = parseInt(e.target.value); update3DView(); });
    sliderCamY.addEventListener('input', (e) => { OpticalState.camRotY = parseInt(e.target.value); update3DView(); });`;

const newBindings = `    sliderCamX.addEventListener('input', (e) => { OpticalState.camRotX = parseInt(e.target.value); update3DView(); });
    sliderCamY.addEventListener('input', (e) => { OpticalState.camRotY = parseInt(e.target.value); update3DView(); });
    sliderCamZoom.addEventListener('input', (e) => { 
        OpticalState.camZoom = parseFloat(e.target.value); 
        const lbl = document.getElementById('txt-cam-zoom');
        if(lbl) lbl.innerText = OpticalState.camZoom.toFixed(1) + 'x';
        update3DView(); 
    });`;
js = js.replace(bindingsToReplace, newBindings);

// Reset btn
const resetLogic = `        OpticalState.camRotX = -25; OpticalState.camRotY = 60;
        sliderCamX.value = -25; sliderCamY.value = 60;
        update3DView();`;
const newResetLogic = `        OpticalState.camRotX = -25; OpticalState.camRotY = 60; OpticalState.camZoom = 1.0;
        sliderCamX.value = -25; sliderCamY.value = 60; sliderCamZoom.value = 1.0;
        const lbl = document.getElementById('txt-cam-zoom');
        if(lbl) lbl.innerText = '1.0x';
        update3DView();`;
js = js.replace(/OpticalState\.camRotX\s*=\s*-25;\s*OpticalState\.camRotY\s*=\s*60;\s*sliderCamX\.value\s*=\s*-25;\s*sliderCamY\.value\s*=\s*60;\s*update3DView\(\);/g, newResetLogic);

fs.writeFileSync('public/js/main.js', js);
console.log('Fixed main.js bindings');
