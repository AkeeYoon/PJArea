import fs from 'fs';

let js = fs.readFileSync('public/js/opticalEngine.js', 'utf-8');

// The original line is: const fitScale = Math.min(15.0, (baseViewWidth / maxBound) * 0.07);
js = js.replace(/const fitScale = Math\.min\(15\.0, \(baseViewWidth \/ maxBound\) \* 0\.07\);/, 'const fitScale = Math.min(15.0, (baseViewWidth / maxBound) * 0.07) * (OpticalState.camZoom || 1.0);');

fs.writeFileSync('public/js/opticalEngine.js', js);
console.log('Fixed opticalEngine.js zoom');
