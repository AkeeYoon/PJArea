import fs from 'fs';

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf-8');

// Update heights for mobile layout
html = html.replace(
  /<main class="flex flex-col-reverse md:flex-row h-\[calc\(100dvh-3\.5rem\)\] relative overflow-hidden">/g,
  '<main class="flex flex-col-reverse md:flex-row h-[calc(100dvh-3.5rem)] relative overflow-hidden pb-[60px] md:pb-0">'
);

html = html.replace(
  /<aside class="w-full md:w-\[380px\] h-1\/2 md:h-full/g,
  '<aside class="w-full md:w-[380px] h-[65%] md:h-full'
);

html = html.replace(
  /<section class="flex-1 relative bg-surface-lowest overflow-hidden flex flex-col h-1\/2 md:h-full">/g,
  '<section class="flex-1 relative bg-surface-lowest overflow-hidden flex flex-col h-[35%] md:h-full">'
);

// Hide top tabs on mobile
html = html.replace(
  /<div class="flex\s+shrink-0 sticky top-0 bg-surface-low z-30">/g,
  '<div class="hidden md:flex shrink-0 sticky top-0 bg-surface-low z-30">'
);

// Inject Bottom Nav Bar
const bottomNavHtml = `
    <!-- Mobile Bottom Navigation -->
    <nav id="mobile-bottom-nav" class="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-[#0a0a0a] border-t border-outline-variant/30 flex z-[200]">
        <button onclick="document.getElementById('btnModeMapping').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Library</span>
        </button>
        <button onclick="document.getElementById('btnModeMapping').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full text-primary border-t-2 border-primary mt-[-1px] bg-primary/5 transition-all">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="2"/></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Editor</span>
        </button>
        <button onclick="document.getElementById('btnModeOptical').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 4l-8 8h16zM4 16h16v4H4z"/></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Output</span>
        </button>
        <button onclick="document.getElementById('btnModeOptical').click()" class="flex-1 flex flex-col items-center justify-center gap-1 h-full opacity-40 hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M5 4h14v2H5zm0 4h14v8H5z"/></svg>
            <span class="text-[9px] font-bold uppercase tracking-widest font-display text-current">Presets</span>
        </button>
    </nav>
`;

if (!html.includes('id="mobile-bottom-nav"')) {
    html = html.replace('</body>', bottomNavHtml + '\n</body>');
}

// 2. Add Cyberpunk Styles
let css = fs.readFileSync('src/styles/main.css', 'utf-8');
const cyberStyles = `

/* Cyberpunk Range Slider */
input[type=range].slider-custom {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
  outline: none;
  margin: 6px 0;
}
input[type=range].slider-custom::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
}
input[type=range].slider-custom::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: var(--color-primary);
  border-radius: 0px;
  cursor: pointer;
  margin-top: -5px; /* centers the thumb over 2px track */
}

/* Custom CSS to hide standard things */
.cyber-group-header {
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}
`;

if (!css.includes('.cyber-group-header')) {
    css += cyberStyles;
}
fs.writeFileSync('src/styles/main.css', css);

// 3. Update the Mapping panel to look like "EDITOR"
// We'll replace the text elements with cyberpunk equivalents globally where possible,
// but since the HTML is very specific, we can rewrite the panel-mapping section.
// Instead of full rewrite, let's just replace key labels to give it the instrument feel.
html = html.replace(
  '<h2 class="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-4">Grid Configuration</h2>',
  '<div class="flex justify-between items-center cyber-group-header"><h2 class="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">DIMENSION_MATRIX</h2><span class="text-[10px] font-mono text-primary">001</span></div>'
);

html = html.replace(
  '<span class="text-on-surface font-mono font-bold text-sm">Width (px)</span>',
  '<span class="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest font-display">GRID_X (COLUMNS)</span>'
);
html = html.replace(
  '<span class="text-on-surface font-mono font-bold text-sm">Height (px)</span>',
  '<span class="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest font-display">GRID_Y (ROWS)</span>'
);
html = html.replace(
  '<span class="text-[10px] text-on-surface/40 uppercase font-bold tracking-widest">Global Panning</span>',
  '<div class="flex justify-between items-center cyber-group-header mt-8"><h2 class="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">SPATIAL_OFFSET</h2><span class="text-[10px] font-mono text-primary">004</span></div>'
);
html = html.replace(
  '<span class="text-[10px] text-on-surface/40 uppercase font-bold tracking-widest">Stroke & Scale</span>',
  '<div class="flex justify-between items-center cyber-group-header mt-8"><h2 class="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">STROKE_ATTRIBUTES</h2><span class="text-[10px] font-mono text-primary">002</span></div>'
);

html = html.replace(
  '<h2 class="text-xs font-bold text-on-surface/40 uppercase tracking-[0.2em] mb-4">Display & Color</h2>',
  '<div class="flex justify-between items-center cyber-group-header mt-8"><h2 class="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">CHROMATIC_DATA</h2><span class="text-[10px] font-mono text-primary">003</span></div>'
);

html = html.replace(
  '<span class="text-[10px] text-on-surface/40 uppercase font-bold tracking-widest">Aspect Ratio (Auto)</span>',
  '<span class="text-[9px] text-on-surface/40 uppercase font-bold tracking-widest">NATIVE ASPECT</span>'
);

html = html.replace(
  '<span class="text-on-surface font-mono font-bold text-sm" id="lblStrokeSlider">Thickness</span>',
  '<span class="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest font-display">LINE_THICKNESS</span>'
);

// We need to add the active/inactive logic to our mock bottom navigation.
// Since `main.js` currently overrides `btnOpt.className` and `btnMap.className`,
// we can inject a script inside index.html to sync the bottom nav highlighting.
const syncScript = `
<script>
  // Sync Bottom Nav Active States
  setInterval(() => {
    const isMap = !document.getElementById('panel-mapping').classList.contains('hidden');
    const navMap = document.getElementById('navMap');
    const navLib = document.getElementById('navLib');
    const navOpt = document.getElementById('navOpt');
    const navPreset = document.getElementById('navPreset');
    
    if(navMap && navOpt) {
      if(isMap) {
        navMap.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-[var(--color-primary)] border-t-2 border-[var(--color-primary)] mt-[-1px] bg-primary/5 transition-all";
        navLib.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
        navOpt.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
        navPreset.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
      } else {
        navOpt.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-[var(--color-primary)] border-t-2 border-[var(--color-primary)] mt-[-1px] bg-primary/5 transition-all";
        navLib.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
        navMap.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
        navPreset.className = "flex-1 flex flex-col items-center justify-center gap-1 h-full text-on-surface/40 hover:text-on-surface/80 border-t-2 border-transparent transition-all";
      }
    }
  }, 100);
</script>
`;
if (!html.includes('// Sync Bottom Nav Active States')) {
    html = html.replace('</body>', syncScript + '\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('Mobile UX layout and styles updated.');
