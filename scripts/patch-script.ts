import fs from 'fs';

// 1. Fix public/js/main.js
let mainJs = fs.readFileSync('public/js/main.js', 'utf-8');
mainJs = mainJs.replace(
    /btnMap\.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-widest text-on-surface\/40 hover:text-on-surface\/80 transition-all border-b-2 border-transparent";/g,
    '// already fixed or not matched'
);
// I need to exact replace:
mainJs = mainJs.replace(
/btnMap\.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary\/5";\s*btnOpt\.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-widest text-on-surface\/40 hover:text-on-surface\/80 transition-all border-b-2 border-transparent";/g,
'btnMap.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary/5";\n            btnOpt.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-transparent border-b-2 border-transparent";'
);
// The other branch in setMode:
mainJs = mainJs.replace(
/btnOpt\.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary\/5";\s*btnMap\.className = "flex-1 py-3 text-\[10px\] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary\/5";/g,
'btnOpt.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-primary border-transparent border-b-2 border-b-tertiary border-primary transition-all bg-primary/5";\n            btnMap.className = "flex-1 py-3 text-[10px] font-bold uppercase tracking-normal font-display text-on-surface/40 hover:text-on-surface/80 transition-all border-transparent border-b-2 border-transparent";'
);

fs.writeFileSync('public/js/main.js', mainJs);

// 2. Fix public/js/opticalEngine.js
let optJs = fs.readFileSync('public/js/opticalEngine.js', 'utf-8');
optJs = optJs.replace(/const projY = 300;/g, 'const projY = 280;');

optJs = optJs.replace(/if \(labH\) labH\.textContent = `H: \$\{hMeters\.toFixed\(2\)\}m`;/, "if (labH) { labH.textContent = `H: ${hMeters.toFixed(2)}m`; labH.setAttribute('x', startX + dPx + 20); labH.setAttribute('y', projY); }");
optJs = optJs.replace(/if \(labW\) labW\.textContent = `W: \$\{OpticalState\.width\}m`;/, "if (labW) { labW.textContent = `W: ${OpticalState.width.toFixed(2)}m`; labW.setAttribute('x', startX + dPx + 20); labW.setAttribute('y', projY); }");

// Fix Nits colors
optJs = optJs.replace(/text-rose-500/g, 'text-[#ff2a5f]');
optJs = optJs.replace(/text-yellow-500/g, 'text-[#ffc107]');
optJs = optJs.replace(/text-emerald-500/g, 'text-primary');

fs.writeFileSync('public/js/opticalEngine.js', optJs);

// 3. Fix index.html
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/bg-primary\/20 border border-primary\/30/g, 'bg-transparent border border-primary/30');

// Fix Brightness gradient
html = html.replace(/background: linear-gradient\(to right, var\(--color-secondary\) 0%, var\(--color-primary\) 100%\);/g, 'background: linear-gradient(to right, #ff2a5f 20%, #ffc107 40%, var(--color-primary) 80%, var(--color-tertiary) 100%);');

// Fix 3D beam color
html = html.replace(/rgba\(34,211,238,0.08\)/g, 'rgba(0, 255, 200, 0.08)');

// Move projection down/up slightly
html = html.replace(/<line x1="20" y1="500" x2="480" y2="500"/g, '<line x1="20" y1="480" x2="480" y2="480"');
html = html.replace(/transform="translate\(50, 300\)"/g, 'transform="translate(50, 280)"');

// Move D up and centered
html = html.replace(/id="side-lab-dist" x="250" y="530"/g, 'id="side-lab-dist" x="250" y="30" font-size="12" font-weight="bold"');
html = html.replace(/id="top-lab-dist" x="250" y="530"/g, 'id="top-lab-dist" x="250" y="30" font-size="12" font-weight="bold"');

fs.writeFileSync('index.html', html);

console.log('Fixed patches.');
